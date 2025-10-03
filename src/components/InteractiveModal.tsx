'use client';

import { useState } from 'react';
import { X, Coffee, Star, Heart, Share2, Clock, MapPin, Phone } from 'lucide-react';

interface InteractiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'coffee' | 'location' | 'contact' | 'special';
  data?: any;
}

const InteractiveModal = ({ isOpen, onClose, type, data }: InteractiveModalProps) => {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (type) {
      case 'coffee':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">☕</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Premium Coffee</h3>
              <p className="text-gray-600">Sourced from the finest coffee regions worldwide</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <Coffee className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-800">Fresh Roasted</p>
                <p className="text-sm text-gray-600">Daily</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <Star className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-800">Premium Quality</p>
                <p className="text-sm text-gray-600">4.9/5 Rating</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-bold text-gray-800">Our Coffee Process:</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Carefully selected beans from sustainable farms</p>
                <p>• Roasted to perfection in small batches</p>
                <p>• Ground fresh for each order</p>
                <p>• Brewed by expert baristas</p>
              </div>
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">📍</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Visit Our Shop</h3>
              <p className="text-gray-600">Located in the heart of downtown</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-amber-50 rounded-xl">
                <MapPin className="h-6 w-6 text-amber-600" />
                <div>
                  <p className="font-semibold text-gray-800">123 Coffee Street</p>
                  <p className="text-gray-600">Downtown District, City, State 12345</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-amber-50 rounded-xl">
                <Clock className="h-6 w-6 text-amber-600" />
                <div>
                  <p className="font-semibold text-gray-800">Hours</p>
                  <p className="text-gray-600">Mon-Fri: 6AM-8PM, Sat-Sun: 7AM-9PM</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-amber-50 rounded-xl">
                <Phone className="h-6 w-6 text-amber-600" />
                <div>
                  <p className="font-semibold text-gray-800">Phone</p>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold transition-colors duration-200">
              Get Directions
            </button>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">📞</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Get in Touch</h3>
              <p className="text-gray-600">We'd love to hear from you</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-amber-50 hover:bg-amber-100 rounded-xl">
                  <Phone className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-800">Call Us</p>
                </button>
                <button className="p-4 bg-amber-50 hover:bg-amber-100 rounded-xl">
                  <Heart className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-800">Live Chat</p>
                </button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Quick Response Time:</p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-sm font-medium text-gray-800">Usually within 5 minutes</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'special':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Special Offer!</h3>
              <p className="text-gray-600">Limited time promotion</p>
            </div>
            
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-6 text-center">
              <h4 className="text-2xl font-bold text-amber-800 mb-2">20% Off First Order</h4>
              <p className="text-amber-700 mb-4">Use code: WELCOME20</p>
              <div className="flex items-center justify-center space-x-2 text-amber-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Valid for 7 days</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-bold text-gray-800">What's Included:</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Any coffee drink of your choice</p>
                <p>• Free pastry with purchase over $10</p>
                <p>• Complimentary WiFi access</p>
                <p>• Friendly service guaranteed</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
            >
          <X className="h-6 w-6" />
        </button>
        
        {renderContent()}
        
        <div className="flex space-x-3 mt-8">
          <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold">
            Learn More
          </button>
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveModal;
