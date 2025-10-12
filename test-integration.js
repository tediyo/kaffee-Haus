// Simple integration test script
// Run this after starting both servers to test the menu integration

const ADMIN_API_URL = 'http://localhost:3002';
const COFFEE_SHOP_URL = 'http://localhost:3000';

async function testIntegration() {
  console.log('🧪 Testing Menu Integration...\n');

  try {
    // Test 1: Check if admin panel is running
    console.log('1. Testing admin panel connection...');
    const adminResponse = await fetch(`${ADMIN_API_URL}/api/public/menu`);
    if (adminResponse.ok) {
      const adminData = await adminResponse.json();
      console.log('✅ Admin panel is running');
      console.log(`   - Categories: ${adminData.data?.categories?.length || 0}`);
      console.log(`   - Menu items: ${adminData.data?.allItems?.length || 0}`);
    } else {
      console.log('❌ Admin panel is not responding');
      return;
    }

    // Test 2: Check if coffee shop is running
    console.log('\n2. Testing coffee shop connection...');
    const coffeeShopResponse = await fetch(`${COFFEE_SHOP_URL}/menu`);
    if (coffeeShopResponse.ok) {
      console.log('✅ Coffee shop is running');
    } else {
      console.log('❌ Coffee shop is not responding');
      return;
    }

    // Test 3: Test menu data structure
    console.log('\n3. Testing menu data structure...');
    const menuResponse = await fetch(`${ADMIN_API_URL}/api/public/menu`);
    const menuData = await menuResponse.json();
    
    if (menuData.success && menuData.data) {
      const { categories, allItems } = menuData.data;
      
      // Check if we have categories
      if (categories && categories.length > 0) {
        console.log('✅ Categories found:');
        categories.forEach(cat => {
          console.log(`   - ${cat.name}: ${cat.items?.length || 0} items`);
        });
      } else {
        console.log('⚠️  No categories found - you may need to initialize sample data');
      }

      // Check if we have menu items
      if (allItems && allItems.length > 0) {
        console.log('✅ Menu items found:');
        allItems.slice(0, 3).forEach(item => {
          console.log(`   - ${item.name}: $${item.price} (${item.category})`);
        });
        if (allItems.length > 3) {
          console.log(`   ... and ${allItems.length - 3} more items`);
        }
      } else {
        console.log('⚠️  No menu items found - you may need to initialize sample data');
      }
    } else {
      console.log('❌ Invalid menu data structure');
    }

    console.log('\n🎉 Integration test completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Open http://localhost:3002 in your browser');
    console.log('2. Go to "Menu Management" > "Menu Items"');
    console.log('3. Click "Init Sample Data" to populate the database');
    console.log('4. Open http://localhost:3000/menu to see the dynamic menu');

  } catch (error) {
    console.error('❌ Integration test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure both servers are running:');
    console.log('   - Admin panel: npm run dev (in coffee-shop-admin-panel)');
    console.log('   - Coffee shop: npm run dev (in coffee-shop)');
    console.log('2. Check that ports 3000 and 3002 are available');
    console.log('3. Verify MongoDB connection in admin panel');
  }
}

// Run the test
testIntegration();
