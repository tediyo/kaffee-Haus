'use client';

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import AnimatedHeroSection from '@/components/AnimatedHeroSection';
import CoffeeShopScene from '@/components/CoffeeShopScene';
import InteractiveModal from '@/components/InteractiveModal';
import InteractiveTime from '@/components/InteractiveTime';
import { Coffee, Gift, Star, TrendingUp, Users, Award, Heart, Clock, Globe, BookOpen, Sparkles } from 'lucide-react';

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
      
      {/* Animated Hero Section */}
      <div className="pt-20">
        <AnimatedHeroSection />
        </div>

      {/* Highlights Section */}
      <section id="menu-section" className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/MN.jpg")'
            }}
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-orange-50/80 to-amber-100/80" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 text-amber-800 border border-amber-200 mb-6">
              <Coffee className="h-5 w-5" />
              <span className="font-semibold">Our Highlights</span>
              <Star className="h-4 w-4 text-amber-500" />
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              What Makes Us{' '}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Special
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Best Sellers */}
            <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-amber-200 overflow-hidden">
              {/* Background Image for Best Sellers */}
              <div className="absolute inset-0 z-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url("/Tq.jpg")'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 to-amber-100/40" />
              </div>
              
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Coffee className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Best Sellers</h3>
                  <p className="text-gray-600">Our most loved coffee creations</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-gray-800">Ethiopian Yirgacheffe</h4>
                      <p className="text-sm text-gray-600">Single origin, light roast</p>
                    </div>
                    <span className="text-amber-600 font-bold">$24.99</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-gray-800">Colombian Supremo</h4>
                      <p className="text-sm text-gray-600">Rich, full-bodied</p>
                    </div>
                    <span className="text-amber-600 font-bold">$22.99</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-gray-800">Italian Espresso</h4>
                      <p className="text-sm text-gray-600">Dark roasted blend</p>
                    </div>
                    <span className="text-amber-600 font-bold">$19.99</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Seasonal Offers */}
            <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-orange-200 overflow-hidden">
              {/* Background Image for Seasonal Offers */}
              <div className="absolute inset-0 z-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url("/TY.jpg")'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/40 to-orange-100/40" />
              </div>
              
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Seasonal Offers</h3>
                  <p className="text-gray-600">Limited time specials</p>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-orange-800">Winter Blend</h4>
                      <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">20% OFF</span>
                    </div>
                    <p className="text-sm text-orange-700">Warm spices and rich chocolate notes</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-orange-600 font-bold">$18.99</span>
                      <span className="text-xs text-gray-500 line-through">$23.99</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl border border-amber-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-amber-800">Holiday Special</h4>
                      <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">15% OFF</span>
                    </div>
                    <p className="text-sm text-amber-700">Gift sets and holiday treats</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-amber-600 font-bold">$29.99</span>
                      <span className="text-xs text-gray-500 line-through">$35.99</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Coffee History Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80")'
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Animated Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-amber-50/85 via-orange-50/85 to-amber-100/85"
            animate={{
              opacity: [0.95, 0.98, 0.95],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Floating Coffee Beans Animation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-amber-200/30 text-2xl"
                style={{
                  left: `${((i * 37) % 100)}%`,
                  top: `${((i * 61) % 100)}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 360],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 8 + ((i * 7) % 4),
                  repeat: Infinity,
                  delay: ((i * 13) % 20) / 10,
                  ease: "easeInOut"
                }}
              >
                ☕
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Animated Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 text-amber-800 border border-amber-200 mb-6"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(245, 158, 11, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Coffee className="h-5 w-5" />
              </motion.div>
              <span className="font-semibold">Coffee Heritage</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Award className="h-4 w-4 text-amber-500" />
              </motion.div>
            </motion.div>
            
            <motion.h2 
              className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The Rich{' '}
              <motion.span 
                className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                History
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover the fascinating journey of coffee from ancient Ethiopia to your cup today
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Animated Timeline */}
            <div className="space-y-8">
              <div className="relative">
                {/* Animated Timeline Line */}
                <motion.div 
                  className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-amber-400 to-orange-400"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                
                {/* Timeline Items */}
                <div className="space-y-12">
                  {[
                    {
                      year: "850",
                      title: "Discovery in Ethiopia",
                      description: "Legend says a goat herder named Kaldi discovered coffee when his goats became energetic after eating coffee berries.",
                      icon: Globe,
                      color: "from-amber-500 to-amber-600"
                    },
                    {
                      year: "1500",
                      title: "Spread to Arabia",
                      description: "Coffee cultivation began in Yemen, and the first coffeehouses opened in Mecca, becoming centers of social activity.",
                      icon: BookOpen,
                      color: "from-orange-500 to-orange-600"
                    },
                    {
                      year: "1600",
                      title: "European Introduction",
                      description: "Coffee reached Europe through Venice, and the first European coffeehouse opened in Oxford, England.",
                      icon: Clock,
                      color: "from-amber-500 to-amber-600"
                    },
                    {
                      year: "1700",
                      title: "Global Expansion",
                      description: "Coffee cultivation spread to the Americas, with Brazil becoming the world's largest coffee producer.",
                      icon: Globe,
                      color: "from-orange-500 to-orange-600"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={item.year}
                      className="relative flex items-start space-x-6"
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div 
                        className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: 360,
                          boxShadow: "0 10px 30px rgba(245, 158, 11, 0.4)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        >
                          <item.icon className="h-6 w-6" />
                        </motion.div>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200"
                        whileHover={{ 
                          y: -5,
                          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.h3 
                          className="text-xl font-bold text-gray-800 mb-2"
                          whileHover={{ color: "#d97706" }}
                        >
                          {item.title}
                        </motion.h3>
                        <p className="text-gray-600">{item.description}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Animated Coffee Culture Info */}
            <div className="space-y-8">
              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-amber-200"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)"
                }}
              >
                <motion.h3 
                  className="text-2xl font-bold text-gray-800 mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  Coffee Culture Today
                </motion.h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: Coffee,
                      title: "Third Wave Coffee",
                      description: "Focus on high-quality beans, artisanal roasting, and brewing methods that highlight coffee's unique flavors."
                    },
                    {
                      icon: Users,
                      title: "Social Connection",
                      description: "Coffeehouses continue to be places where people gather, work, and build community."
                    },
                    {
                      icon: Award,
                      title: "Sustainability",
                      description: "Growing emphasis on fair trade, organic farming, and environmental responsibility in coffee production."
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={item.title}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <motion.div 
                        className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0"
                        whileHover={{ 
                          scale: 1.2, 
                          rotate: 360,
                          backgroundColor: "#fbbf24"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          <item.icon className="h-6 w-6 text-amber-600" />
                        </motion.div>
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-8 text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(245, 158, 11, 0.3)"
                }}
              >
                <motion.h3 
                  className="text-2xl font-bold mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  Fun Coffee Facts
                </motion.h3>
                <motion.ul 
                  className="space-y-3 text-amber-100"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  {[
                    "Brazil produces 1/3 of the world's coffee",
                    "Coffee is the second most traded commodity after oil",
                    "The word 'coffee' comes from the Arabic 'qahwah'",
                    "It takes 5 years for a coffee tree to produce fruit"
                  ].map((fact, index) => (
                    <motion.li 
                      key={fact}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                      whileHover={{ x: 10, color: "#fef3c7" }}
                    >
                      <motion.div 
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      />
                      <span>{fact}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
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
