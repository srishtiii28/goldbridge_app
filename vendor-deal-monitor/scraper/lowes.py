from typing import List
from datetime import datetime
from models.deal import Deal
from scraper.base_scraper import BaseScraper
import hashlib

class LowesScraper(BaseScraper):
    """Scraper for Lowe's deals (DEMO with mock data)"""

    def get_vendor_name(self) -> str:
        return "lowes"

    def scrape_deals(self) -> List[Deal]:
        """Return mock deals for demonstration"""
        mock_deals = [
            {
                'title': 'Kobalt 24V MAX Brushless Cordless Impact Driver',
                'original_price': 119.00,
                'sale_price': 79.00,
                'category': 'tools',
                'description': '24V brushless impact driver kit'
            },
            {
                'title': 'American Standard Cadet 3 Elongated Toilet',
                'original_price': 279.00,
                'sale_price': 199.00,
                'category': 'plumbing',
                'description': 'WaterSense certified toilet'
            },
            {
                'title': 'Sherwin-Williams HGTV Home Interior Paint',
                'original_price': 44.98,
                'sale_price': 34.98,
                'category': 'paint',
                'description': 'Premium interior paint 1-gallon'
            },
            {
                'title': 'Honeywell T5 Smart Thermostat',
                'original_price': 149.00,
                'sale_price': 99.00,
                'category': 'hvac',
                'description': 'WiFi-enabled smart thermostat'
            },
            {
                'title': 'ClosetMaid 6-Cube Storage Organizer',
                'original_price': 89.00,
                'sale_price': 59.00,
                'category': 'hardware',
                'description': 'Modular cube storage system'
            },
            {
                'title': 'LG 27 cu ft French Door Refrigerator Stainless',
                'original_price': 2199.00,
                'sale_price': 1699.00,
                'category': 'appliances',
                'description': 'Smart WiFi enabled refrigerator'
            },
            {
                'title': 'Samsung 7.5 cu ft Gas Dryer with Steam',
                'original_price': 899.00,
                'sale_price': 699.00,
                'category': 'appliances',
                'description': 'Energy efficient steam dryer'
            },
            {
                'title': 'Pergo TimberCraft Laminate Flooring',
                'original_price': 3.49,
                'sale_price': 2.49,
                'category': 'flooring',
                'description': 'Waterproof laminate per sq ft'
            },
            {
                'title': 'Allen + Roth 3-Light Vanity Bar Brushed Nickel',
                'original_price': 89.99,
                'sale_price': 59.99,
                'category': 'lighting',
                'description': 'Modern bathroom vanity light'
            },
            {
                'title': 'Legrand Adorne WiFi Smart Switch with Dimmer',
                'original_price': 79.99,
                'sale_price': 59.99,
                'category': 'electrical',
                'description': 'Voice control compatible dimmer'
            },
            {
                'title': 'Rheem Performance Platinum 50-Gal Water Heater',
                'original_price': 899.00,
                'sale_price': 699.00,
                'category': 'hvac',
                'description': 'Electric water heater 12-year warranty'
            },
            {
                'title': 'Craftsman 159-Piece Mechanics Tool Set',
                'original_price': 199.00,
                'sale_price': 129.00,
                'category': 'tools',
                'description': 'Complete socket and wrench set'
            },
            {
                'title': 'Husqvarna 450E II 20" Gas Chainsaw',
                'original_price': 449.00,
                'sale_price': 349.00,
                'category': 'outdoor',
                'description': '50.2cc gas-powered chainsaw'
            },
            {
                'title': 'Deckorators 6 ft Classic Vinyl Railing Kit White',
                'original_price': 199.00,
                'sale_price': 149.00,
                'category': 'building_materials',
                'description': 'Low-maintenance vinyl railing'
            },
            {
                'title': 'Moen Arbor One-Handle Pulldown Kitchen Faucet',
                'original_price': 249.00,
                'sale_price': 179.00,
                'category': 'plumbing',
                'description': 'Spot resist stainless finish'
            }
        ]

        deals = []
        for item in mock_deals:
            deal_id = hashlib.md5(f"lowes_{item['title']}".encode()).hexdigest()[:12]
            discount = ((item['original_price'] - item['sale_price']) / item['original_price']) * 100

            deal = Deal(
                id=deal_id,
                vendor='lowes',
                title=item['title'],
                original_price=item['original_price'],
                sale_price=item['sale_price'],
                discount_percent=round(discount, 2),
                category=item['category'],
                url=f"https://www.lowes.com/p/{deal_id}",
                description=item['description'],
                scraped_at=datetime.now()
            )
            deals.append(deal)

        return deals
