'use client';

import { useState, useEffect } from 'react';
import { Coffee, Star, ArrowRight, Play, Sparkles, Heart, Award } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Animations removed */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Professional Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80")'
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-amber-900/70 to-black/60" />
        {/* Additional gradient overlay for warmth */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-amber-800/30 to-amber-700/40" />
        {/* Static floating elements - no animations */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-amber-300/20 rounded-full blur-xl" />
          <div className="absolute top-32 right-20 w-24 h-24 bg-amber-200/30 rounded-full blur-lg" />
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-amber-400/20 rounded-full blur-2xl" />
          <div className="absolute bottom-32 right-1/3 w-28 h-28 bg-amber-300/25 rounded-full blur-lg" />
        </div>
      </div>

      {/* Static Coffee Beans - no animations */}
      <div className="absolute inset-0 z-5 overflow-hidden">
        {[...Array(12)].map((_, i) => {
          // Static positions without animations
          const positions = [
            { left: '8%', top: '12%', size: 'text-xl' },
            { left: '18%', top: '32%', size: 'text-2xl' },
            { left: '32%', top: '18%', size: 'text-lg' },
            { left: '48%', top: '38%', size: 'text-xl' },
            { left: '62%', top: '22%', size: 'text-2xl' },
            { left: '78%', top: '42%', size: 'text-lg' },
            { left: '12%', top: '62%', size: 'text-xl' },
            { left: '82%', top: '68%', size: 'text-2xl' },
            { left: '25%', top: '75%', size: 'text-lg' },
            { left: '70%', top: '8%', size: 'text-xl' },
            { left: '5%', top: '85%', size: 'text-2xl' },
            { left: '90%', top: '15%', size: 'text-lg' }
          ];
          
          return (
            <div
              key={i}
              className={`absolute text-amber-200/30 ${positions[i].size}`}
              style={{
                left: positions[i].left,
                top: positions[i].top,
                transform: 'translate(-50%, -50%)'
              }}
            >
              ☕
            </div>
          );
        })}
      </div>

      {/* Static steam effects - no animations */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={`steam-${i}`}
            className="absolute text-white/20 text-4xl"
            style={{
              left: `${15 + i * 15}%`,
              top: '60%'
            }}
          >
            〰️
          </div>
        ))}
      </div>

      {/* Enhanced Gradient Overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-amber-900/60 to-black/50 z-10" />
      {/* Additional warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 via-transparent to-amber-800/20 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Live Time Display */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white/90 border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-sm font-medium">
              Open Now{isClient && currentTime ? ` • ${currentTime}` : ''}
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-400/20 to-amber-300/20 backdrop-blur-sm rounded-full px-8 py-4 text-white/95 border border-amber-300/30 shadow-lg">
              <Coffee className="h-6 w-6 text-amber-300" />
              <span className="font-semibold text-lg">Premium Coffee Experience</span>
              <Sparkles className="h-5 w-5 text-amber-300" />
            </div>

            <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-100 bg-clip-text text-transparent drop-shadow-2xl">
                Kaffee Haus
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
              Experience the perfect blend of tradition and innovation in every cup. 
              From farm-fresh beans to expertly crafted beverages, we bring you 
              the finest coffee experience.
            </p>
          </div>

          {/* Enhanced Rating */}
          <div className="flex items-center justify-center space-x-4 text-white/90">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400 drop-shadow-lg" />
              ))}
            </div>
            <span className="text-xl font-semibold">4.9/5 from 500+ customers</span>
            <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
              <Heart className="h-4 w-4 text-red-400 fill-current" />
              <span className="text-sm">Loved by many</span>
            </div>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
            <Link href="/menu">
              <button 
                className="group relative bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-10 py-5 rounded-2xl font-bold text-xl flex items-center space-x-3 shadow-2xl border border-amber-500/30"
              >
                <span>Explore Menu</span>
                <ArrowRight className="h-6 w-6" />
              </button>
            </Link>

            <button className="group relative bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold text-xl flex items-center space-x-3 border border-white/30 hover:border-white/50 shadow-xl">
              <Play className="h-6 w-6" />
              <span>Watch Story</span>
            </button>
          </div>

          {/* Enhanced Features */}
          <div className="relative mt-20 max-w-5xl mx-auto">
            {/* Background Image for Three Cards */}
            <div className="absolute inset-0 z-0">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-3xl"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80")'
                }}
              />
              {/* Overlay for better card readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-amber-900/30 to-black/40 rounded-3xl" />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
              {[
                {
                  title: 'Fresh Roasted',
                  description: 'Daily roasted beans for maximum flavor',
                  icon: '☕',
                  color: 'from-amber-400/20 to-amber-300/20',
                  borderColor: 'border-amber-300/40'
                },
                {
                  title: 'Expert Baristas',
                  description: 'Skilled craftspeople behind every cup',
                  icon: '👨‍🍳',
                  color: 'from-orange-400/20 to-orange-300/20',
                  borderColor: 'border-orange-300/40'
                },
                {
                  title: 'Cozy Atmosphere',
                  description: 'Perfect space to work, relax, or meet',
                  icon: '🏠',
                  color: 'from-yellow-400/20 to-yellow-300/20',
                  borderColor: 'border-yellow-300/40'
                }
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className={`bg-gradient-to-br ${feature.color} backdrop-blur-sm rounded-3xl p-8 text-center border ${feature.borderColor} group`}
                >
                  <div className="text-6xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/80 text-lg">{feature.description}</p>
                  <div className="mt-4 flex justify-center">
                    <Award className="h-5 w-5 text-amber-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Special Offers Banner */}
          <div className="mt-16 bg-gradient-to-r from-amber-600/20 to-amber-500/20 backdrop-blur-sm rounded-2xl p-6 border border-amber-400/30">
            <div className="flex items-center justify-center space-x-4">
              <Sparkles className="h-6 w-6 text-amber-300" />
              <span className="text-white text-lg font-semibold">
                Special Offer: 20% off your first order with code WELCOME20
              </span>
              <Sparkles className="h-6 w-6 text-amber-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-white/70 text-sm font-medium">Scroll to explore</span>
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-white/70 rounded-full" />
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default HeroSection;