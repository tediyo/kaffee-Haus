'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Flame, Search, X } from 'lucide-react';

interface SignatureDrink {
  id: number;
  name: string;
  span: string;
  image: string;
  ingredients: string[];
  price: number;
  rating: number;
  prepTime: number;
  description: string;
  category: string;
}

const signatureDrinks: SignatureDrink[] = [
  {
    id: 1,
    name: 'Ethiopian',
    span: 'Yirgacheffe',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=600&fit=crop&crop=center&auto=format&q=80',
    ingredients: ['Single Origin Beans', 'Light Roast', 'Floral Notes', 'Citrus Finish'],
    price: 4.50,
    rating: 4.9,
    prepTime: 3,
    description: 'Premium single origin coffee with bright acidity and floral aromas',
    category: 'coffee'
  },
  {
    id: 2,
    name: 'Colombian',
    span: 'Supremo',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=600&fit=crop&crop=center&auto=format&q=80',
    ingredients: ['Colombian Beans', 'Medium Roast', 'Chocolate Notes', 'Nutty Finish'],
    price: 4.25,
    rating: 4.8,
    prepTime: 4,
    description: 'Rich and full-bodied with chocolate undertones',
    category: 'coffee'
  },
  {
    id: 3,
    name: 'Italian',
    span: 'Espresso',
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&h=600&fit=crop&crop=center&auto=format&q=80',
    ingredients: ['Dark Roast Blend', 'Robusta & Arabica', 'Bold Flavor', 'Perfect Crema'],
    price: 3.75,
    rating: 4.7,
    prepTime: 2,
    description: 'Classic Italian espresso with perfect crema and bold flavor',
    category: 'coffee'
  },
  {
    id: 4,
    name: 'Cappuccino',
    span: 'Art',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=600&fit=crop&crop=center&auto=format&q=80',
    ingredients: ['Espresso', 'Steamed Milk', 'Milk Foam', 'Latte Art'],
    price: 4.50,
    rating: 4.9,
    prepTime: 5,
    description: 'Perfectly balanced espresso with beautiful foam art',
    category: 'coffee'
  },
  {
    id: 5,
    name: 'Iced',
    span: 'Latte',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090a?w=400&h=600&fit=crop&crop=center&auto=format&q=80',
    ingredients: ['Cold Espresso', 'Milk', 'Ice', 'Refreshing'],
    price: 4.75,
    rating: 4.6,
    prepTime: 2,
    description: 'Cold espresso with milk over ice for a refreshing drink',
    category: 'cold'
  },
  {
    id: 6,
    name: 'Cold Brew',
    span: 'Perfection',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090a?w=400&h=600&fit=crop&crop=center&auto=format&q=80',
    ingredients: ['Cold Extracted', 'Smooth Finish', 'Low Acidity', 'Refreshing'],
    price: 4.00,
    rating: 4.8,
    prepTime: 1,
    description: 'Smooth cold-extracted coffee with low acidity',
    category: 'cold'
  },
  {
    id: 7,
    name: 'Croissant',
    span: 'Delight',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=600&fit=crop&crop=center&auto=format&q=80',
    ingredients: ['Buttery', 'Flaky', 'Fresh Baked', 'Golden'],
    price: 3.25,
    rating: 4.5,
    prepTime: 1,
    description: 'Buttery, flaky pastry perfect with coffee',
    category: 'pastry'
  },
  {
    id: 8,
    name: 'Muffin',
    span: 'Fresh',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=600&fit=crop&crop=center&auto=format&q=80',
    ingredients: ['Blueberry', 'Fresh Baked', 'Moist', 'Sweet'],
    price: 2.75,
    rating: 4.3,
    prepTime: 1,
    description: 'Fresh baked blueberry muffin',
    category: 'pastry'
  }
];

const categories = [
  { id: 'all', name: 'All Items', icon: '🍽️', color: 'from-gray-500 to-gray-600' },
  { id: 'coffee', name: 'Hot Coffee', icon: '☕', color: 'from-amber-500 to-amber-600' },
  { id: 'cold', name: 'Cold Drinks', icon: '🧊', color: 'from-blue-500 to-blue-600' },
  { id: 'pastry', name: 'Pastries', icon: '🥐', color: 'from-orange-500 to-orange-600' }
];

const SignatureDrinks = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDrinks = signatureDrinks.filter(drink => {
    const matchesCategory = selectedCategory === 'all' || drink.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      drink.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drink.span.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drink.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drink.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 text-amber-800 border border-amber-200 mb-6"
          >
            <Coffee className="h-5 w-5" />
            <span className="font-semibold">Our Signature Drinks</span>
            <Flame className="h-4 w-4 text-orange-500" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
          >
            Crafted with{' '}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Passion
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Explore our signature coffee creations, each carefully crafted to perfection
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search drinks, ingredients, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 shadow-sm text-gray-700"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
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
        </motion.div>

        {/* Search Results Info */}
        {(searchQuery || selectedCategory !== 'all') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <p className="text-gray-600">
              {filteredDrinks.length > 0 ? (
                <>
                  Showing <span className="font-semibold text-amber-600">{filteredDrinks.length}</span> result{filteredDrinks.length !== 1 ? 's' : ''}
                  {searchQuery && (
                    <> for "<span className="font-semibold text-amber-600">{searchQuery}</span>"</>
                  )}
                </>
              ) : (
                <>
                  No results found
                  {searchQuery && (
                    <> for "<span className="font-semibold text-amber-600">{searchQuery}</span>"</>
                  )}
                  {selectedCategory !== 'all' && (
                    <> in <span className="font-semibold text-amber-600">{categories.find(c => c.id === selectedCategory)?.name}</span></>
                  )}
                </>
              )}
            </p>
          </motion.div>
        )}

        {/* Interactive Slideshow Container - Horizontal Layout */}
        <div className="flex flex-wrap justify-center gap-8">
          {filteredDrinks.length > 0 ? (
            filteredDrinks.map((drink, index) => (
              <div key={drink.id} className="slideshow-container">
                <div className="slideshow">
                  <div
                    className="slide"
                    style={{ '--i': 0 } as React.CSSProperties}
                  >
                    <h2>
                      {drink.name}
                      <span>{drink.span}</span>
                    </h2>
                    <img src={drink.image} alt={drink.name} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">No Results Found</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Try adjusting your search terms or browse different categories to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 text-lg">
            Watch our signature drinks rotate in 3D space
          </p>
        </motion.div>
      </div>

      <style jsx global>{`
        .slideshow-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slideshow {
          position: relative;
          width: 250px;
          height: 350px;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .slideshow .slide {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: start;
          justify-content: start;
          transform: rotateY(270deg);
          transform-style: preserve-3d;
          animation: animate 8s linear infinite;
          animation-delay: calc(var(--i) * 0.5s);
        }

        @keyframes animate {
          0% {
            transform: rotateY(270deg);
          }
          25% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(90deg);
          }
          75% {
            transform: rotateY(180deg);
          }
          100% {
            transform: rotateY(270deg);
          }
        }

        .slideshow .slide img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .slideshow .slide h2 {
          position: relative;
          z-index: 1000;
          color: #000000;
          font-size: 1.8em;
          transform: rotateY(180deg) translateY(120px) translateZ(50px);
          transform-style: preserve-3d;
          backface-visibility: hidden;
          font-weight: 900;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .slideshow .slide h2 span {
          position: absolute;
          top: 50%;
          left: 0;
          font-size: 1.8em;
          font-weight: 300;
          transform: translateZ(50px);
          backface-visibility: hidden;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .slideshow {
            width: 200px;
            height: 300px;
          }
          
          .slideshow .slide h2 {
            font-size: 1.4em;
            transform: rotateY(180deg) translateY(100px) translateZ(40px);
          }
          
          .slideshow .slide h2 span {
            font-size: 1.4em;
            transform: translateZ(40px);
          }
        }

        @media (max-width: 480px) {
          .slideshow {
            width: 180px;
            height: 280px;
          }
          
          .slideshow .slide h2 {
            font-size: 1.2em;
            transform: rotateY(180deg) translateY(90px) translateZ(30px);
          }
          
          .slideshow .slide h2 span {
            font-size: 1.2em;
            transform: translateZ(30px);
          }
        }
      `}</style>
    </section>
  );
};

export default SignatureDrinks;
