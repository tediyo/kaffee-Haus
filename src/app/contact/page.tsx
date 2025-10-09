'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import FAQModal from '@/components/FAQModal';
import InteractiveMap from '@/components/InteractiveMap';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Instagram, Facebook, Twitter, CheckCircle, AlertCircle, Star, Coffee, Users, Award, HelpCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [faqModalOpen, setFaqModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset status after 3 seconds
    setTimeout(() => setSubmitStatus('idle'), 3000);
  };

  const branches = [
    {
      id: 1,
      name: 'Bole Main Branch',
      address: 'Bole Road, Near Edna Mall',
      city: 'Addis Ababa, Ethiopia',
      phone: '+251 11 123 4567',
      email: 'bole@kaffeehaus.com',
      hours: {
        weekdays: '6:00 AM - 10:00 PM',
        weekends: '7:00 AM - 11:00 PM'
      },
      features: ['WiFi', 'Outdoor Seating', 'Parking', 'Pet Friendly'],
      coordinates: { lat: 8.9806, lng: 38.7578 },
      isMain: true,
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop&crop=center&auto=format&q=80'
    },
    {
      id: 2,
      name: 'Addis Ababa University Branch',
      address: 'Sidist Kilo, University Area',
      city: 'Addis Ababa, Ethiopia',
      phone: '+251 11 123 4568',
      email: 'university@kaffeehaus.com',
      hours: {
        weekdays: '5:30 AM - 11:00 PM',
        weekends: '7:00 AM - 12:00 AM'
      },
      features: ['Study Areas', 'WiFi', 'Student Discounts', 'Late Hours'],
      coordinates: { lat: 9.0400, lng: 38.7500 },
      isMain: false,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop&crop=center&auto=format&q=80'
    },
    {
      id: 3,
      name: 'Merkato Branch',
      address: 'Merkato Market Area, Near Commercial Bank',
      city: 'Addis Ababa, Ethiopia',
      phone: '+251 11 123 4569',
      email: 'merkato@kaffeehaus.com',
      hours: {
        weekdays: '7:00 AM - 9:00 PM',
        weekends: '8:00 AM - 10:00 PM'
      },
      features: ['Market Access', 'WiFi', 'Grab & Go', 'Family Friendly'],
      coordinates: { lat: 9.0200, lng: 38.7200 },
      isMain: false,
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=400&fit=crop&crop=center&auto=format&q=80'
    },
    {
      id: 4,
      name: 'Bole Airport Branch',
      address: 'Terminal 1, Departure Hall, Bole International Airport',
      city: 'Addis Ababa, Ethiopia',
      phone: '+251 11 123 4570',
      email: 'airport@kaffeehaus.com',
      hours: {
        weekdays: '4:00 AM - 12:00 AM',
        weekends: '4:00 AM - 12:00 AM'
      },
      features: ['24/7 Access', 'Quick Service', 'Travel Snacks', 'Mobile Ordering'],
      coordinates: { lat: 8.9779, lng: 38.7993 },
      isMain: false,
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&h=400&fit=crop&crop=center&auto=format&q=80'
    }
  ];

  const [selectedBranch, setSelectedBranch] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram', color: 'from-pink-500 to-rose-600' },
    { icon: Facebook, href: '#', label: 'Facebook', color: 'from-blue-600 to-blue-700' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'from-sky-500 to-blue-600' }
  ];

  const faqs = [
    {
      question: "Do you offer delivery services?",
      answer: "Yes! We offer delivery within a 5-mile radius. Orders over $25 qualify for free delivery.",
      icon: Coffee
    },
    {
      question: "Can I reserve a table for a group?",
      answer: "Absolutely! We recommend calling ahead for groups of 6 or more to ensure we can accommodate you.",
      icon: Users
    },
    {
      question: "Do you have WiFi available?",
      answer: "Yes, we provide free high-speed WiFi for all our customers. Perfect for remote work or studying.",
      icon: MessageCircle
    },
    {
      question: "Are you pet-friendly?",
      answer: "Yes! We welcome well-behaved pets in our outdoor seating area. We even have special treats for your furry friends.",
      icon: Award
    },
    {
      question: "Do you cater events?",
      answer: "We do! We offer catering services for meetings, parties, and special events. Contact us for custom packages.",
      icon: Coffee
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <Navigation onFAQClick={() => setFaqModalOpen(true)} />
      
      {/* Enhanced Hero Section with Background Image */}
      <section className="pt-20 pb-20 relative overflow-hidden min-h-[80vh] flex items-center">
        {/* Professional Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80")'
            }}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-amber-900/70 to-black/60" />
          {/* Additional warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-amber-800/30 to-amber-700/40" />
        </div>
        
        {/* Animated floating elements */}
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
              Let's{' '}
              <span className="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">
                Connect
              </span>
            </h1>
            
            <p className="text-2xl text-amber-100 max-w-4xl mx-auto leading-relaxed">
              We'd love to hear from you! Whether you have questions, feedback, 
              or just want to say hello, we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-20 bg-white relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/Tq.jpg")'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-amber-100 rounded-full px-6 py-3 text-amber-800 mb-6">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Our Locations</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Find Us Near You</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit any of our convenient locations across the city
            </p>
          </div>

          {/* Branch Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {branches.map((branch, index) => (
              <div
                key={branch.id}
                className={`bg-white rounded-3xl p-6 shadow-lg border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer ${
                  selectedBranch === index 
                    ? 'border-amber-500 shadow-2xl ring-2 ring-amber-200' 
                    : 'border-amber-200/50 hover:border-amber-300'
                }`}
                onClick={() => setSelectedBranch(index)}
              >
                {/* Branch Image */}
                <div className="relative mb-4 rounded-2xl overflow-hidden">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-32 object-cover"
                  />
                  {branch.isMain && (
                    <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      Main Branch
                    </div>
                  )}
                </div>

                {/* Branch Info */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-800">{branch.name}</h3>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{branch.address}</p>
                        <p>{branch.city}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-amber-600" />
                      <span>{branch.phone}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-amber-600" />
                      <span className="text-xs">{branch.email}</span>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-medium text-gray-700">Hours</span>
                    </div>
                    <div className="text-xs text-gray-600 pl-6">
                      <p>Mon-Fri: {branch.hours.weekdays}</p>
                      <p>Sat-Sun: {branch.hours.weekends}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1">
                    {branch.features.map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-2 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg">
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form & Map */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100 relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80")'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 to-orange-100/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Enhanced Contact Form */}
            <div className="bg-white rounded-3xl p-10 shadow-2xl border border-amber-200/50">
              <div className="space-y-6">
                <div>
                  <h3 className="text-4xl font-bold text-gray-800 mb-2">Send us a Message</h3>
                  <p className="text-gray-600 text-lg">We'll get back to you within 24 hours</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-lg"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-lg"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-lg"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-none text-lg"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-bold text-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg ${
                      isSubmitting
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white hover:scale-105 hover:shadow-amber-500/25'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-6 w-6" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-xl">
                      <CheckCircle className="h-5 w-5" />
                      <span>Message sent successfully! We'll get back to you soon.</span>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl">
                      <AlertCircle className="h-5 w-5" />
                      <span>Something went wrong. Please try again.</span>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Contact Information & Social */}
            <div className="space-y-8">
              {/* General Contact Info */}
              <div className="bg-gradient-to-br from-amber-200 via-orange-200 to-amber-300 rounded-3xl p-10 text-center shadow-2xl border border-amber-300/50">
                <div className="w-24 h-24 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-12 w-12 text-amber-600" />
                </div>
                <h3 className="text-3xl font-bold text-amber-800 mb-4">General Inquiries</h3>
                <p className="text-amber-700 text-lg mb-6">
                  Have questions? We're here to help with any general inquiries.
                </p>
                <div className="bg-white/70 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <Phone className="h-5 w-5 text-amber-600" />
                    <span className="text-amber-800 font-bold text-lg">(555) 123-4567</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <Mail className="h-5 w-5 text-amber-600" />
                    <span className="text-amber-800 font-bold text-lg">hello@kaffeehaus.com</span>
                  </div>
                </div>
                <button className="mt-6 bg-white/50 hover:bg-white/70 text-amber-800 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105">
                  Call Now
                </button>
              </div>

              {/* Enhanced Social Media */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-amber-200/50">
                <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Follow Us</h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className={`w-full h-20 bg-gradient-to-r ${social.color} hover:scale-105 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 shadow-lg`}
                    >
                      <social.icon className="h-8 w-8 text-white mb-2" />
                      <span className="text-white text-sm font-semibold">{social.label}</span>
                    </a>
                  ))}
                </div>
                <p className="text-center text-gray-600 text-lg">
                  Stay updated with our latest news and special offers
                </p>
              </div>

              {/* Enhanced Quick Contact */}
              <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-3xl p-8 text-white shadow-2xl">
                <h3 className="text-3xl font-bold mb-6 text-center">Quick Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-2xl">
                    <Phone className="h-6 w-6" />
                    <div>
                      <p className="font-semibold">(555) 123-4567</p>
                      <p className="text-sm text-amber-200">Main Line</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-2xl">
                    <Mail className="h-6 w-6" />
                    <div>
                      <p className="font-semibold">hello@kaffeehaus.com</p>
                      <p className="text-sm text-amber-200">General Inquiries</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-2xl">
                    <MessageCircle className="h-6 w-6" />
                    <div>
                      <p className="font-semibold">Live chat available</p>
                      <p className="text-sm text-amber-200">Mon-Fri 9AM-6PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-20 bg-white relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/TRT.jpg")'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/80" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-amber-100 rounded-full px-6 py-3 text-amber-800 mb-6">
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">Frequently Asked Questions</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Quick Answers</h2>
            <p className="text-xl text-gray-600 mb-8">
              Find answers to the most common questions about our services
            </p>
            
            {/* Interactive FAQ Button */}
            <button
              onClick={() => setFaqModalOpen(true)}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-amber-500/25 flex items-center space-x-3 mx-auto"
            >
              <HelpCircle className="h-6 w-6" />
              <span>Browse All Questions</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.slice(0, 4).map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => setFaqModalOpen(true)}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <faq.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{faq.question}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{faq.answer}</p>
                    <p className="text-amber-600 text-sm font-medium mt-2">Click to read more →</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-amber-100 rounded-full px-6 py-3 text-amber-800 mb-6">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Interactive Map</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Find Our Locations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Click on any location marker to see branch details
            </p>
          </div>

          {/* Map Container */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-200/50">
            <div className="p-6 bg-gradient-to-r from-amber-500 to-orange-500">
              <h3 className="text-2xl font-bold text-white mb-2">Kaffee Haus Locations</h3>
              <p className="text-amber-100">Explore our branches across the city</p>
            </div>
            
            {/* Interactive Map */}
            <InteractiveMap
              branches={branches}
              selectedBranch={selectedBranch}
              onBranchSelect={setSelectedBranch}
            />
          </div>
        </div>
      </section>

      {/* FAQ Modal */}
      <FAQModal
        isOpen={faqModalOpen}
        onClose={() => setFaqModalOpen(false)}
      />
    </main>
  );
}