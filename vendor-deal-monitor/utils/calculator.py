"""ROI Calculator utilities for comparing vendor deals with Goldbridge cashback"""

GOLDBRIDGE_CASHBACK_RATE = 0.05  # 5% cashback

def calculate_effective_price(sale_price: float, cashback_rate: float = GOLDBRIDGE_CASHBACK_RATE) -> float:
    """Calculate effective price after cashback"""
    return sale_price * (1 - cashback_rate)

def calculate_total_savings(original_price: float, sale_price: float,
                           cashback_rate: float = GOLDBRIDGE_CASHBACK_RATE) -> float:
    """Calculate total savings including vendor discount and Goldbridge cashback"""
    vendor_discount = original_price - sale_price
    cashback = sale_price * cashback_rate
    return vendor_discount + cashback

def calculate_bulk_savings(deals: list, quantities: dict = None) -> dict:
    """Calculate savings for bulk purchases across multiple deals"""
    if quantities is None:
        quantities = {deal.id: 1 for deal in deals}

    total_original = sum(d.original_price * quantities.get(d.id, 1) for d in deals)
    total_sale = sum(d.sale_price * quantities.get(d.id, 1) for d in deals)
    total_vendor_savings = total_original - total_sale
    total_goldbridge_cashback = total_sale * GOLDBRIDGE_CASHBACK_RATE

    return {
        'total_original_price': round(total_original, 2),
        'total_sale_price': round(total_sale, 2),
        'vendor_savings': round(total_vendor_savings, 2),
        'goldbridge_cashback': round(total_goldbridge_cashback, 2),
        'total_savings': round(total_vendor_savings + total_goldbridge_cashback, 2),
        'effective_total': round(total_sale - total_goldbridge_cashback, 2),
        'savings_percent': round(((total_vendor_savings + total_goldbridge_cashback) / total_original * 100) if total_original > 0 else 0, 2)
    }

def compare_deals(deals: list, sort_by: str = 'total_savings_percent') -> list:
    """Sort deals by various criteria"""
    if sort_by == 'total_savings_percent':
        return sorted(deals, key=lambda d: d.total_savings_percent, reverse=True)
    elif sort_by == 'total_savings':
        return sorted(deals, key=lambda d: d.total_savings, reverse=True)
    elif sort_by == 'sale_price':
        return sorted(deals, key=lambda d: d.sale_price)
    return deals
