'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import CoffeeShopScene from '@/components/CoffeeShopScene';
import InteractiveModal from '@/components/InteractiveModal';
import InteractiveProductShowcase from '@/components/InteractiveProductShowcase';
import { Coffee, MapPin, Phone, Gift, Star, TrendingUp, Users, Award } from 'lucide-react';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'coffee' | 'location' | 'contact' | 'special'>('coffee');

  const openModal = (type: 'coffee' | 'location' | 'contact' | 'special') => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      
      {/* Interactive 3D Scene with Overlay Elements */}
      <div className="relative">
        <CoffeeShopScene />
        
        {/* Interactive Overlay Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Horizontal Cards Container */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 pointer-events-auto flex flex-col md:flex-row gap-4 px-4 w-full max-w-5xl justify-center">
            {/* Coffee Info Button */}
            <button
              onClick={() => openModal('coffee')}
              className="bg-white/90 backdrop-blur-sm hover:bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group flex-1 min-w-[180px] max-w-[250px]"
            >
              <div className="flex items-center space-x-3">
                <Coffee className="h-6 w-6 text-amber-600 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-gray-800">Premium Coffee</p>
                  <p className="text-sm text-gray-600">Learn more</p>
                </div>
              </div>
            </button>

            {/* Location Button */}
            <button
              onClick={() => openModal('location')}
              className="bg-white/90 backdrop-blur-sm hover:bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group flex-1 min-w-[180px] max-w-[250px]"
            >
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-gray-800">Visit Us</p>
                  <p className="text-sm text-gray-600">Get directions</p>
                </div>
              </div>
            </button>

            {/* Contact Button */}
            <button
              onClick={() => openModal('contact')}
              className="bg-white/90 backdrop-blur-sm hover:bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group flex-1 min-w-[180px] max-w-[250px]"
            >
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-gray-800">Contact Us</p>
                  <p className="text-sm text-gray-600">Get in touch</p>
                </div>
              </div>
            </button>
          </div>

          {/* Special Offer Button */}
          <button
            onClick={() => openModal('special')}
            className="absolute top-20 right-10 pointer-events-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex items-center space-x-3">
              <Gift className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-left">
                <p className="font-semibold">Special Offer</p>
                <p className="text-sm text-amber-100">20% off first order</p>
              </div>
            </div>
          </button>

          {/* Coffee Cup Decorative Element */}
          <div className="absolute bottom-20 left-10 pointer-events-auto">
            <div className="group relative">
              <img
                src="/coffee-cup.png"
                alt="Coffee cup"
                className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
              />
              <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                !
              </div>
            </div>
          </div>

          {/* Stats Display */}
          <div className="absolute bottom-20 right-10 pointer-events-auto bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-gray-800 mb-4 text-center">Today's Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-800">127</span>
                </div>
                <p className="text-xs text-gray-600">Customers Served</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Coffee className="h-4 w-4 text-amber-600" />
                  <span className="text-2xl font-bold text-gray-800">89</span>
                </div>
                <p className="text-xs text-gray-600">Cups Brewed</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Star className="h-4 w-4 text-yellow-600" />
                  <span className="text-2xl font-bold text-gray-800">4.9</span>
                </div>
                <p className="text-xs text-gray-600">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-2xl font-bold text-gray-800">+12%</span>
                </div>
                <p className="text-xs text-gray-600">Growth Today</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Product Showcase */}
      <InteractiveProductShowcase />

      {/* Interactive Modal */}
      <InteractiveModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />
    </main>
  );
}