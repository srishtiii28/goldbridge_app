from dataclasses import dataclass
from datetime import datetime
from typing import Optional

@dataclass
class Deal:
    """Represents a deal from a vendor"""
    id: str
    vendor: str  # 'home_depot', 'lowes', 'grainger'
    title: str
    original_price: float
    sale_price: float
    discount_percent: float
    category: str
    url: str
    image_url: Optional[str] = None
    description: Optional[str] = None
    valid_until: Optional[datetime] = None
    scraped_at: datetime = None

    def __post_init__(self):
        if self.scraped_at is None:
            self.scraped_at = datetime.now()

    @property
    def savings(self) -> float:
        """Calculate dollar savings"""
        return self.original_price - self.sale_price

    @property
    def with_goldbridge_cashback(self) -> float:
        """Calculate effective price with Goldbridge 5% cashback"""
        return self.sale_price * 0.95

    @property
    def total_savings(self) -> float:
        """Calculate total savings including Goldbridge cashback"""
        return self.original_price - self.with_goldbridge_cashback

    @property
    def total_savings_percent(self) -> float:
        """Calculate total savings percentage including Goldbridge cashback"""
        if self.original_price == 0:
            return 0
        return (self.total_savings / self.original_price) * 100

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization"""
        return {
            'id': self.id,
            'vendor': self.vendor,
            'title': self.title,
            'original_price': self.original_price,
            'sale_price': self.sale_price,
            'discount_percent': self.discount_percent,
            'category': self.category,
            'url': self.url,
            'image_url': self.image_url,
            'description': self.description,
            'valid_until': self.valid_until.isoformat() if self.valid_until else None,
            'scraped_at': self.scraped_at.isoformat() if self.scraped_at else None,
            'savings': self.savings,
            'with_goldbridge_cashback': self.with_goldbridge_cashback,
            'total_savings': self.total_savings,
            'total_savings_percent': round(self.total_savings_percent, 2)
        }

CATEGORIES = [
    'plumbing',
    'electrical',
    'flooring',
    'appliances',
    'hvac',
    'paint',
    'lighting',
    'hardware',
    'tools',
    'building_materials',
    'outdoor',
    'other'
]

VENDOR_NAMES = {
    'home_depot': 'The Home Depot',
    'lowes': "Lowe's",
    'grainger': 'Grainger'
}
