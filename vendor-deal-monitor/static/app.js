// Shopping Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Project Bundles
const projectBundles = {
    bathroom_reno: {
        name: "Bathroom Renovation",
        icon: "🚿",
        items: ["toilet", "faucet", "tile", "vanity"],
        description: "Complete bathroom renovation essentials"
    },
    kitchen_update: {
        name: "Kitchen Update",
        icon: "🔪",
        items: ["faucet", "paint", "light", "hardware"],
        description: "Refresh your kitchen"
    },
    exterior_paint: {
        name: "Exterior Paint Job",
        icon: "🎨",
        items: ["paint", "brush", "ladder", "primer"],
        description: "Complete exterior painting supplies"
    },
    electrical_upgrade: {
        name: "Electrical Upgrade",
        icon: "⚡",
        items: ["outlet", "switch", "breaker", "wire"],
        description: "Electrical system improvements"
    }
};

// Cart Functions
function addToCart(dealId) {
    const deal = allDeals.find(d => d.id === dealId);
    if (deal) {
        const existingItem = cart.find(item => item.id === dealId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...deal, quantity: 1 });
        }
        saveCart();
        updateCartUI();
        showNotification(`Added ${deal.title.substring(0, 30)}... to cart`, 'success');
    }
}

function removeFromCart(dealId) {
    cart = cart.filter(item => item.id !== dealId);
    saveCart();
    updateCartUI();
}

function updateCartQuantity(dealId, quantity) {
    const item = cart.find(item => item.id === dealId);
    if (item) {
        item.quantity = Math.max(1, parseInt(quantity));
        saveCart();
        updateCartUI();
    }
}

function clearCart() {
    if (confirm('Clear all items from cart?')) {
        cart = [];
        saveCart();
        updateCartUI();
        showNotification('Cart cleared', 'info');
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Favorites Functions
function toggleFavorite(dealId) {
    const deal = allDeals.find(d => d.id === dealId);
    if (!deal) return;

    const index = favorites.findIndex(f => f.id === dealId);
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('Removed from favorites', 'info');
    } else {
        favorites.push(deal);
        showNotification('Added to favorites', 'success');
    }
    saveFavorites();
    renderDeals(allDeals); // Re-render to update heart icons
}

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function isFavorite(dealId) {
    return favorites.some(f => f.id === dealId);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500'
    };

    notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Calculate Cart Totals
function calculateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.sale_price * item.quantity), 0);
    const vendorSavings = cart.reduce((sum, item) => sum + ((item.original_price - item.sale_price) * item.quantity), 0);
    const goldbridgeCashback = subtotal * 0.05;
    const totalSavings = vendorSavings + goldbridgeCashback;
    const finalCost = subtotal - goldbridgeCashback;

    return {
        subtotal,
        vendorSavings,
        goldbridgeCashback,
        totalSavings,
        finalCost,
        savingsPercent: ((totalSavings / (subtotal + vendorSavings)) * 100)
    };
}

// Update Cart UI
function updateCartUI() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.display = cartCount > 0 ? 'inline-block' : 'none';
    }
}

// Export functions for use in HTML
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.clearCart = clearCart;
window.toggleFavorite = toggleFavorite;
window.calculateCartTotals = calculateCartTotals;
window.cart = cart;
window.favorites = favorites;
window.projectBundles = projectBundles;
