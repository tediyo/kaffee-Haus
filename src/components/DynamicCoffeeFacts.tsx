'use client';

import { useWebsiteData } from '@/contexts/WebsiteDataContext';
import { Lightbulb, Coffee, Heart, Zap } from 'lucide-react';

const DynamicCoffeeFacts = () => {
  const { coffeeFacts, getDisplaySetting, loading } = useWebsiteData();
  const showFacts = getDisplaySetting('show_facts');

  if (!showFacts || loading) {
    return null;
  }

  if (coffeeFacts.length === 0) {
    return null;
  }

  const factIcons = [Coffee, Heart, Zap, Lightbulb];
  const factColors = [
    'from-amber-500 to-orange-500',
    'from-red-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500'
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-amber-50 to-orange-50" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-amber-200/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-200/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-amber-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 text-amber-800 mb-6">
            <Lightbulb className="h-5 w-5" />
            <span className="font-medium">Did You Know?</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Coffee <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Fun Facts</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover amazing and surprising facts about your favorite beverage
          </p>
        </div>

        {/* Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coffeeFacts
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((fact, index) => {
              const IconComponent = factIcons[index % factIcons.length];
              const colorClass = factColors[index % factColors.length];
              
              return (
                <div
                  key={fact.id || `coffee-fact-${index}`}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-200 hover:scale-105"
                >
                  <div className="p-8">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-r ${colorClass} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>

                    {/* Fact Text */}
                    <p className="text-gray-700 text-lg leading-relaxed font-medium">
                      {fact.fact}
                    </p>

                    {/* Decorative Element */}
                    <div className="mt-6 flex items-center space-x-2">
                      <div className={`w-2 h-2 bg-gradient-to-r ${colorClass} rounded-full`} />
                      <div className={`w-8 h-1 bg-gradient-to-r ${colorClass} rounded-full`} />
                      <div className={`w-2 h-2 bg-gradient-to-r ${colorClass} rounded-full`} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-8 border border-amber-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Love Learning About Coffee?
            </h3>
            <p className="text-gray-600 mb-6">
              Visit our coffee shop to experience these amazing facts firsthand!
            </p>
            <button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 mx-auto shadow-lg hover:shadow-amber-500/25 hover:scale-105">
              <Coffee className="h-5 w-5" />
              <span>Visit Us Today</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicCoffeeFacts;


