"""Vendor Deal Aggregator - Flask Application"""

from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from scraper import HomeDepotScraper, LowesScraper, GraingerScraper
from models import Deal, CATEGORIES, VENDOR_NAMES
from utils.calculator import calculate_bulk_savings, compare_deals
from typing import List
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Initialize scrapers
scrapers = {
    'home_depot': HomeDepotScraper(),
    'lowes': LowesScraper(),
    'grainger': GraingerScraper()
}

# In-memory cache for deals
deals_cache = []
last_scrape_time = None

def scrape_all_vendors() -> List[Deal]:
    """Scrape deals from all vendors"""
    global deals_cache, last_scrape_time

    all_deals = []
    for vendor, scraper in scrapers.items():
        try:
            deals = scraper.scrape_deals()
            all_deals.extend(deals)
            print(f"✓ Scraped {len(deals)} deals from {vendor}")
        except Exception as e:
            print(f"✗ Error scraping {vendor}: {str(e)}")

    deals_cache = all_deals
    last_scrape_time = datetime.now()
    return all_deals

@app.route('/')
def index():
    """Render main dashboard"""
    return render_template('index.html',
                         vendors=VENDOR_NAMES,
                         categories=CATEGORIES)

@app.route('/simple')
def simple():
    """Render simple dashboard for debugging"""
    return render_template('index_simple.html')

@app.route('/api/deals')
def get_all_deals():
    """Get all deals from all vendors"""
    if not deals_cache or (last_scrape_time and (datetime.now() - last_scrape_time).seconds > 3600):
        scrape_all_vendors()

    vendor = request.args.get('vendor')
    category = request.args.get('category')
    sort_by = request.args.get('sort_by', 'total_savings_percent')

    filtered_deals = deals_cache

    if vendor:
        filtered_deals = [d for d in filtered_deals if d.vendor == vendor]

    if category:
        filtered_deals = [d for d in filtered_deals if d.category == category]

    sorted_deals = compare_deals(filtered_deals, sort_by)

    return jsonify({
        'success': True,
        'count': len(sorted_deals),
        'deals': [d.to_dict() for d in sorted_deals],
        'last_updated': last_scrape_time.isoformat() if last_scrape_time else None
    })

@app.route('/api/deals/<vendor>')
def get_vendor_deals(vendor):
    """Get deals from specific vendor"""
    if vendor not in scrapers:
        return jsonify({'success': False, 'error': 'Invalid vendor'}), 404

    if not deals_cache:
        scrape_all_vendors()

    vendor_deals = [d for d in deals_cache if d.vendor == vendor]

    return jsonify({
        'success': True,
        'vendor': vendor,
        'count': len(vendor_deals),
        'deals': [d.to_dict() for d in vendor_deals]
    })

@app.route('/api/stats')
def get_stats():
    """Get overall statistics"""
    if not deals_cache:
        scrape_all_vendors()

    total_deals = len(deals_cache)
    total_vendor_savings = sum(d.savings for d in deals_cache)
    total_goldbridge_cashback = sum(d.sale_price * 0.05 for d in deals_cache)

    stats_by_vendor = {}
    for vendor in VENDOR_NAMES.keys():
        vendor_deals = [d for d in deals_cache if d.vendor == vendor]
        stats_by_vendor[vendor] = {
            'count': len(vendor_deals),
            'avg_discount': round(sum(d.discount_percent for d in vendor_deals) / len(vendor_deals), 2) if vendor_deals else 0
        }

    return jsonify({
        'success': True,
        'total_deals': total_deals,
        'total_vendor_savings': round(total_vendor_savings, 2),
        'total_goldbridge_cashback': round(total_goldbridge_cashback, 2),
        'by_vendor': stats_by_vendor,
        'last_updated': last_scrape_time.isoformat() if last_scrape_time else None
    })

@app.route('/api/refresh')
def refresh_deals():
    """Manually trigger a refresh of all deals"""
    deals = scrape_all_vendors()
    return jsonify({
        'success': True,
        'message': f'Refreshed {len(deals)} deals',
        'count': len(deals),
        'timestamp': last_scrape_time.isoformat()
    })

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🏗️  Starting Vendor Deal Aggregator...")
    print("="*60 + "\n")

    # Initialize cache on startup
    print("Initializing deal cache...")
    scrape_all_vendors()
    print(f"\n✓ Cached {len(deals_cache)} deals from {len(scrapers)} vendors\n")
    print("="*60)
    print("🚀 Server running at http://localhost:5000")
    print("="*60 + "\n")

    # Run the app
    port = int(os.environ.get('PORT', 5000))
    app.run(host='127.0.0.1', port=port, debug=True)
