from typing import List
from datetime import datetime
from models.deal import Deal
from scraper.base_scraper import BaseScraper
import hashlib

class GraingerScraper(BaseScraper):
    """Scraper for Grainger deals (DEMO with mock data)"""

    def get_vendor_name(self) -> str:
        return "grainger"

    def scrape_deals(self) -> List[Deal]:
        """Return mock deals for demonstration"""
        mock_deals = [
            {
                'title': 'Dayton Commercial Electric Space Heater 1500W',
                'original_price': 89.95,
                'sale_price': 64.95,
                'category': 'hvac',
                'description': 'Electric space heater commercial use'
            },
            {
                'title': 'Milwaukee M18 FUEL Hammer Drill/Driver Kit',
                'original_price': 299.00,
                'sale_price': 249.00,
                'category': 'tools',
                'description': 'Brushless cordless hammer drill'
            },
            {
                'title': 'Westward Industrial LED Work Light 4000 Lumens',
                'original_price': 79.99,
                'sale_price': 59.99,
                'category': 'lighting',
                'description': 'Heavy-duty LED work light'
            },
            {
                'title': 'Square D Circuit Breaker 20A 1-Pole Pack of 5',
                'original_price': 54.50,
                'sale_price': 39.50,
                'category': 'electrical',
                'description': 'Standard circuit breakers'
            },
            {
                'title': 'Ridgid K-400 Drum Machine Drain Cleaner',
                'original_price': 1399.00,
                'sale_price': 1099.00,
                'category': 'plumbing',
                'description': 'Professional drain cleaning machine'
            },
            {
                'title': 'Zurn Sensor-Operated Flush Valve Commercial',
                'original_price': 449.00,
                'sale_price': 349.00,
                'category': 'plumbing',
                'description': 'Battery-powered automatic flush valve'
            },
            {
                'title': 'Lithonia Lighting 2x4 LED Troffer 4000K',
                'original_price': 129.99,
                'sale_price': 89.99,
                'category': 'lighting',
                'description': 'Commercial LED ceiling fixture'
            },
            {
                'title': 'Mitsubishi Electric Mini Split AC 18000 BTU',
                'original_price': 2199.00,
                'sale_price': 1799.00,
                'category': 'hvac',
                'description': 'Ductless heat pump system'
            },
            {
                'title': 'Rubbermaid Commercial Janitor Cart Black',
                'original_price': 299.00,
                'sale_price': 229.00,
                'category': 'hardware',
                'description': 'Heavy-duty janitorial cart'
            },
            {
                'title': 'DeWalt 7-1/4" Circular Saw 15 Amp',
                'original_price': 179.00,
                'sale_price': 139.00,
                'category': 'tools',
                'description': 'Lightweight circular saw'
            },
            {
                'title': 'Leviton Industrial Grade 30A 125V Receptacle',
                'original_price': 39.99,
                'sale_price': 29.99,
                'category': 'electrical',
                'description': 'Twist-lock electrical receptacle'
            },
            {
                'title': 'Armstrong Premium Excelon Vinyl Tile 45 sq ft',
                'original_price': 189.00,
                'sale_price': 139.00,
                'category': 'flooring',
                'description': 'Commercial grade vinyl tile'
            },
            {
                'title': 'Werner 28 ft Fiberglass Extension Ladder',
                'original_price': 449.00,
                'sale_price': 349.00,
                'category': 'outdoor',
                'description': 'Type IA 300 lb rated ladder'
            },
            {
                'title': 'Rust-Oleum Professional Safety Marking Paint',
                'original_price': 24.99,
                'sale_price': 18.99,
                'category': 'paint',
                'description': 'High visibility marking paint'
            }
        ]

        deals = []
        for item in mock_deals:
            deal_id = hashlib.md5(f"grainger_{item['title']}".encode()).hexdigest()[:12]
            discount = ((item['original_price'] - item['sale_price']) / item['original_price']) * 100

            deal = Deal(
                id=deal_id,
                vendor='grainger',
                title=item['title'],
                original_price=item['original_price'],
                sale_price=item['sale_price'],
                discount_percent=round(discount, 2),
                category=item['category'],
                url=f"https://www.grainger.com/p/{deal_id}",
                description=item['description'],
                scraped_at=datetime.now()
            )
            deals.append(deal)

        return deals
