'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import InteractiveMap from '@/components/InteractiveMap';
import { MessageCircle, Star, MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Twitter, CheckCircle, AlertCircle, Coffee, Users, Award, HelpCircle } from 'lucide-react';

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

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram', color: 'from-pink-500 to-rose-600' },
    { icon: Facebook, href: '#', label: 'Facebook', color: 'from-blue-600 to-blue-700' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'from-sky-500 to-blue-600' }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <Navigation />
      
      {/* Enhanced Hero Section with Coffee Background */}
      <section className="pt-20 pb-20 relative overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80")'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-amber-900/70 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-amber-800/30 to-amber-700/40" />
        </div>
        
        <div className="absolute inset-0 z-5 overflow-hidden">
          <div className="absolute top-10 left-10 w-40 h-40 bg-amber-300/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute top-32 right-20 w-32 h-32 bg-orange-300/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white/90 border border-white/30">
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">Get in Touch</span>
              <Star className="h-4 w-4 text-amber-300" />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
              Contact{' '}
              <span className="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">
                Us
              </span>
            </h1>
            
            <p className="text-2xl text-amber-100 max-w-4xl mx-auto leading-relaxed">
              Find us across Addis Ababa! Visit our branches, connect with us online, or send us a message.
            </p>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80")'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-amber-100 rounded-full px-6 py-3 text-amber-800 mb-6">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Our Branches</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Find Us Near You</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We have multiple locations across Addis Ababa to serve you better
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {branches.map((branch) => (
              <div key={branch.id} className="bg-white rounded-2xl shadow-xl border border-amber-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative h-48">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg mb-1">{branch.name}</h3>
                    <p className="text-amber-200 text-sm">{branch.address}</p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-amber-600" />
                    <span className="text-gray-700 font-medium">{branch.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-amber-600" />
                    <span className="text-gray-700 text-sm">{branch.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-amber-600" />
                    <span className="text-gray-700 text-sm">{branch.hours}</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105">
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Social Media Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80")'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-black rounded-3xl p-4 h-145 shadow-2xl border border-amber-200/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full -translate-y-8 translate-x-8 opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-amber-100 to-orange-100 rounded-full translate-y-6 -translate-x-6 opacity-30"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-2">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">Send us a Message</h3>
                  <p className="text-gray-300 text-xs">We'll get back to you within 24 hours</p>
                  <div className="w-10 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mt-1"></div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-white mb-1 flex items-center">
                        <span className="w-1 h-1 bg-amber-500 rounded-full mr-1"></span>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-1 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 text-sm bg-gray-800 text-white placeholder-gray-400 hover:bg-gray-700"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-white mb-1 flex items-center">
                        <span className="w-1 h-1 bg-amber-500 rounded-full mr-1"></span>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-1 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 text-sm bg-gray-800 text-white placeholder-gray-400 hover:bg-gray-700"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold text-white mb-1 flex items-center">
                      <span className="w-1 h-1 bg-amber-500 rounded-full mr-1"></span>
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-1 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 text-sm bg-gray-800 text-white placeholder-gray-400 hover:bg-gray-700"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-white mb-1 flex items-center">
                      <span className="w-1 h-1 bg-amber-500 rounded-full mr-1"></span>
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-1 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 resize-none text-sm bg-gray-800 text-white placeholder-gray-400 hover:bg-gray-700"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 rounded-lg font-bold text-xs transition-all duration-200 flex items-center justify-center space-x-1 shadow-md transform relative overflow-hidden ${
                      isSubmitting
                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed scale-95'
                        : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25 active:scale-95'
                    }`}
                  >
                    {!isSubmitting && (
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 hover:opacity-20 transition-opacity duration-200"></div>
                    )}
                    <div className="relative z-10 flex items-center space-x-1">
                      {isSubmitting ? (
                        <>
                          <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-3 w-3" />
                          <span>Send Message</span>
                        </>
                      )}
                    </div>
                  </button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center space-x-2 text-green-400 bg-gradient-to-r from-green-900/50 to-emerald-900/50 p-2 rounded-lg border border-green-600/30 shadow-sm">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span className="font-semibold text-xs">Message sent successfully! We'll get back to you soon.</span>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="flex items-center space-x-2 text-red-400 bg-gradient-to-r from-red-900/50 to-pink-900/50 p-2 rounded-lg border border-red-600/30 shadow-sm">
                      <AlertCircle className="h-3 w-3 text-red-400" />
                      <span className="font-semibold text-xs">Something went wrong. Please try again.</span>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Social Media & Contact Info */}
            <div className="space-y-8">
              {/* Social Media */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-amber-200/50">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">Follow Us</h3>
                  <p className="text-gray-600 text-lg">Stay updated with our latest news and special offers</p>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-8">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className={`group flex items-center space-x-4 p-4 rounded-2xl transition-all duration-200 hover:scale-105 bg-gradient-to-r ${social.color} text-white hover:shadow-lg`}
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <social.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="font-semibold text-lg">{social.label}</span>
                        <p className="text-white/80 text-sm">Follow us for updates</p>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-gray-600 mb-4">Quick Contact</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-3">
                      <Phone className="h-5 w-5 text-amber-600" />
                      <span className="text-gray-800 font-bold">+251 11 123 4567</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3">
                      <Mail className="h-5 w-5 text-amber-600" />
                      <span className="text-gray-800 font-bold">hello@kaffeehaus.com</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Hours */}
              <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-3xl p-8 text-white shadow-2xl">
                <h3 className="text-3xl font-bold mb-6 text-center">Visit Us</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-2xl">
                    <Clock className="h-6 w-6" />
                    <div>
                      <p className="font-semibold">Main Branch Hours</p>
                      <p className="text-sm text-amber-200">Mon-Fri: 6AM-10PM, Sat-Sun: 7AM-11PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-2xl">
                    <Coffee className="h-6 w-6" />
                    <div>
                      <p className="font-semibold">Best Time to Visit</p>
                      <p className="text-sm text-amber-200">Early morning for fresh pastries</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-2xl">
                    <Users className="h-6 w-6" />
                    <div>
                      <p className="font-semibold">Group Reservations</p>
                      <p className="text-sm text-amber-200">Call ahead for 6+ people</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100 relative">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80")'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 to-orange-100/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 text-amber-800 mb-6">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Interactive Map</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Our Locations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our branches across Addis Ababa on the map below
            </p>
          </div>

          <InteractiveMap branches={branches} />
        </div>
      </section>
    </main>
  );
}