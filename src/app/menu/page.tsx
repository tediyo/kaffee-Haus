'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Coffee, Plus, Minus, Star, Heart, ShoppingCart, Clock, Flame, Award, TrendingUp } from 'lucide-react';
import SignatureDrinks from '@/components/SignatureDrinks';
import { useCart } from '@/contexts/CartContext';
import { 
  fetchMenuData, 
  MenuItem, 
  MenuData, 
  sortMenuItemsByPopularity,
  getMenuItemsByCategory 
} from '@/lib/api';

// Fallback menu items in case API fails
const fallbackMenuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Espresso',
    description: 'Rich, full-bodied coffee with a perfect crema',
    price: 3.50,
    category: 'coffee',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    isPopular: true,
    prepTime: 2,
    calories: 5,
    isVegan: true,
    is_active: true,
    sort_order: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 2,
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and foam art',
    price: 4.25,
    category: 'coffee',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    isPopular: true,
    prepTime: 3,
    calories: 120,
    is_active: true,
    sort_order: 2,
    created_at: new Date(),
    updated_at: new Date()
  }
];


export default function MenuPage() {
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState<number[]>([1, 2]);
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const loadMenuData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMenuData();
        setMenuData(data);
      } catch (err) {
        console.error('Error loading menu data:', err);
        setError('Failed to load menu data');
        // Use fallback data
        setMenuData({
          categories: [],
          allItems: fallbackMenuItems
        });
      } finally {
        setLoading(false);
      }
    };

    loadMenuData();
  }, []);

  // Get menu items based on selected category
  const getMenuItems = () => {
    if (!menuData) return fallbackMenuItems;
    
    if (selectedCategory === 'all') {
      return menuData.allItems;
    }
    
    return getMenuItemsByCategory(menuData, selectedCategory);
  };

  // Sort items by popularity by default
  const sortedItems = sortMenuItemsByPopularity(getMenuItems());

  const toggleFavorite = (itemId: number) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item, 1);
  };

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-amber-700 text-lg">Loading menu...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <Navigation />
      
      {/* Enhanced Hero Section with Background Image */}
      <section className="pt-20 pb-16 relative overflow-hidden min-h-[70vh] flex items-center">
        {/* Professional Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80")'
            }}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-amber-900/70 to-black/60" />
          {/* Additional warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-amber-800/30 to-amber-700/40" />
        </div>
        
        {/* Animated floating elements */}
        <div className="absolute inset-0 z-5 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-amber-300/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-32 right-20 w-24 h-24 bg-orange-300/30 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-amber-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white/90 border border-white/30">
              <Coffee className="h-5 w-5" />
              <span className="font-medium">Fresh Daily Menu</span>
              <Flame className="h-4 w-4 text-orange-300" />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
              Our{' '}
              <span className="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">
                Menu
              </span>
            </h1>
            
            <p className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Discover our carefully crafted selection of coffee, drinks, and pastries made with love
            </p>
          </div>
        </div>
      </section>


      {/* Signature Drinks Section */}
      <SignatureDrinks />

      {/* Error Message */}
      {error && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-700 font-semibold">{error}</p>
              <p className="text-red-600 text-sm mt-2">Using fallback menu data</p>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      {menuData && menuData.categories.length > 0 && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-white text-amber-700 hover:bg-amber-50 border border-amber-200'
                }`}
              >
                All Items
              </button>
              {menuData.categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                    selectedCategory === category.name
                      ? 'bg-amber-600 text-white shadow-lg'
                      : 'bg-white text-amber-700 hover:bg-amber-50 border border-amber-200'
                  }`}
                >
                  {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Menu Items */}
      <section className="py-12 relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80")'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/90 to-orange-50/90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedItems.length === 0 ? (
            <div className="text-center py-16">
              <Coffee className="h-16 w-16 text-amber-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No items found</h3>
              <p className="text-gray-600">
                {selectedCategory === 'all' 
                  ? 'No menu items available at the moment.' 
                  : `No items found in the ${selectedCategory} category.`
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedItems.map((item, index) => (
                <div
                  key={item._id || item.id || index}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-200 hover:scale-105"
                >
                {/* Enhanced Item Image */}
                <div className="relative h-56 bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Enhanced Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {item.isPopular && (
                      <div className="flex items-center space-x-1 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        <TrendingUp className="h-3 w-3" />
                        <span>Popular</span>
                      </div>
                    )}
                    {item.isNew && (
                      <div className="flex items-center space-x-1 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        <Award className="h-3 w-3" />
                        <span>New</span>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-4 right-4 p-3 rounded-full bg-white/90 hover:bg-white transition-all duration-200 shadow-lg hover:scale-110"
                  >
                    <Heart 
                      className={`h-5 w-5 ${
                        favorites.includes(item.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-400 hover:text-red-400'
                      }`} 
                    />
                  </button>

                  {/* Item Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3">
                    <div className="flex items-center justify-between text-sm">
                      {item.prepTime && (
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{item.prepTime}min</span>
                        </div>
                      )}
                      {item.calories && (
                        <div className="text-gray-600">
                          {item.calories} cal
                        </div>
                      )}
                      <div className="flex space-x-1">
                        {item.isVegan && <span className="text-green-600 text-xs font-semibold">🌱</span>}
                        {item.isGlutenFree && <span className="text-blue-600 text-xs font-semibold">GF</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Item Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors duration-300">{item.name}</h3>
                    <span className="text-3xl font-bold text-amber-600">${item.price}</span>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Enhanced Rating */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(item.rating)
                              ? 'text-amber-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 font-medium">{item.rating}</span>
                    <span className="text-xs text-gray-400">• 127 reviews</span>
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-amber-500/25 hover:scale-105"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
