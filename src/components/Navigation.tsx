'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Coffee, Home, Utensils, Users, MapPin, Search, HelpCircle, ShoppingCart, User, LogOut, Package } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';
import OrderTrackingModal from './OrderTrackingModal';

interface NavigationProps {
  onFAQClick?: () => void;
  onCartClick?: () => void;
}

const Navigation = ({ onFAQClick, onCartClick }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showTrackOrderModal, setShowTrackOrderModal] = useState(false);
  const { getTotalItems } = useCart();
  const { customer, isAuthenticated, login, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', icon: Home, color: 'text-amber-600' },
    { name: 'Menu', href: '/menu', icon: Utensils, color: 'text-orange-600' },
    { name: 'About', href: '/about', icon: Users, color: 'text-blue-600' },
    { name: 'Contact', href: '/contact', icon: MapPin, color: 'text-green-600' },
  ];

  const totalItems = getTotalItems();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-amber-200/30' 
        : 'bg-white/90 backdrop-blur-md shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Coffee className="h-10 w-10 text-amber-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-800 group-hover:text-amber-600">
                Kaffee Haus
              </span>
              <div className="text-xs text-amber-600 font-medium -mt-1">Premium Coffee</div>
            </div>
          </Link>

          {/* Search Bar - Redirects to Menu Page */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/menu?search=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-amber-50 font-medium relative overflow-hidden"
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <span className="group-hover:text-amber-600">{item.name}</span>
              </Link>
            ))}
            
            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200"
              title="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* FAQ Button */}
            {onFAQClick && (
              <button 
                onClick={onFAQClick}
                className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl"
                title="Frequently Asked Questions"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
            )}

            {/* Track Order Button */}
            <button
              onClick={() => setShowTrackOrderModal(true)}
              className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl"
              title="Track Your Order"
            >
              <Package className="h-5 w-5" />
            </button>

            {/* Authentication */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Hi, {customer?.name}</span>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors"
              >
                <User className="h-5 w-5" />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl"
              title="Shopping Cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div className={`md:hidden overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-xl rounded-2xl mt-2 shadow-2xl border border-amber-200/30">
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      window.location.href = `/menu?search=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-amber-100 rounded-xl relative overflow-hidden"
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            {/* Mobile Track Order Button */}
            <button
              onClick={() => {
                setShowTrackOrderModal(true);
                setIsOpen(false);
              }}
              className="group flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-amber-100 rounded-xl relative overflow-hidden w-full"
            >
              <Package className="h-5 w-5 text-purple-600" />
              <span className="font-medium">Track Order</span>
            </button>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={login}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={showTrackOrderModal}
        onClose={() => setShowTrackOrderModal(false)}
        initialOrderNumber={typeof window !== 'undefined' ? (localStorage.getItem('lastOrderNumber') || '') : ''}
        initialEmail={isAuthenticated ? (customer?.email || '') : ''}
      />
    </nav>
  );
};

export default Navigation;