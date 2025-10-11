'use client';

import { useWebsiteData } from '@/contexts/WebsiteDataContext';
import { Coffee, Calendar, MapPin } from 'lucide-react';

const DynamicCoffeeHistory = () => {
  const { coffeeHistory, getDisplaySetting, loading } = useWebsiteData();
  const showHistory = getDisplaySetting('show_history');

  if (!showHistory || loading) {
    return null;
  }

  if (coffeeHistory.length === 0) {
    return null;
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900" />
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80")'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-amber-200 mb-6">
            <Coffee className="h-5 w-5" />
            <span className="font-medium">Coffee Heritage</span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">
            A Journey Through <span className="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">Coffee History</span>
          </h2>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Discover the rich history and cultural significance of coffee through the ages
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 rounded-full" />
          
          {/* Timeline Items */}
          <div className="space-y-12">
            {coffeeHistory
              .sort((a, b) => parseInt(a.year) - parseInt(b.year))
              .map((item, index) => (
                <div
                  key={item.id || `coffee-history-${index}`}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Timeline Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-amber-300">{item.year}</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                      <p className="text-amber-100 leading-relaxed mb-6">{item.description}</p>
                      
                      {item.image_url && (
                        <div className="mb-4">
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10 flex-shrink-0 w-8 h-8 bg-amber-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <Coffee className="h-4 w-4 text-white" />
                  </div>

                  {/* Spacer */}
                  <div className="w-1/2" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicCoffeeHistory;


