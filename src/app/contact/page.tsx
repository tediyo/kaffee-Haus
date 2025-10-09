'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import FAQModal from '@/components/FAQModal';
import { Phone, Mail, Clock, Send, MessageCircle, Instagram, Facebook, Twitter, CheckCircle, AlertCircle, Star, Users, Award, HelpCircle, Coffee } from 'lucide-react';

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
            <div className="bg-white rounded-xl p-4 shadow-lg border border-amber-200/50 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full -translate-y-8 translate-x-8 opacity-40"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-amber-100 to-orange-100 rounded-full translate-y-6 -translate-x-6 opacity-40"></div>
              
              <div className="relative z-10 space-y-3">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-1">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Send us a Message</h3>
                  <p className="text-gray-600 text-xs mb-2">We'll get back to you within 24 hours</p>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto"></div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="name" className="block text-xs font-bold text-gray-800 mb-1 flex items-center">
                        <span className="w-1 h-1 bg-amber-500 rounded-full mr-1"></span>
                        Full Name *
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 text-sm bg-gray-50 hover:bg-white"
                          placeholder="Your full name"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <Users className="h-3 w-3 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="email" className="block text-xs font-bold text-gray-800 mb-1 flex items-center">
                        <span className="w-1 h-1 bg-amber-500 rounded-full mr-1"></span>
                        Email Address *
                      </label>
                      <div className="relative group">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 text-sm bg-gray-50 hover:bg-white"
                          placeholder="your@email.com"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <Mail className="h-3 w-3 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="subject" className="block text-xs font-bold text-gray-800 mb-1 flex items-center">
                      <span className="w-1 h-1 bg-amber-500 rounded-full mr-1"></span>
                      Subject *
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 text-sm bg-gray-50 hover:bg-white"
                        placeholder="What's this about?"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <MessageCircle className="h-3 w-3 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="block text-xs font-bold text-gray-800 mb-1 flex items-center">
                      <span className="w-1 h-1 bg-amber-500 rounded-full mr-1"></span>
                      Message *
                    </label>
                    <div className="relative group">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 resize-none text-sm bg-gray-50 hover:bg-white"
                        placeholder="Tell us what's on your mind..."
                      />
                      <div className="absolute top-2 right-2">
                        <Send className="h-3 w-3 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center space-x-1 shadow-md transform relative overflow-hidden ${
                      isSubmitting
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed scale-95'
                        : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25 active:scale-95'
                    }`}
                  >
                    {!isSubmitting && (
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 hover:opacity-20 transition-opacity duration-200"></div>
                    )}
                    <div className="relative z-10 flex items-center space-x-1">
                      {isSubmitting ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
                    <div className="flex items-center space-x-3 text-green-700 bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl border border-green-200 shadow-lg mt-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-sm">Message sent successfully! We'll get back to you soon.</span>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="flex items-center space-x-3 text-red-700 bg-gradient-to-r from-red-50 to-pink-50 p-3 rounded-xl border border-red-200 shadow-lg mt-3">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <span className="font-semibold text-sm">Something went wrong. Please try again.</span>
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


      {/* FAQ Modal */}
      <FAQModal
        isOpen={faqModalOpen}
        onClose={() => setFaqModalOpen(false)}
      />
    </main>
  );
}