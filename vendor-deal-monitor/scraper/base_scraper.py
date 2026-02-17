import time
import random
from abc import ABC, abstractmethod
from typing import List
from models.deal import Deal

class BaseScraper(ABC):
    """Base class for vendor scrapers"""

    def __init__(self):
        self.user_agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        ]

    @abstractmethod
    def scrape_deals(self) -> List[Deal]:
        """Scrape deals from vendor website. Must be implemented by subclass."""
        pass

    @abstractmethod
    def get_vendor_name(self) -> str:
        """Return the vendor name. Must be implemented by subclass."""
        pass

    def random_delay(self, min_seconds: float = 1.0, max_seconds: float = 3.0):
        """Add random delay to avoid rate limiting"""
        time.sleep(random.uniform(min_seconds, max_seconds))

    def categorize_product(self, title: str, description: str = '') -> str:
        """Categorize product based on title and description."""
        text = f"{title} {description}".lower()

        category_keywords = {
            'plumbing': ['faucet', 'sink', 'toilet', 'pipe', 'drain', 'shower'],
            'electrical': ['wire', 'outlet', 'switch', 'breaker', 'electrical'],
            'flooring': ['floor', 'tile', 'carpet', 'vinyl', 'hardwood'],
            'appliances': ['refrigerator', 'washer', 'dryer', 'dishwasher'],
            'hvac': ['hvac', 'furnace', 'air conditioner', 'heater'],
            'paint': ['paint', 'primer', 'stain', 'brush', 'roller'],
            'lighting': ['light', 'fixture', 'bulb', 'led'],
            'hardware': ['door', 'lock', 'hinge', 'knob'],
            'tools': ['drill', 'saw', 'hammer', 'tool', 'wrench'],
        }

        for category, keywords in category_keywords.items():
            if any(keyword in text for keyword in keywords):
                return category

        return 'other'
