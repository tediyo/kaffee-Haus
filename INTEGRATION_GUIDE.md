# Menu Integration Guide

This guide explains how to set up and test the integration between the coffee shop frontend and the admin panel for dynamic menu management.

## 🚀 Quick Start

### 1. Start Both Servers

**Terminal 1 - Admin Panel:**
```bash
cd coffee-shop-admin-panel
npm run dev
```
Admin panel will run on: http://localhost:3002

**Terminal 2 - Coffee Shop:**
```bash
cd coffee-shop
npm run dev
```
Coffee shop will run on: http://localhost:3000

### 2. Initialize Sample Data

1. Open http://localhost:3002 in your browser
2. Login to the admin panel
3. Navigate to "Menu Management" > "Menu Items"
4. Click "Init Sample Data" button
5. This will populate the database with sample menu items and categories

### 3. View Dynamic Menu

1. Open http://localhost:3000/menu in your browser
2. You should see the menu populated with data from the admin panel
3. Try the category filtering buttons
4. Test the add to cart functionality

## 🧪 Testing Integration

Run the integration test script:
```bash
cd coffee-shop
node test-integration.js
```

This will test:
- ✅ Admin panel connectivity
- ✅ Coffee shop connectivity  
- ✅ Menu data structure
- ✅ API endpoints

## 🔧 Configuration

### Environment Variables

The coffee shop is configured to connect to the admin panel via:
```typescript
const ADMIN_API_BASE_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3002';
```

To change the admin panel URL, create a `.env.local` file:
```env
NEXT_PUBLIC_ADMIN_API_URL=http://your-admin-panel-url:3002
```

### API Endpoints

**Admin Panel (Port 3002):**
- `GET /api/public/menu` - Public menu data (no auth required)
- `GET /api/menu-items` - Admin menu items (auth required)
- `POST /api/menu-items` - Create/update menu item (auth required)
- `DELETE /api/menu-items?id={id}` - Delete menu item (auth required)
- `GET /api/menu-categories` - Admin categories (auth required)
- `POST /api/menu-categories` - Create/update category (auth required)
- `DELETE /api/menu-categories?id={id}` - Delete category (auth required)
- `POST /api/init-menu` - Initialize sample data (auth required)

**Coffee Shop (Port 3000):**
- `GET /menu` - Menu page with dynamic content

## 📊 Data Flow

```
Admin Panel (Port 3002)
    ↓ (API calls)
Coffee Shop (Port 3000)
    ↓ (User interactions)
Customer Experience
```

1. **Admin manages menu** → Data stored in MongoDB
2. **Coffee shop fetches data** → Via public API endpoint
3. **Menu displays dynamically** → Based on admin panel data
4. **Real-time updates** → Changes in admin panel reflect immediately

## 🎨 Features

### Admin Panel Features
- ✅ Full CRUD operations for menu items and categories
- ✅ Rich form interface with all menu properties
- ✅ Image URL support with preview
- ✅ Badge management (Popular, New)
- ✅ Dietary information (Vegan, Gluten-Free)
- ✅ Rating, prep time, and calorie tracking
- ✅ Category-based organization
- ✅ Sort order customization
- ✅ Active/Inactive status management
- ✅ Sample data initialization

### Coffee Shop Features
- ✅ Dynamic menu loading from admin panel
- ✅ Category filtering
- ✅ Loading states and error handling
- ✅ Fallback data when API fails
- ✅ Responsive design
- ✅ Add to cart functionality
- ✅ Favorite items
- ✅ Popular/New item badges
- ✅ Dietary indicators

## 🐛 Troubleshooting

### Common Issues

**1. "Failed to load menu data" error**
- Check if admin panel is running on port 3002
- Verify MongoDB connection in admin panel
- Check browser console for CORS errors

**2. Empty menu display**
- Initialize sample data in admin panel
- Check if menu items are marked as active
- Verify API endpoint is accessible

**3. CORS errors**
- Admin panel should handle CORS for public endpoints
- Check if both servers are running on correct ports

**4. Database connection issues**
- Verify MongoDB is running
- Check connection string in admin panel
- Ensure database collections exist

### Debug Steps

1. **Check server status:**
   ```bash
   # Admin panel
   curl http://localhost:3002/api/public/menu
   
   # Coffee shop
   curl http://localhost:3000/menu
   ```

2. **Check browser console:**
   - Open Developer Tools
   - Look for network errors
   - Check API response status

3. **Verify data structure:**
   ```bash
   node test-integration.js
   ```

## 🔄 Development Workflow

1. **Make changes in admin panel** → Menu items, categories, etc.
2. **Changes are saved to database** → MongoDB
3. **Coffee shop fetches updated data** → Via API
4. **Menu updates automatically** → No restart needed

## 📝 API Documentation

### Menu Data Structure

```typescript
interface MenuItem {
  _id?: string;
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  isPopular?: boolean;
  isNew?: boolean;
  prepTime?: number;
  calories?: number;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

interface MenuCategory {
  _id?: string;
  name: string;
  description?: string;
  sort_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  items?: MenuItem[];
}
```

### Public API Response

```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "name": "coffee",
        "description": "Hot coffee drinks",
        "items": [...]
      }
    ],
    "allItems": [...]
  }
}
```

## 🎯 Next Steps

1. **Customize menu items** in the admin panel
2. **Add your own categories** and organize items
3. **Upload custom images** for menu items
4. **Configure dietary information** and badges
5. **Set up production deployment** with proper environment variables

The integration is now complete and ready for use! 🎉
