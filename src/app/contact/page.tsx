'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Instagram, Facebook, Twitter, CheckCircle, AlertCircle, Star, Coffee, Users, Award } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedContact, setSelectedContact] = useState(0);

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

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Coffee Street', 'Downtown District', 'City, State 12345'],
      color: 'from-red-500 to-pink-600',
      bgColor: 'from-red-50 to-pink-100',
      action: 'Get Directions'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['(555) 123-4567', '(555) 123-4568'],
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-100',
      action: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@kaffeehaus.com', 'orders@kaffeehaus.com'],
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-100',
      action: 'Send Email'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Mon-Fri: 6:00 AM - 8:00 PM', 'Sat-Sun: 7:00 AM - 9:00 PM'],
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-50 to-violet-100',
      action: 'View Hours'
    }
  ];

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
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <section className="pt-20 pb-20 bg-gradient-to-r from-amber-800 via-amber-700 to-orange-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-amber-300/20 rounded-full blur-2xl" />
          <div className="absolute top-32 right-20 w-32 h-32 bg-orange-300/30 rounded-full blur-xl" />
          <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl" />
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

      {/* Enhanced Contact Information */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-amber-100 rounded-full px-6 py-3 text-amber-800 mb-6">
              <Phone className="h-5 w-5" />
              <span className="font-medium">Contact Information</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Multiple Ways to Reach Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your preferred way to get in touch with our team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={info.title}
                className={`bg-gradient-to-br ${info.bgColor} rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border border-white/50 ${
                  selectedContact === index ? 'ring-2 ring-amber-500 shadow-2xl' : ''
                }`}
                onClick={() => setSelectedContact(index)}
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${info.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <info.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{info.title}</h3>
                <div className="space-y-2 mb-6">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600">{detail}</p>
                  ))}
                </div>
                <button className={`w-full bg-gradient-to-r ${info.color} text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg`}>
                  {info.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form & Map */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

            {/* Enhanced Map & Social */}
            <div className="space-y-8">
              {/* Enhanced Map Placeholder */}
              <div className="bg-gradient-to-br from-amber-200 via-orange-200 to-amber-300 rounded-3xl p-10 text-center shadow-2xl border border-amber-300/50">
                <div className="w-24 h-24 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-12 w-12 text-amber-600" />
                </div>
                <h3 className="text-3xl font-bold text-amber-800 mb-4">Find Us</h3>
                <p className="text-amber-700 text-lg mb-6">
                  Located in the heart of downtown, we're easy to find and always welcoming.
                </p>
                <div className="bg-white/70 rounded-2xl p-6 space-y-2">
                  <p className="text-amber-800 font-bold text-lg">123 Coffee Street</p>
                  <p className="text-amber-700">Downtown District</p>
                  <p className="text-amber-700">City, State 12345</p>
                </div>
                <button className="mt-6 bg-white/50 hover:bg-white/70 text-amber-800 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105">
                  Get Directions
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
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-amber-100 rounded-full px-6 py-3 text-amber-800 mb-6">
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">Frequently Asked Questions</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Quick Answers</h2>
            <p className="text-xl text-gray-600">
              Find answers to the most common questions about our services
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <faq.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}