'use client';

import { useState } from 'react';
import { X, ChevronDown, ChevronUp, Search, HelpCircle, MessageCircle, Phone, Mail, Star, Coffee, Clock, Award } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  icon: any;
  helpful: number;
  tags: string[];
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Do you offer delivery services?",
    answer: "Yes!! We offer delivery within a 5-mile radius of our location. Orders over $25 qualify for free delivery, and we use eco-friendly packaging. Delivery typically takes 20-30 minutes during peak hours.",
    category: "Delivery",
    icon: Coffee,
    helpful: 24,
    tags: ["delivery", "shipping", "free delivery"]
  },
  {
    id: 2,
    question: "Can I reserve a table for a group?",
    answer: "Absolutely! We recommend calling ahead for groups of 6 or more to ensure we can accommodate you. We also offer private event spaces for larger gatherings. Please call us at (555) 123-4567 to make a reservation.",
    category: "Reservations",
    icon: MessageCircle,
    helpful: 18,
    tags: ["reservations", "groups", "events"]
  },
  {
    id: 3,
    question: "Do you have WiFi available?",
    answer: "Yes, we provide free high-speed WiFi for all our customers. Perfect for remote work or studying. We also have plenty of power outlets and comfortable seating areas designed for productivity.",
    category: "Amenities",
    icon: HelpCircle,
    helpful: 31,
    tags: ["wifi", "work", "study", "internet"]
  },
  {
    id: 4,
    question: "Are you pet-friendly?",
    answer: "Yes! We welcome well-behaved pets in our outdoor seating area. We even have special treats for your furry friends and water bowls available. Please keep pets on a leash and clean up after them.",
    category: "Policies",
    icon: Award,
    helpful: 22,
    tags: ["pets", "animals", "outdoor seating"]
  },
  {
    id: 5,
    question: "Do you cater events?",
    answer: "We do! We offer catering services for meetings, parties, and special events. Our packages include coffee, pastries, and light meals. Contact us for custom packages and pricing. Minimum order of $100 for delivery.",
    category: "Catering",
    icon: Coffee,
    helpful: 15,
    tags: ["catering", "events", "parties", "meetings"]
  },
  {
    id: 6,
    question: "What are your operating hours?",
    answer: "We're open Monday through Friday from 6:00 AM to 8:00 PM, and Saturday through Sunday from 7:00 AM to 9:00 PM. We're closed on major holidays. Check our social media for any special hours or closures.",
    category: "Hours",
    icon: Clock,
    helpful: 28,
    tags: ["hours", "schedule", "open", "closed"]
  },
  {
    id: 7,
    question: "Do you have dairy-free options?",
    answer: "Yes! We offer a variety of dairy-free milk alternatives including oat milk, almond milk, coconut milk, and soy milk. We also have vegan pastries and snacks. Just let our baristas know about any dietary restrictions.",
    category: "Dietary",
    icon: Star,
    helpful: 19,
    tags: ["dairy-free", "vegan", "dietary restrictions", "milk alternatives"]
  },
  {
    id: 8,
    question: "Can I bring my own cup?",
    answer: "Absolutely! We encourage customers to bring their own reusable cups. We offer a 10% discount for bringing your own cup, and we'll make sure it's properly cleaned before use.",
    category: "Sustainability",
    icon: Award,
    helpful: 16,
    tags: ["reusable", "eco-friendly", "discount", "sustainability"]
  }
];

const categories = ["All", "Delivery", "Reservations", "Amenities", "Policies", "Catering", "Hours", "Dietary", "Sustainability"];

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQModal = ({ isOpen, onClose }: FAQModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [helpfulVotes, setHelpfulVotes] = useState<{ [key: number]: boolean }>({});

  if (!isOpen) return null;

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleHelpful = (id: number) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getSearchSuggestions = () => {
    if (searchQuery.length < 2) return [];
    const suggestions = faqData
      .flatMap(faq => faq.tags)
      .filter(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5);
    return [...new Set(suggestions)];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <HelpCircle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
                <p className="text-amber-100">Find answers to common questions about our coffee shop</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-6 bg-gray-50 border-b">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              {/* Search Suggestions */}
              {getSearchSuggestions().length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl mt-1 shadow-lg z-10">
                  {getSearchSuggestions().map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(suggestion)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === category
                      ? 'bg-amber-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No questions found</h3>
              <p className="text-gray-500">Try adjusting your search or category filter</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg"
                >
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <faq.icon className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{faq.question}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                            {faq.category}
                          </span>
                          <span className="flex items-center space-x-1">
                            <Star className="h-4 w-4" />
                            <span>{faq.helpful} found helpful</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {expandedItems.includes(faq.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>

                  {expandedItems.includes(faq.id) && (
                    <div className="px-6 pb-6 border-t bg-gray-50">
                      <div className="pt-4">
                        <p className="text-gray-700 leading-relaxed mb-4">{faq.answer}</p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {faq.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Helpful Button */}
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => toggleHelpful(faq.id)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
                              helpfulVotes[faq.id]
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700'
                            }`}
                          >
                            <Star className={`h-4 w-4 ${helpfulVotes[faq.id] ? 'fill-current' : ''}`} />
                            <span>{helpfulVotes[faq.id] ? 'Thanks!' : 'Was this helpful?'}</span>
                          </button>

                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                              <MessageCircle className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                              <Phone className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                              <Mail className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 border-t">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-gray-800 mb-1">Still have questions?</h4>
              <p className="text-gray-600 text-sm">Our team is here to help you 24/7</p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-xl font-semibold flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Call Us</span>
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-800 px-6 py-2 rounded-xl font-semibold border border-gray-200 flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Live Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQModal;
