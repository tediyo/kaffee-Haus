'use client';

import { useWebsiteData } from '@/contexts/WebsiteDataContext';
import { Star, TrendingUp, Award, Clock, Flame } from 'lucide-react';

const DynamicHighlights = () => {
  const { highlightCards, getDisplaySetting, loading } = useWebsiteData();
  const showHighlights = getDisplaySetting('show_highlights');

  if (!showHighlights || loading) {
    return null;
  }

  if (highlightCards.length === 0) {
    return null;
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-32 right-20 w-24 h-24 bg-orange-200/30 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-amber-300/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 text-amber-800 mb-6">
            <Star className="h-5 w-5" />
            <span className="font-medium">Featured Items</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Our <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Highlights</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most popular and seasonal offerings
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlightCards
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((card, index) => (
              <div
                key={card.id || `highlight-card-${index}`}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-200 hover:scale-105"
              >
                {/* Card Image */}
                <div className="relative h-56 bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 flex items-center justify-center overflow-hidden">
                  {card.image_url ? (
                    <img
                      src={card.image_url}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
                      <Star className="h-16 w-16 text-amber-400" />
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {card.is_popular && (
                      <div className="flex items-center space-x-1 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        <TrendingUp className="h-3 w-3" />
                        <span>Popular</span>
                      </div>
                    )}
                    {card.is_seasonal && (
                      <div className="flex items-center space-x-1 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        <Flame className="h-3 w-3" />
                        <span>Seasonal</span>
                      </div>
                    )}
                    {card.badge && (
                      <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        {card.badge}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors duration-300">
                      {card.title}
                    </h3>
                    {card.price && (
                      <span className="text-3xl font-bold text-amber-600">{card.price}</span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {card.description}
                  </p>

                  <button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-amber-500/25 hover:scale-105">
                    <Star className="h-4 w-4" />
                    <span>Learn More</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicHighlights;


