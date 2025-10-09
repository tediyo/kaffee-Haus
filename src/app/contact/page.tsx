'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import FAQModal from '@/components/FAQModal';
import { Phone, Mail, Clock, MessageCircle, Instagram, Facebook, Twitter, Star, Users, Award, HelpCircle, Coffee } from 'lucide-react';

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