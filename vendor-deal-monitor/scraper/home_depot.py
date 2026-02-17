from typing import List
from datetime import datetime
from models.deal import Deal
from scraper.base_scraper import BaseScraper
import hashlib

class HomeDepotScraper(BaseScraper):
    """Scraper for Home Depot deals (DEMO with mock data)"""

    def get_vendor_name(self) -> str:
        return "home_depot"

    def scrape_deals(self) -> List[Deal]:
        """Return mock deals for demonstration"""
        mock_deals = [
            {
                'title': 'Glacier Bay Kitchen Faucet with Pull-Down Sprayer',
                'original_price': 89.99,
                'sale_price': 59.99,
                'category': 'plumbing',
                'description': 'Single-handle kitchen faucet'
            },
            {
                'title': 'Leviton Tamper Resistant Outlet 10-Pack',
                'original_price': 24.99,
                'sale_price': 19.99,
                'category': 'electrical',
                'description': 'Tamper resistant electrical outlets'
            },
            {
                'title': 'DEWALT 20V MAX Cordless Drill/Driver Kit',
                'original_price': 149.00,
                'sale_price': 99.00,
                'category': 'tools',
                'description': '20V cordless drill with battery'
            },
            {
                'title': 'TrafficMaster Allure Vinyl Plank Flooring',
                'original_price': 2.99,
                'sale_price': 1.99,
                'category': 'flooring',
                'description': 'Luxury vinyl plank per sq ft'
            },
            {
                'title': 'Hampton Bay 52" LED Ceiling Fan with Light',
                'original_price': 129.00,
                'sale_price': 89.00,
                'category': 'lighting',
                'description': 'Energy-efficient LED ceiling fan'
            },
            {
                'title': 'GE 24" Built-In Dishwasher Stainless Steel',
                'original_price': 549.00,
                'sale_price': 399.00,
                'category': 'appliances',
                'description': 'Energy Star certified dishwasher'
            },
            {
                'title': 'Whirlpool 30" Electric Range with Self-Cleaning',
                'original_price': 799.00,
                'sale_price': 599.00,
                'category': 'appliances',
                'description': '5.3 cu ft electric range'
            },
            {
                'title': 'Behr Premium Plus Ultra Interior Paint + Primer',
                'original_price': 39.98,
                'sale_price': 29.98,
                'category': 'paint',
                'description': 'One-coat coverage 1-gallon'
            },
            {
                'title': 'Rust-Oleum Zinsser Exterior Primer 5-Gallon',
                'original_price': 179.00,
                'sale_price': 139.00,
                'category': 'paint',
                'description': 'High-hide exterior primer'
            },
            {
                'title': 'Everbilt 2" x 4" x 8 ft Pressure-Treated Lumber',
                'original_price': 8.98,
                'sale_price': 6.98,
                'category': 'building_materials',
                'description': 'Pressure-treated construction lumber'
            },
            {
                'title': 'Vigoro 40 lb Lawn Fertilizer Covers 15,000 sq ft',
                'original_price': 49.99,
                'sale_price': 34.99,
                'category': 'outdoor',
                'description': 'Slow-release lawn fertilizer'
            },
            {
                'title': 'Ryobi 18V ONE+ Cordless Leaf Blower',
                'original_price': 119.00,
                'sale_price': 79.00,
                'category': 'outdoor',
                'description': 'Compact cordless leaf blower'
            },
            {
                'title': 'Husky 46" 9-Drawer Mobile Workbench',
                'original_price': 599.00,
                'sale_price': 449.00,
                'category': 'hardware',
                'description': 'Heavy-duty mobile workbench'
            },
            {
                'title': 'Kohler Highline Comfort Height Toilet',
                'original_price': 349.00,
                'sale_price': 249.00,
                'category': 'plumbing',
                'description': 'ADA compliant elongated toilet'
            },
            {
                'title': 'Lutron Caseta Smart Dimmer Switch Starter Kit',
                'original_price': 129.99,
                'sale_price': 99.99,
                'category': 'electrical',
                'description': 'WiFi enabled smart lighting kit'
            }
        ]

        deals = []
        for item in mock_deals:
            deal_id = hashlib.md5(f"home_depot_{item['title']}".encode()).hexdigest()[:12]
            discount = ((item['original_price'] - item['sale_price']) / item['original_price']) * 100

            deal = Deal(
                id=deal_id,
                vendor='home_depot',
                title=item['title'],
                original_price=item['original_price'],
                sale_price=item['sale_price'],
                discount_percent=round(discount, 2),
                category=item['category'],
                url=f"https://www.homedepot.com/p/{deal_id}",
                description=item['description'],
                scraped_at=datetime.now()
            )
            deals.append(deal)

        return deals
