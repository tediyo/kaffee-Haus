'use client';

import { useState, useEffect } from 'react';
import { Coffee, Star, Heart, ShoppingCart, Plus, Minus, Eye, Share2, Download } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  images: string[];
  category: string;
  isNew?: boolean;
  isPopular?: boolean;
  discount?: number;
  inStock: boolean;
  features: string[];
  origin: string;
  roast: string;
  flavor: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    description: "Single-origin coffee with bright acidity and floral notes. Grown in the highlands of Ethiopia.",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.9,
    reviews: 127,
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&crop=center&auto=format&q=80&ixlib=rb-4.0.3"
    ],
    category: "coffee",
    isPopular: true,
    discount: 17,
    inStock: true,
    features: ["Single Origin", "Light Roast", "Organic", "Fair Trade"],
    origin: "Ethiopia",
    roast: "Light",
    flavor: ["Floral", "Citrus", "Bright"]
  },
  {
    id: 2,
    name: "Colombian Supremo",
    description: "Rich, full-bodied coffee with chocolate and nutty undertones. Perfect for espresso.",
    price: 22.99,
    rating: 4.8,
    reviews: 89,
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&crop=center&auto=format&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&crop=center&auto=format&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&crop=center&auto=format&q=80&ixlib=rb-4.0.3"
    ],
    category: "coffee",
    isNew: true,
    inStock: true,
    features: ["Single Origin", "Medium Roast", "Premium Grade"],
    origin: "Colombia",
    roast: "Medium",
    flavor: ["Chocolate", "Nutty", "Smooth"]
  },
  {
    id: 3,
    name: "Jamaican Blue Mountain",
    description: "Rare and exquisite coffee with mild flavor and lack of bitterness. The world's most expensive coffee.",
    price: 89.99,
    rating: 4.9,
    reviews: 45,
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&crop=center&auto=format&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&crop=center&auto=format&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&crop=center&auto=format&q=80&ixlib=rb-4.0.3"
    ],
    category: "coffee",
    inStock: true,
    features: ["Single Origin", "Light Roast", "Rare", "Premium"],
    origin: "Jamaica",
    roast: "Light",
    flavor: ["Mild", "Sweet", "Clean"]
  },
  {
    id: 4,
    name: "Italian Espresso Blend",
    description: "Dark roasted blend perfect for authentic Italian espresso. Rich, bold, and aromatic.",
    price: 19.99,
    rating: 4.7,
    reviews: 156,
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&crop=center&auto=format&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&crop=center&auto=format&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop&crop=center&auto=format&q=80&ixlib=rb-4.0.3"
    ],
    category: "coffee",
    isPopular: true,
    inStock: true,
    features: ["Blend", "Dark Roast", "Espresso", "Italian Style"],
    origin: "Italy",
    roast: "Dark",
    flavor: ["Bold", "Rich", "Aromatic"]
  }
];

const InteractiveProductShowcase = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isZoomed, setIsZoomed] = useState(false);

  const updateQuantity = (productId: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % selectedProduct.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      );
    }
  };

  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = Object.entries(quantities).reduce((total, [productId, qty]) => {
    const product = products.find(p => p.id === parseInt(productId));
    return total + (product ? product.price * qty : 0);
  }, 0);

  return (
    <div className="py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 text-amber-800 border border-amber-200 mb-6">
            <Coffee className="h-5 w-5" />
            <span className="font-semibold">Premium Coffee Collection</span>
            <Star className="h-4 w-4 text-amber-500" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Interactive{' '}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Product Showcase
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our premium coffee collection with interactive 360° views, detailed information, and professional photography
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100 hover:border-amber-200 cursor-pointer"
              onClick={() => openProductModal(product)}
            >
              {/* Product Image */}
              <div className="relative h-64 bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.isNew && (
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      New
                    </div>
                  )}
                  {product.isPopular && (
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      Popular
                    </div>
                  )}
                  {product.discount && (
                    <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                  className="absolute top-4 right-4 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg"
                >
                  <Heart 
                    className={`h-5 w-5 ${
                      favorites.includes(product.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-400 hover:text-red-400'
                    }`} 
                  />
                </button>

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <button className="p-3 bg-white rounded-full hover:bg-amber-50">
                      <Eye className="h-5 w-5 text-gray-700" />
                    </button>
                    <button className="p-3 bg-white rounded-full hover:bg-amber-50">
                      <Share2 className="h-5 w-5 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-amber-600">
                    {product.name}
                  </h3>
                  <div className="text-right">
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through block">
                        ${product.originalPrice}
                      </span>
                    )}
                    <span className="text-2xl font-bold text-amber-600">
                      ${product.price}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-amber-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 font-medium">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.slice(0, 2).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Add to Cart */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(product.id, -1);
                      }}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-lg font-semibold min-w-[2rem] text-center">
                      {quantities[product.id] || 0}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(product.id, 1);
                      }}
                      className="p-2 rounded-full bg-amber-100 hover:bg-amber-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(product.id, 1);
                    }}
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-4 py-2 rounded-xl font-semibold flex items-center space-x-2 shadow-lg"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        {totalItems > 0 && (
          <div className="fixed bottom-6 right-6 bg-white rounded-3xl shadow-2xl p-6 max-w-sm border border-amber-200/30 backdrop-blur-sm z-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5 text-amber-600" />
                <span>Your Order</span>
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                  {totalItems}
                </span>
              </h3>
            </div>
            
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
              {Object.entries(quantities).map(([productId, qty]) => {
                if (qty === 0) return null;
                const product = products.find(p => p.id === parseInt(productId));
                if (!product) return null;
                
                return (
                  <div key={productId} className="flex justify-between items-center bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-800">{product.name}</span>
                        <div className="text-xs text-gray-500">x{qty}</div>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-amber-600">
                      ${(product.price * qty).toFixed(2)}
                    </span>
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

        {/* Product Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                {/* Image Gallery */}
                <div className="space-y-4">
                  <div className="relative h-96 bg-gray-100 rounded-2xl overflow-hidden">
                    <img
                      src={selectedProduct.images[currentImageIndex]}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover cursor-zoom-in"
                      onClick={() => setIsZoomed(!isZoomed)}
                    />
                    
                    {/* Navigation Arrows */}
                    {selectedProduct.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {selectedProduct.images.length}
                    </div>
                  </div>

                  {/* Thumbnail Gallery */}
                  <div className="flex space-x-2 overflow-x-auto">
                    {selectedProduct.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          index === currentImageIndex
                            ? 'border-amber-500 shadow-lg'
                            : 'border-gray-200 hover:border-amber-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${selectedProduct.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <h2 className="text-3xl font-bold text-gray-800">{selectedProduct.name}</h2>
                      <div className="text-right">
                        {selectedProduct.originalPrice && (
                          <span className="text-lg text-gray-400 line-through block">
                            ${selectedProduct.originalPrice}
                          </span>
                        )}
                        <span className="text-4xl font-bold text-amber-600">
                          ${selectedProduct.price}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {selectedProduct.description}
                    </p>

                    {/* Rating and Reviews */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(selectedProduct.rating)
                                ? 'text-amber-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-lg text-gray-700 font-medium">
                        {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                      </span>
                    </div>

                    {/* Product Features */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-amber-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Origin</h4>
                        <p className="text-amber-700">{selectedProduct.origin}</p>
                      </div>
                      <div className="bg-amber-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Roast Level</h4>
                        <p className="text-amber-700">{selectedProduct.roast}</p>
                      </div>
                    </div>

                    {/* Flavor Notes */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Flavor Notes</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.flavor.map((note, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-sm font-medium"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quantity and Add to Cart */}
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(selectedProduct.id, -1)}
                          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                        >
                          <Minus className="h-5 w-5" />
                        </button>
                        <span className="text-2xl font-semibold min-w-[3rem] text-center">
                          {quantities[selectedProduct.id] || 0}
                        </span>
                        <button
                          onClick={() => updateQuantity(selectedProduct.id, 1)}
                          className="p-3 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors duration-200"
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                      </div>

                      <button className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-amber-500/25">
                        <ShoppingCart className="h-6 w-6" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveProductShowcase;
