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

      {/* Location Map Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 text-amber-800 mb-6">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Find Us</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Visit Our Coffee Shop</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Located in the heart of Megenagna, Addis Ababa - your perfect escape for great coffee and warm community
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Map Container */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="h-96 relative">
                  {/* Embedded Google Maps - Megenagna, Addis Ababa */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.8!3d9.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8f8a8a8a8a8a%3A0x8a8a8a8a8a8a8a8a!2sMegenagna%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1234567890123!5m2!1sen!2set"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-t-3xl"
                    title="Kaffee Haus Location - Megenagna, Addis Ababa"
                  ></iframe>
                  
                  {/* Map Overlay Elements */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Open Now</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <Coffee className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-medium text-gray-700">Coffee Shop</span>
                    </div>
                  </div>
                  
                  {/* Custom Map Marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-amber-500 text-white p-2 rounded-full shadow-lg animate-pulse">
                      <MapPin className="h-6 w-6" />
                    </div>
                  </div>
                </div>
                
                {/* Map Controls */}
                <div className="p-6 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-800">Kaffee Haus - Megenagna</h4>
                    <div className="flex space-x-2">
                      <button className="p-2 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors duration-200">
                        <MapPin className="h-4 w-4 text-amber-600" />
                      </button>
                      <button className="p-2 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors duration-200">
                        <Phone className="h-4 w-4 text-amber-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>📍 Megenagna, Addis Ababa, Ethiopia</p>
                    <p>🕒 Mon-Fri: 6:00 AM - 8:00 PM</p>
                    <p>🕒 Sat-Sun: 7:00 AM - 9:00 PM</p>
                    <p>📞 +251 911 234 567</p>
                  </div>
                  
                  <div className="mt-4 flex space-x-3">
                    <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>Get Directions</span>
                    </button>
                    <button className="flex-1 bg-white border-2 border-amber-500 text-amber-600 hover:bg-amber-50 py-2 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>Call Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Why Visit Megenagna?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Central Location</h4>
                      <p className="text-gray-600 text-sm">Easily accessible from all parts of Addis Ababa</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Vibrant Community</h4>
                      <p className="text-gray-600 text-sm">Join the bustling Megenagna neighborhood</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Coffee className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Authentic Experience</h4>
                      <p className="text-gray-600 text-sm">Experience Ethiopian coffee culture at its finest</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold text-amber-600 mb-2">5 min</div>
                  <div className="text-sm text-gray-600">Walk from Bole Road</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold text-amber-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Street Parking</div>
                </div>
              </div>

              {/* Coffee Cup Image */}
              <div className="text-center">
                <div className="inline-block group">
                  <img
                    src="/coffee-cup.png"
                    alt="Coffee cup"
                    className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                  />
                  <p className="text-sm text-gray-600 mt-2">Fresh coffee awaits you!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Modal */}
      <InteractiveModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />
    </main>
  );
}
