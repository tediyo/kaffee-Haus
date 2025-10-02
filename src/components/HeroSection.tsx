'use client';

import { Coffee, Star, ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Three.js Scene */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full opacity-30">
          {/* This will be replaced with the Three.js scene */}
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-amber-800/70 to-amber-700/80 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white/90">
              <Coffee className="h-5 w-5" />
              <span className="font-medium">Premium Coffee Experience</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent">
                Kaffee Haus
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Experience the perfect blend of tradition and innovation in every cup. 
              From farm-fresh beans to expertly crafted beverages, we bring you 
              the finest coffee experience.
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center space-x-2 text-white/90">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-lg font-medium">4.9/5 from 500+ customers</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/menu">
              <button className="group bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                <span>Explore Menu</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>

            <button className="group bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center space-x-2 border border-white/30">
              <Play className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Watch Story</span>
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            {[
              {
                title: 'Fresh Roasted',
                description: 'Daily roasted beans for maximum flavor',
                icon: '☕'
              },
              {
                title: 'Expert Baristas',
                description: 'Skilled craftspeople behind every cup',
                icon: '👨‍🍳'
              },
              {
                title: 'Cozy Atmosphere',
                description: 'Perfect space to work, relax, or meet',
                icon: '🏠'
              }
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;