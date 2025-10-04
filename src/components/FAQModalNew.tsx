'use client';

import { useState } from 'react';
import { Search, HelpCircle, ChevronDown, ChevronUp, MessageCircle, Phone, Mail, Star, Coffee, Clock, Award } from 'lucide-react';
import CommonModal, { ModalButton } from './CommonModal';

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
    answer: "Yes! We offer delivery within a 5-mile radius of our coffee shop. Delivery is free for orders over $25, otherwise there's a $3 delivery fee. Orders typically arrive within 30-45 minutes.",
    category: "Delivery",
    icon: Coffee,
    helpful: 23,
    tags: ["delivery", "shipping", "free delivery", "order online"]
  },
  {
    id: 2,
    question: "Can I make a reservation?",
    answer: "We don't take reservations for regular seating, but we do offer private event bookings for groups of 10 or more. Contact us at least 48 hours in advance to discuss availability and special arrangements.",
    category: "Reservations",
    icon: Clock,
    helpful: 18,
    tags: ["reservations", "private events", "group bookings", "parties"]
  },
  {
    id: 3,
    question: "Do you have WiFi?",
    answer: "Absolutely! We provide free high-speed WiFi for all our customers. The network name is 'KaffeeHaus_Guest' and no password is required. We also have plenty of outlets for charging your devices.",
    category: "Amenities",
    icon: Coffee,
    helpful: 31,
    tags: ["wifi", "internet", "charging", "work", "study"]
  },
  {
    id: 4,
    question: "Are you pet-friendly?",
    answer: "Yes! We welcome well-behaved pets in our outdoor seating area. We even have a special 'Puppuccino' on our menu - a small cup of whipped cream for your furry friend. Please keep pets on a leash and clean up after them.",
    category: "Amenities",
    icon: Coffee,
    helpful: 15,
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

interface FAQModalNewProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQModalNew = ({ isOpen, onClose }: FAQModalNewProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [helpfulVotes, setHelpfulVotes] = useState<{ [key: number]: boolean }>({});

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

  const buttons: ModalButton[] = [
    {
      text: 'Contact Support',
      onClick: () => {
        // Handle contact support
        console.log('Contact support clicked');
      },
      variant: 'primary',
      icon: <MessageCircle className="h-4 w-4" />
    },
    {
      text: 'Close',
      onClick: onClose,
      variant: 'secondary'
    }
  ];

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Frequently Asked Questions"
      subtitle="Find answers to common questions about our coffee shop"
      icon={<HelpCircle className="h-6 w-6" />}
      size="xl"
      headerColor="amber"
      buttons={buttons}
    >
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-amber-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-amber-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ List */}
      <div className="p-6">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No questions found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <faq.icon className="h-5 w-5 text-amber-600" />
                      <h3 className="font-semibold text-gray-800">{faq.question}</h3>
                    </div>
                    {expandedItems.includes(faq.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </button>
                
                {expandedItems.includes(faq.id) && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 mb-4">{faq.answer}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => toggleHelpful(faq.id)}
                          className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                            helpfulVotes[faq.id]
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600 hover:bg-green-50'
                          }`}
                        >
                          <Star className="h-4 w-4" />
                          <span>{helpfulVotes[faq.id] ? 'Helpful' : 'Was this helpful?'}</span>
                        </button>
                        <span className="text-sm text-gray-500">
                          {faq.helpful + (helpfulVotes[faq.id] ? 1 : 0)} people found this helpful
                        </span>
                      </div>
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
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </CommonModal>
  );
};

export default FAQModalNew;
