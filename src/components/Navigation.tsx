'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Coffee, Home, Utensils, Users, MapPin, Bell, Search } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-amber-200/30' 
        : 'bg-white/90 backdrop-blur-md shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Coffee className="h-10 w-10 text-amber-600 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors duration-300">
                Kaffee Haus
              </span>
              <div className="text-xs text-amber-600 font-medium -mt-1">Premium Coffee</div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-amber-50 transition-all duration-200 font-medium relative overflow-hidden"
              >
                <item.icon className={`h-5 w-5 group-hover:scale-110 transition-transform duration-300 ${item.color}`} />
                <span className="group-hover:text-amber-600 transition-colors duration-300">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-amber-300/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ))}
            
            {/* Notification Bell */}
            <button className="relative p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button className="relative p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
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
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-amber-100 rounded-xl transition-all duration-200 relative overflow-hidden"
              >
                <item.icon className={`h-5 w-5 group-hover:scale-110 transition-transform duration-300 ${item.color}`} />
                <span className="font-medium">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-amber-300/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;