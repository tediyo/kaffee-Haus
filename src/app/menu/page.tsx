'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Coffee, Plus, Minus, Star, Heart, Filter, Search, ShoppingCart, Clock, Flame, Award, TrendingUp } from 'lucide-react';

interface MenuItem {
  id: number;
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
}

const menuItems: MenuItem[] = [
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
    isVegan: true
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
    calories: 120
  },
  {
    id: 3,
    name: 'Latte',
    description: 'Smooth espresso with steamed milk and light foam',
    price: 4.50,
    category: 'coffee',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    prepTime: 4,
    calories: 150
  },
  {
    id: 4,
    name: 'Mocha',
    description: 'Espresso with chocolate and steamed milk',
    price: 5.00,
    category: 'coffee',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    prepTime: 5,
    calories: 250
  },
  {
    id: 5,
    name: 'Americano',
    description: 'Espresso with hot water for a clean taste',
    price: 3.75,
    category: 'coffee',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    prepTime: 2,
    calories: 10,
    isVegan: true
  },
  {
    id: 6,
    name: 'Macchiato',
    description: 'Espresso with a dollop of foam',
    price: 4.00,
    category: 'coffee',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    isNew: true,
    prepTime: 3,
    calories: 80,
    isVegan: true
  },
  {
    id: 7,
    name: 'Cold Brew',
    description: 'Smooth, cold-extracted coffee',
    price: 4.25,
    category: 'cold',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090a?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    prepTime: 1,
    calories: 5,
    isVegan: true
  },
  {
    id: 8,
    name: 'Iced Latte',
    description: 'Cold espresso with milk over ice',
    price: 4.75,
    category: 'cold',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090a?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    prepTime: 2,
    calories: 120
  },
  {
    id: 9,
    name: 'Frappé',
    description: 'Blended coffee with ice and cream',
    price: 5.50,
    category: 'cold',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090a?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    prepTime: 4,
    calories: 350
  },
  {
    id: 10,
    name: 'Croissant',
    description: 'Buttery, flaky pastry',
    price: 3.25,
    category: 'pastry',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    prepTime: 1,
    calories: 280,
    isGlutenFree: false
  },
  {
    id: 11,
    name: 'Muffin',
    description: 'Fresh baked blueberry muffin',
    price: 2.75,
    category: 'pastry',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    prepTime: 1,
    calories: 320
  },
  {
    id: 12,
    name: 'Bagel',
    description: 'Fresh bagel with cream cheese',
    price: 3.50,
    category: 'pastry',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    prepTime: 2,
    calories: 300
  }
];

const categories = [
  { id: 'all', name: 'All Items', icon: '🍽️', color: 'from-gray-500 to-gray-600' },
  { id: 'coffee', name: 'Hot Coffee', icon: '☕', color: 'from-amber-500 to-amber-600' },
  { id: 'cold', name: 'Cold Drinks', icon: '🧊', color: 'from-blue-500 to-blue-600' },
  { id: 'pastry', name: 'Pastries', icon: '🥐', color: 'from-orange-500 to-orange-600' }
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [favorites, setFavorites] = useState<number[]>([1, 2]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const searchFilteredItems = searchQuery 
    ? filteredItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredItems;

  const sortedItems = [...searchFilteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
      default:
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    }
  });

  const updateQuantity = (itemId: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const toggleFavorite = (itemId: number) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = Object.entries(quantities).reduce((total, [itemId, qty]) => {
    const item = menuItems.find(i => i.id === parseInt(itemId));
    return total + (item ? item.price * qty : 0);
  }, 0);

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

      {/* Enhanced Search and Filters */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-amber-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 shadow-sm"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 shadow-sm"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                      : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Menu Items */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedItems.map((item, index) => (
              <div
                key={item.id}
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

                  {/* Enhanced Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 hover:scale-110"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-lg font-semibold min-w-[2rem] text-center">
                        {quantities[item.id] || 0}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors duration-200 hover:scale-110"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-amber-500/25 hover:scale-105">
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Cart Summary */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 right-6 bg-white rounded-3xl shadow-2xl p-6 max-w-sm border border-amber-200/30 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-amber-600" />
              <span>Your Order</span>
              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">{totalItems}</span>
            </h3>
            <button className="text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
            {Object.entries(quantities).map(([itemId, qty]) => {
              if (qty === 0) return null;
              const item = menuItems.find(i => i.id === parseInt(itemId));
              if (!item) return null;
              
              return (
                <div key={itemId} className="flex justify-between items-center bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-800">{item.name}</span>
                      <div className="text-xs text-gray-500">x{qty}</div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-amber-600">${(item.price * qty).toFixed(2)}</span>
                </div>
              );
            })}
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-gray-800">Total:</span>
              <span className="font-bold text-2xl text-amber-600">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-amber-500/25">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
