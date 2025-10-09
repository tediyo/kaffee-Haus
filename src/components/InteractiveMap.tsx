'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  coordinates: { lat: number; lng: number };
  image: string;
}

interface InteractiveMapProps {
  branches: Branch[];
}

export default function InteractiveMap({ branches }: InteractiveMapProps) {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-amber-200/50 overflow-hidden">
      <div className="h-96 relative">
        {/* Map Container */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
          {!mapLoaded ? (
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          ) : (
        <div className="w-full h-full relative">
          {/* Real Map with Satellite View showing landscapes */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.7578!3d8.9806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8f689a4b1d3b%3A0x8c5b5b5b5b5b5b5b!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
            width="100%"
            height="100%"
            className="border-0 rounded-lg"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kaffee Haus Locations Map - Satellite View"
            allowFullScreen
          />
              
              {/* Map Overlay for UI Elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="relative w-full h-full">
                  {/* Clickable areas for branch selection */}
                  {branches.map((branch, index) => {
                    // Position clickable areas over the map markers
                    const positions = [
                      { top: '25%', left: '35%' }, // Bole
                      { top: '65%', left: '75%' }, // Piazza
                      { top: '15%', left: '85%' }, // Airport
                      { top: '75%', left: '25%' }  // University
                    ];
                    
                    return (
                      <div
                        key={branch.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group pointer-events-auto"
                        style={positions[index]}
                        onClick={() => setSelectedBranch(branch)}
                      >
                        <div className="w-8 h-8 bg-amber-500/80 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 backdrop-blur-sm">
                          <MapPin className="h-5 w-5 text-white" />
                        </div>
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                          <p className="text-xs font-semibold text-gray-800">{branch.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>


              {/* Selected Branch Details */}
              {selectedBranch && (
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 mb-1">{selectedBranch.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{selectedBranch.address}</p>
                      <div className="grid grid-cols-1 gap-1">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-3 w-3 text-amber-600" />
                          <span className="text-xs text-gray-700">{selectedBranch.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-3 w-3 text-amber-600" />
                          <span className="text-xs text-gray-700">{selectedBranch.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-3 w-3 text-amber-600" />
                          <span className="text-xs text-gray-700">{selectedBranch.hours}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedBranch(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
