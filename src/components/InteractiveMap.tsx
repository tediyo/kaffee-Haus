'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, Coffee, Phone, Clock } from 'lucide-react';

// Extend Window interface for Google Maps
declare global {
  interface Window {
    google: any;
  }
}

interface Branch {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  features: string[];
  coordinates: { lat: number; lng: number };
  isMain: boolean;
  image: string;
}

interface InteractiveMapProps {
  branches: Branch[];
  selectedBranch: number;
  onBranchSelect: (index: number) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  branches,
  selectedBranch,
  onBranchSelect
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    // Initialize the map immediately with OpenStreetMap
    setMapLoaded(true);
  }, []);

  // Calculate center point for the map
  const centerLat = branches.reduce((sum, branch) => sum + branch.coordinates.lat, 0) / branches.length;
  const centerLng = branches.reduce((sum, branch) => sum + branch.coordinates.lng, 0) / branches.length;

  if (mapError) {
    return (
      <div className="h-[600px] bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-16 w-16 text-amber-600 mx-auto mb-4" />
          <h4 className="text-2xl font-bold text-amber-800 mb-2">Map Unavailable</h4>
          <p className="text-amber-700">Please check your internet connection or try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[600px] w-full rounded-3xl overflow-hidden">
      {/* OpenStreetMap with Leaflet */}
      {mapLoaded && (
        <>
          {/* Map Container */}
          <div 
            ref={mapRef}
            className="h-full w-full"
            style={{
              backgroundImage: `url(https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${centerLng},${centerLat},10,0/600x600@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          
          {/* Custom Markers Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {branches.map((branch, index) => (
              <button
                key={branch.id}
                onClick={() => onBranchSelect(index)}
                className={`absolute w-12 h-12 rounded-full border-4 transition-all duration-300 hover:scale-125 pointer-events-auto shadow-lg ${
                  selectedBranch === index 
                    ? 'bg-amber-500 border-amber-700 shadow-2xl' 
                    : 'bg-white border-amber-400 hover:bg-amber-100'
                }`}
                style={{
                  left: `${30 + (index * 20)}%`,
                  top: `${40 + (index % 3) * 15}%`
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Coffee className={`h-6 w-6 ${selectedBranch === index ? 'text-white' : 'text-amber-600'}`} />
                </div>
                
                {/* Branch Label */}
                <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-lg text-xs font-bold transition-all duration-300 ${
                  selectedBranch === index 
                    ? 'bg-amber-500 text-white shadow-lg' 
                    : 'bg-white/90 text-amber-700'
                }`}>
                  {branch.name.split(' ')[0]}
                </div>
              </button>
            ))}
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
            <div className="text-xs text-gray-600">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-3 h-3 bg-amber-500 rounded-full border-2 border-amber-700"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white rounded-full border-2 border-amber-400"></div>
                <span>Branches</span>
              </div>
            </div>
          </div>

          {/* Selected Branch Info */}
          {selectedBranch !== null && (
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl max-w-sm">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <Coffee className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{branches[selectedBranch].name}</h4>
                  <p className="text-sm text-amber-600">
                    {branches[selectedBranch].isMain ? 'Main Branch' : 'Branch Location'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">{branches[selectedBranch].address}</p>
                    <p className="text-gray-600">{branches[selectedBranch].city}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-amber-600" />
                  <span className="text-gray-700">{branches[selectedBranch].phone}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <div>
                    <p className="text-gray-700">Mon-Fri: {branches[selectedBranch].hours.weekdays}</p>
                    <p className="text-gray-700">Sat-Sun: {branches[selectedBranch].hours.weekends}</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg">
                Get Directions
              </button>
            </div>
          )}
        </>
      )}
      
      {!mapLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-amber-700">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
