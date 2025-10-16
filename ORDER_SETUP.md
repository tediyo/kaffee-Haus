# Order System Setup

## Quick Start

### Option 1: Start Both Servers (Recommended)
```bash
# On Windows
start-admin.bat

# On Mac/Linux
chmod +x start-admin.sh
./start-admin.sh
```

### Option 2: Manual Start

1. **Start Admin Panel** (Terminal 1):
```bash
cd coffee-shop-admin-panel
npm run dev
```
Admin panel will run on http://localhost:3002

2. **Start Coffee Shop** (Terminal 2):
```bash
cd coffee-shop
npm run dev
```
Coffee shop will run on http://localhost:3000

## Order System Features

### ✅ Online Mode (Admin Panel Running)
- Orders are saved to MongoDB database
- Real-time order management in admin panel
- Order tracking and status updates
- Persistent order history

### ✅ Offline Mode (Admin Panel Not Running)
- Orders are saved locally in browser
- Order confirmation still works
- Orders can be viewed in order confirmation page
- Graceful fallback with user notification

## Testing the Order System

1. **Add items to cart** from the menu page
2. **Click cart icon** to view cart
3. **Proceed to checkout** and fill in details
4. **Place order** - will work in both online and offline modes
5. **View order confirmation** with order details

## Troubleshooting

### "Failed to place order" Error
- **If admin panel is running**: Check console for specific error message
- **If admin panel is not running**: Order will automatically use offline mode
- **Network issues**: System will fallback to local storage

### Order Not Found Error
- Check that order number and email match exactly
- For local orders, ensure browser storage is not cleared
- Try refreshing the page

## Admin Panel Features

- View all orders in real-time
- Update order status (pending → confirmed → preparing → ready → completed)
- Manage order settings (delivery fees, tax rates, prep times)
- Order filtering and search
- Customer information and order details

