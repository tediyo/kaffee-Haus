'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Parallax } from 'react-parallax';
import { Coffee, ArrowRight, Play, Star, Heart, MapPin, Gift } from 'lucide-react';
import Link from 'next/link';
import InteractiveTime from './InteractiveTime';

const AnimatedHeroSection = () => {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const [isHoveringOrder, setIsHoveringOrder] = useState(false);
  const [isHoveringMenu, setIsHoveringMenu] = useState(false);

  const headlines = [
    "Brewed with Passion",
    "Roasted to Perfection", 
    "Served with Love"
  ];

  // Auto-rotate headlines
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [headlines.length]);

  // Floating coffee beans animation data
  const coffeeBeans = [
    { id: 1, x: 10, y: 20, size: 'text-2xl', delay: 0 },
    { id: 2, x: 85, y: 15, size: 'text-xl', delay: 0.5 },
    { id: 3, x: 20, y: 60, size: 'text-3xl', delay: 1 },
    { id: 4, x: 75, y: 45, size: 'text-xl', delay: 1.5 },
    { id: 5, x: 5, y: 80, size: 'text-2xl', delay: 2 },
    { id: 6, x: 90, y: 70, size: 'text-xl', delay: 2.5 },
    { id: 7, x: 30, y: 35, size: 'text-2xl', delay: 3 },
    { id: 8, x: 60, y: 25, size: 'text-xl', delay: 3.5 },
    { id: 9, x: 15, y: 50, size: 'text-3xl', delay: 4 },
    { id: 10, x: 80, y: 60, size: 'text-xl', delay: 4.5 },
  ];

  // Steam animation data
  const steamElements = [
    { id: 1, x: 20, y: 70, delay: 0 },
    { id: 2, x: 40, y: 75, delay: 0.3 },
    { id: 3, x: 60, y: 72, delay: 0.6 },
    { id: 4, x: 80, y: 78, delay: 0.9 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80")'
          }}
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-amber-900/70 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 via-transparent to-amber-800/20" />
      </div>

      {/* Floating Coffee Beans with Parallax */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        {coffeeBeans.map((bean) => (
          <motion.div
            key={bean.id}
            className={`absolute text-amber-200/40 ${bean.size}`}
            style={{
              left: `${bean.x}%`,
              top: `${bean.y}%`,
            }}
            initial={{ 
              opacity: 0,
              y: 20,
              rotate: 0
            }}
            animate={{ 
              opacity: [0, 0.4, 0.2, 0.4],
              y: [20, -10, 5, -15],
              rotate: [0, 180, 360, 180]
            }}
            transition={{
              duration: 8,
              delay: bean.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ☕
          </motion.div>
        ))}
      </div>

      {/* Steam Animation */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        {steamElements.map((steam) => (
          <motion.div
            key={steam.id}
            className="absolute text-white/30 text-4xl"
            style={{
              left: `${steam.x}%`,
              top: `${steam.y}%`,
            }}
            initial={{ 
              opacity: 0,
              y: 0,
              scale: 0.8
            }}
            animate={{ 
              opacity: [0, 0.3, 0.1, 0.3, 0],
              y: [0, -20, -40, -60, -80],
              scale: [0.8, 1, 1.2, 1, 0.8]
            }}
            transition={{
              duration: 6,
              delay: steam.delay,
              repeat: Infinity,
              ease: "easeOut"
            }}
          >
            〰️
          </motion.div>
        ))}
      </div>

      {/* Interactive Time Display - Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-8 right-8 z-30"
      >
        <InteractiveTime />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">

          {/* Animated Headlines */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-400/20 to-amber-300/20 backdrop-blur-sm rounded-full px-8 py-4 text-white/95 border border-amber-300/30 shadow-lg"
            >
              <Coffee className="h-6 w-6 text-amber-300" />
              <span className="font-semibold text-lg">Premium Coffee Experience</span>
            </motion.div>

            <div className="h-32 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentHeadline}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.8 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="text-6xl md:text-8xl font-bold text-white leading-tight"
                >
                  <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-100 bg-clip-text text-transparent drop-shadow-2xl">
                    {headlines[currentHeadline]}
                  </span>
                </motion.h1>
              </AnimatePresence>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Experience the perfect blend of tradition and innovation in every cup. 
              From farm-fresh beans to expertly crafted beverages, we bring you 
              the finest coffee experience.
            </motion.p>
          </div>

          {/* Rating */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center space-x-4 text-white/90"
          >
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                >
                  <Star className="h-6 w-6 fill-amber-400 text-amber-400 drop-shadow-lg" />
                </motion.div>
              ))}
            </div>
            <span className="text-xl font-semibold">4.9/5 from 500+ customers</span>
            <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
              <Heart className="h-4 w-4 text-red-400 fill-current" />
              <span className="text-sm">Loved by many</span>
            </div>
          </motion.div>

          {/* Interactive CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8"
          >
            {/* Order Now Button */}
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(245, 158, 11, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsHoveringOrder(true)}
              onHoverEnd={() => setIsHoveringOrder(false)}
              className="group relative bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-10 py-5 rounded-2xl font-bold text-xl flex items-center space-x-3 shadow-2xl border border-amber-500/30 overflow-hidden"
            >
              <motion.div
                animate={{ 
                  rotate: isHoveringOrder ? 360 : 0,
                  scale: isHoveringOrder ? 1.2 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                <Coffee className="h-6 w-6" />
              </motion.div>
              <span>Order Now</span>
              <motion.div
                animate={{ 
                  x: isHoveringOrder ? 5 : 0,
                  opacity: isHoveringOrder ? 1 : 0.7
                }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="h-6 w-6" />
              </motion.div>
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-300/20"
                animate={{ 
                  opacity: isHoveringOrder ? 1 : 0,
                  scale: isHoveringOrder ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            {/* View Menu Button */}
            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsHoveringMenu(true)}
              onHoverEnd={() => setIsHoveringMenu(false)}
              onClick={() => {
                const menuSection = document.getElementById('menu-section');
                if (menuSection) {
                  menuSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group relative bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold text-xl flex items-center space-x-3 border border-white/30 hover:border-white/50 shadow-xl"
            >
              <motion.div
                animate={{ 
                  scale: isHoveringMenu ? 1.1 : 1,
                  rotate: isHoveringMenu ? 5 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <Play className="h-6 w-6" />
              </motion.div>
              <span>View Menu</span>
              <motion.div
                animate={{ 
                  x: isHoveringMenu ? 5 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="h-6 w-6" />
              </motion.div>
            </motion.button>
          </motion.div>

        </div>
      </div>

    </section>
  );
};

export default AnimatedHeroSection;
