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
import { Coffee, MapPin, Phone, Gift, Star, TrendingUp, Users, Award, Heart, Clock, Globe, BookOpen, Sparkles } from 'lucide-react';

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

            {/* Why Choose Us */}
            <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-green-200 overflow-hidden">
              {/* Background Image for Why Choose Us */}
              <div className="absolute inset-0 z-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url("/TRT.jpg")'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/40 to-green-100/40" />
              </div>
              
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Why Choose Us</h3>
                  <p className="text-gray-600">What sets us apart</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Coffee className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Fresh Roasted coffee Daily</h4>
                      <p className="text-sm text-gray-600">Beans roasted in small batches for maximum flavor</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Users className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Expert Baristas</h4>
                      <p className="text-sm text-gray-600">Skilled craftspeople behind every cup</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Heart className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Cozy Atmosphere</h4>
                      <p className="text-sm text-gray-600">Perfect space to work, relax, or meet friends</p>
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
              backgroundImage: 'url("/mmk.jpg")'
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

      {/* Location Map Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/cc.jpg")'
            }}
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/70 to-orange-100/70" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 text-amber-800 mb-6">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Find Us</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Visit Our Coffee Shops</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Located in Megenagna and Mexico Square, Addis Ababa - your perfect escape for great coffee and warm community
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Map Container */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="h-96 relative">
                  {/* Embedded Google Maps - Both Locations */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.8!3d9.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8f8a8a8a8a8a%3A0x8a8a8a8a8a8a8a8a!2sMegenagna%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1234567890123!5m2!1sen!2set"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-t-3xl"
                    title="Kaffee Haus Locations - Megenagna & Mexico Square, Addis Ababa"
                  ></iframe>
                  
                  {/* Map Overlay Elements */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Open Now</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <Coffee className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-medium text-gray-700">Coffee Shop</span>
                    </div>
                  </div>
                  
                  {/* Custom Map Markers for Both Locations */}
                  {/* Megenagna Marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-amber-500 text-white p-2 rounded-full shadow-lg">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-amber-500 text-white px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap">
                      Megenagna Branch
                    </div>
                  </div>
                  
                  {/* Mexico Square Marker */}
                  <div className="absolute top-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-orange-500 text-white p-2 rounded-full shadow-lg">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap">
                      Mexico Square Branch
                    </div>
                  </div>
                </div>
                
                {/* Map Controls */}
                <div className="relative p-6 bg-white overflow-hidden">
                  {/* Background Image for Map Controls */}
                  <div className="absolute inset-0 z-0">
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: 'url("/TRT.jpg")'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 to-orange-50/40" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-800">Kaffee Haus Branches</h4>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-amber-100 hover:bg-amber-200 rounded-lg">
                          <MapPin className="h-4 w-4 text-amber-600" />
                        </button>
                        <button className="p-2 bg-amber-100 hover:bg-amber-200 rounded-lg">
                          <Phone className="h-4 w-4 text-amber-600" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Megenagna Branch */}
                      <div className="bg-amber-50 rounded-lg p-4">
                        <h5 className="font-semibold text-amber-800 mb-2">📍 Megenagna Branch</h5>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>📍 Megenagna, Addis Ababa, Ethiopia</p>
                          <p>🕒 Mon-Fri: 6:00 AM - 8:00 PM</p>
                          <p>🕒 Sat-Sun: 7:00 AM - 9:00 PM</p>
                          <p>📞 +251 911 234 567</p>
                        </div>
                      </div>
                      
                      {/* Mexico Square Branch */}
                      <div className="bg-orange-50 rounded-lg p-4">
                        <h5 className="font-semibold text-orange-800 mb-2">📍 Mexico Square Branch</h5>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>📍 Mexico Square, Addis Ababa, Ethiopia</p>
                          <p>🕒 Mon-Fri: 6:00 AM - 8:00 PM</p>
                          <p>🕒 Sat-Sun: 7:00 AM - 9:00 PM</p>
                          <p>📞 +251 911 234 568</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-3">
                      <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>Get Directions</span>
                      </button>
                      <button className="flex-1 bg-white border-2 border-amber-500 text-amber-600 hover:bg-amber-50 py-2 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>Call Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="space-y-8">
              <div className="relative bg-white rounded-2xl p-8 shadow-lg overflow-hidden">
                {/* Background Image for Why Visit Megenagna */}
                <div className="absolute inset-0 z-0">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: 'url("/MN.jpg")'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-orange-50/30" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Why Visit Megenagna?</h3>
                  <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Central Location</h4>
                      <p className="text-gray-600 text-sm">Easily accessible from all parts of Addis Ababa</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Vibrant Community</h4>
                      <p className="text-gray-600 text-sm">Join the bustling Megenagna neighborhood</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Coffee className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Authentic Experience</h4>
                      <p className="text-gray-600 text-sm">Experience Ethiopian coffee culture at its finest</p>
                    </div>
                  </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold text-amber-600 mb-2">5 min</div>
                  <div className="text-sm text-gray-600">Walk from Bole Road</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                  <div className="text-3xl font-bold text-amber-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Street Parking</div>
                </div>
              </div>

              {/* Coffee Cup Image */}
              <div className="text-center">
                <div className="inline-block group">
                  <Image
                    src="/coffee-cup.png"
                    alt="Coffee cup"
                    width={128}
                    height={128}
                    className="w-32 h-32 object-contain drop-shadow-lg"
                    priority
                  />
                  <p className="text-sm text-gray-600 mt-2">Fresh coffee awaits you!</p>
                </div>
              </div>
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
