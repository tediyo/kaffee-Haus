'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Coffee, Plus, Minus, Star, Heart, Filter } from 'lucide-react';

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
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Espresso',
    description: 'Rich, full-bodied coffee with a perfect crema',
    price: 3.50,
    category: 'coffee',
    rating: 4.8,
    image: '☕',
    isPopular: true
  },
  {
    id: 2,
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and foam art',
    price: 4.25,
    category: 'coffee',
    rating: 4.9,
    image: '☕',
    isPopular: true
  },
  {
    id: 3,
    name: 'Latte',
    description: 'Smooth espresso with steamed milk and light foam',
    price: 4.50,
    category: 'coffee',
    rating: 4.7,
    image: '☕'
  },
  {
    id: 4,
    name: 'Mocha',
    description: 'Espresso with chocolate and steamed milk',
    price: 5.00,
    category: 'coffee',
    rating: 4.6,
    image: '☕'
  },
  {
    id: 5,
    name: 'Americano',
    description: 'Espresso with hot water for a clean taste',
    price: 3.75,
    category: 'coffee',
    rating: 4.5,
    image: '☕'
  },
  {
    id: 6,
    name: 'Macchiato',
    description: 'Espresso with a dollop of foam',
    price: 4.00,
    category: 'coffee',
    rating: 4.7,
    image: '☕',
    isNew: true
  },
  {
    id: 7,
    name: 'Cold Brew',
    description: 'Smooth, cold-extracted coffee',
    price: 4.25,
    category: 'cold',
    rating: 4.8,
    image: '🧊'
  },
  {
    id: 8,
    name: 'Iced Latte',
    description: 'Cold espresso with milk over ice',
    price: 4.75,
    category: 'cold',
    rating: 4.6,
    image: '🧊'
  },
  {
    id: 9,
    name: 'Frappé',
    description: 'Blended coffee with ice and cream',
    price: 5.50,
    category: 'cold',
    rating: 4.4,
    image: '🧊'
  },
  {
    id: 10,
    name: 'Croissant',
    description: 'Buttery, flaky pastry',
    price: 3.25,
    category: 'pastry',
    rating: 4.5,
    image: '🥐'
  },
  {
    id: 11,
    name: 'Muffin',
    description: 'Fresh baked blueberry muffin',
    price: 2.75,
    category: 'pastry',
    rating: 4.3,
    image: '🧁'
  },
  {
    id: 12,
    name: 'Bagel',
    description: 'Fresh bagel with cream cheese',
    price: 3.50,
    category: 'pastry',
    rating: 4.4,
    image: '🥯'
  }
];

const categories = [
  { id: 'all', name: 'All Items', icon: '🍽️' },
  { id: 'coffee', name: 'Hot Coffee', icon: '☕' },
  { id: 'cold', name: 'Cold Drinks', icon: '🧊' },
  { id: 'pastry', name: 'Pastries', icon: '🥐' }
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-amber-800 to-amber-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Our Menu
            </h1>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto">
              Discover our carefully crafted selection of coffee, drinks, and pastries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Item Image */}
                <div className="relative h-48 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                  <span className="text-6xl">{item.image}</span>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    {item.isPopular && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Popular
                      </span>
                    )}
                    {item.isNew && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        New
                      </span>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
                  >
                    <Heart 
                      className={`h-5 w-5 ${
                        favorites.includes(item.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </button>
                </div>

                {/* Item Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                    <span className="text-2xl font-bold text-amber-600">${item.price}</span>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
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
                    <span className="text-sm text-gray-500 ml-2">{item.rating}</span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-lg font-semibold min-w-[2rem] text-center">
                        {quantities[item.id] || 0}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors duration-200"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cart Summary */}
      {Object.values(quantities).some(qty => qty > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl p-6 max-w-sm"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">Your Order</h3>
          <div className="space-y-2 mb-4">
            {Object.entries(quantities).map(([itemId, qty]) => {
              if (qty === 0) return null;
              const item = menuItems.find(i => i.id === parseInt(itemId));
              if (!item) return null;
              
              return (
                <div key={itemId} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{item.name} x{qty}</span>
                  <span className="text-sm font-semibold">${(item.price * qty).toFixed(2)}</span>
                </div>
              );
            })}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-gray-800">Total:</span>
              <span className="font-bold text-amber-600">
                ${Object.entries(quantities).reduce((total, [itemId, qty]) => {
                  const item = menuItems.find(i => i.id === parseInt(itemId));
                  return total + (item ? item.price * qty : 0);
                }, 0).toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-full font-semibold transition-colors duration-200">
              Checkout
            </button>
          </div>
        </motion.div>
      )}
    </main>
  );
}
