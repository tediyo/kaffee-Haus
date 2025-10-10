'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import InteractiveMap from '@/components/InteractiveMap';
import { MessageCircle, Star, MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Coffee, Instagram, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (Math.random() > 0.1) { // 90% success rate
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
    
    // Reset status after 3 seconds
    setTimeout(() => setSubmitStatus('idle'), 3000);
  };

  const branches = [
    {
      id: 1,
      name: "Main Branch - Bole",
      address: "Bole Road, Addis Ababa, Ethiopia",
      phone: "+251 11 123 4567",
      email: "bole@kaffeehaus.com",
      hours: "Mon-Fri: 6AM-10PM, Sat-Sun: 7AM-11PM",
      coordinates: { lat: 8.9806, lng: 38.7578 },
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop&crop=center&auto=format&q=80"
    },
    {
      id: 2,
      name: "Downtown Branch - Piazza",
      address: "Piazza District, Addis Ababa, Ethiopia",
      phone: "+251 11 234 5678",
      email: "piazza@kaffeehaus.com",
      hours: "Mon-Fri: 6AM-9PM, Sat-Sun: 8AM-10PM",
      coordinates: { lat: 9.0333, lng: 38.7500 },
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop&crop=center&auto=format&q=80"
    },
    {
      id: 3,
      name: "Airport Branch - Bole Airport",
      address: "Bole International Airport, Addis Ababa, Ethiopia",
      phone: "+251 11 345 6789",
      email: "airport@kaffeehaus.com",
      hours: "24/7 Open",
      coordinates: { lat: 8.9779, lng: 38.7993 },
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop&crop=center&auto=format&q=80"
    },
    {
      id: 4,
      name: "University Branch - Arat Kilo",
      address: "Arat Kilo, Addis Ababa, Ethiopia",
      phone: "+251 11 456 7890",
      email: "university@kaffeehaus.com",
      hours: "Mon-Fri: 7AM-8PM, Sat-Sun: 8AM-9PM",
      coordinates: { lat: 9.0333, lng: 38.7500 },
      image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop&crop=center&auto=format&q=80"
    }
  ];


  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <Navigation />
      
      {/* Enhanced Hero Section with Coffee Background */}
      <section className="pt-20 pb-20 relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80")'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-amber-900/80 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/50 via-amber-800/40 to-amber-700/50" />
        </div>
        
        {/* Animated floating elements */}
        <div className="absolute inset-0 z-5 overflow-hidden">
          <div className="absolute top-10 left-10 w-40 h-40 bg-amber-300/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute top-32 right-20 w-32 h-32 bg-orange-300/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-amber-200/25 rounded-full blur-lg animate-bounce" style={{ animationDelay: '3s', animationDuration: '4s' }} />
          <div className="absolute bottom-1/3 right-10 w-36 h-36 bg-orange-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>
        
        {/* Coffee bean particles */}
        <div className="absolute inset-0 z-5 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-2 h-2 bg-amber-300/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-40 right-1/3 w-1.5 h-1.5 bg-orange-300/70 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-40 left-1/3 w-2.5 h-2.5 bg-amber-400/50 rounded-full animate-ping" style={{ animationDelay: '2.5s' }} />
          <div className="absolute top-60 right-1/4 w-1 h-1 bg-orange-200/80 rounded-full animate-ping" style={{ animationDelay: '3.5s' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-8 py-4 text-white/90 border border-white/30 shadow-2xl hover:bg-white/30 transition-all duration-300 hover:scale-105">
              <MessageCircle className="h-6 w-6 animate-pulse" />
              <span className="font-semibold text-lg">Get in Touch</span>
              <Star className="h-5 w-5 text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight animate-fade-in-up">
              Contact{' '}
              <span className="bg-gradient-to-r from-amber-300 via-orange-200 to-amber-300 bg-clip-text text-transparent animate-gradient-x">
                Us
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-amber-100 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              Find us across Addis Ababa! Visit our branches, connect with us online, or send us a message.
            </p>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-white to-orange-50 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80")'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-white/90 to-orange-50/80" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 z-5 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-amber-300/15 rounded-full blur-xl animate-bounce" style={{ animationDelay: '4s', animationDuration: '6s' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full px-8 py-4 text-amber-800 mb-8 shadow-lg border border-amber-200/50">
              <MapPin className="h-6 w-6 animate-pulse" />
              <span className="font-semibold text-lg">Our Branches</span>
              <Star className="h-5 w-5 text-amber-600" />
            </div>
            <h2 className="text-6xl font-bold text-gray-800 mb-8 animate-fade-in-up">
              Find Us{' '}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Near You
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              We have multiple locations across Addis Ababa to serve you better. Each branch offers a unique atmosphere and experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {branches.map((branch, index) => (
              <div 
                key={branch.id} 
                className="group bg-white rounded-3xl shadow-2xl border border-amber-200/50 overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Status indicator */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span>Open Now</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <h3 className="text-white font-bold text-xl mb-2 group-hover:text-amber-200 transition-colors duration-300">{branch.name}</h3>
                    <p className="text-amber-100 text-sm leading-relaxed">{branch.address}</p>
                  </div>
                </div>
                
                <div className="p-6 space-y-5 relative z-20">
                  <div className="flex items-center space-x-3 group-hover:translate-x-1 transition-transform duration-300">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <span className="text-gray-700 font-semibold text-sm">Phone</span>
                      <p className="text-gray-800 font-bold">{branch.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: '0.1s' }}>
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <span className="text-gray-700 font-semibold text-sm">Email</span>
                      <p className="text-gray-800 font-bold text-sm">{branch.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: '0.2s' }}>
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <span className="text-gray-700 font-semibold text-sm">Hours</span>
                      <p className="text-gray-800 font-bold text-sm">{branch.hours}</p>
                    </div>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-amber-900 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80")'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-amber-900/80 to-gray-900/90" />
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 z-5 overflow-hidden">
          <div className="absolute top-20 left-20 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-amber-300/5 rounded-full blur-3xl animate-bounce" style={{ animationDelay: '4s', animationDuration: '8s' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-8 py-4 text-white/90 mb-8 border border-white/20">
              <MessageCircle className="h-6 w-6 animate-pulse" />
              <span className="font-semibold text-lg">Get in Touch</span>
              <Star className="h-5 w-5 text-amber-300" />
            </div>
            <h2 className="text-6xl font-bold text-white mb-6">
              Contact Us &{' '}
              <span className="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">
                Find Us
              </span>
            </h2>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              Send us a message or explore our locations across Addis Ababa
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-400/20 to-orange-400/20 rounded-full translate-y-12 -translate-x-12 blur-xl"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4 shadow-2xl">
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Send us a Message</h3>
                  <p className="text-amber-100">We'll get back to you within 24 hours</p>
                  <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mt-3"></div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-bold text-white flex items-center">
                        <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300 text-white bg-white/10 backdrop-blur-sm placeholder-white/60 hover:bg-white/15"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-bold text-white flex items-center">
                        <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300 text-white bg-white/10 backdrop-blur-sm placeholder-white/60 hover:bg-white/15"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-bold text-white flex items-center">
                      <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300 text-white bg-white/10 backdrop-blur-sm placeholder-white/60 hover:bg-white/15"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-bold text-white flex items-center">
                      <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300 resize-none text-white bg-white/10 backdrop-blur-sm placeholder-white/60 hover:bg-white/15"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-2xl transform relative overflow-hidden ${
                      isSubmitting
                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed scale-95'
                        : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white hover:scale-105 hover:shadow-amber-500/25 active:scale-95'
                    }`}
                  >
                    {!isSubmitting && (
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                    )}
                    <div className="relative z-10 flex items-center space-x-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </div>
                  </button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center space-x-3 text-green-400 bg-gradient-to-r from-green-900/50 to-emerald-900/50 p-4 rounded-xl border border-green-600/30 shadow-lg">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="font-semibold">Message sent successfully! We'll get back to you soon.</span>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="flex items-center space-x-3 text-red-400 bg-gradient-to-r from-red-900/50 to-pink-900/50 p-4 rounded-xl border border-red-600/30 shadow-lg">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <span className="font-semibold">Something went wrong. Please try again.</span>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full -translate-y-16 -translate-x-16 blur-2xl"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-amber-400/20 to-orange-400/20 rounded-full translate-y-20 translate-x-20 blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4 shadow-2xl">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Find Our Locations</h3>
                  <p className="text-amber-100">Explore our branches across Addis Ababa</p>
                  <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mt-3"></div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <InteractiveMap branches={branches} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Social Media Icons */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-2xl"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-2xl"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-2xl"
              >
                <Twitter className="h-5 w-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-2xl"
              >
                <Youtube className="h-5 w-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-800 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-2xl"
              >
                <Linkedin className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}