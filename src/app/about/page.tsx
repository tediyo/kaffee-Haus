'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Coffee, Users, Award, Heart, Clock, MapPin, Star, Sparkles, TrendingUp, Shield, Leaf, Zap } from 'lucide-react';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Head Barista',
    experience: '8 years',
    specialty: 'Latte Art',
    image: '👩‍🍳',
    description: 'Sarah brings passion and precision to every cup, creating beautiful latte art that delights our customers.',
    achievements: ['Latte Art Champion 2023', 'Customer Favorite', 'Training Expert'],
    rating: 4.9
  },
  {
    name: 'Michael Chen',
    role: 'Coffee Roaster',
    experience: '12 years',
    specialty: 'Bean Selection',
    image: '👨‍🍳',
    description: 'Michael carefully selects and roasts our beans to perfection, ensuring the highest quality in every batch.',
    achievements: ['Master Roaster', 'Bean Sourcing Expert', 'Quality Control'],
    rating: 4.8
  },
  {
    name: 'Emma Rodriguez',
    role: 'Pastry Chef',
    experience: '6 years',
    specialty: 'Fresh Baking',
    image: '👩‍🍳',
    description: 'Emma creates delicious pastries daily, using traditional techniques and the finest ingredients.',
    achievements: ['Pastry Artisan', 'Recipe Innovator', 'Fresh Daily'],
    rating: 4.7
  },
  {
    name: 'David Kim',
    role: 'Store Manager',
    experience: '10 years',
    specialty: 'Customer Service',
    image: '👨‍💼',
    description: 'David ensures every customer feels welcome and has an exceptional experience at Kaffee Haus.',
    achievements: ['Service Excellence', 'Team Leader', 'Community Builder'],
    rating: 4.9
  }
];

const values = [
  {
    icon: Coffee,
    title: 'Quality First',
    description: 'We source only the finest beans and use traditional brewing methods to ensure exceptional taste.',
    color: 'from-amber-500 to-amber-600',
    bgColor: 'from-amber-50 to-amber-100'
  },
  {
    icon: Heart,
    title: 'Community Focused',
    description: 'We believe in building connections and creating a welcoming space for everyone in our community.',
    color: 'from-red-500 to-pink-600',
    bgColor: 'from-red-50 to-pink-100'
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'We\'re committed to environmentally friendly practices and supporting fair trade coffee farmers.',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-100'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our skilled baristas and staff are passionate about coffee and dedicated to your satisfaction.',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'from-blue-50 to-indigo-100'
  }
];

const stats = [
  { number: '500+', label: 'Happy Customers Daily', icon: Users, color: 'text-blue-600' },
  { number: '15+', label: 'Years of Experience', icon: Award, color: 'text-amber-600' },
  { number: '50+', label: 'Coffee Varieties', icon: Coffee, color: 'text-green-600' },
  { number: '4.9', label: 'Average Rating', icon: Star, color: 'text-yellow-600' }
];

const milestones = [
  { year: '2008', title: 'Founded', description: 'Started as a small corner shop with big dreams' },
  { year: '2012', title: 'Expansion', description: 'Opened our second location downtown' },
  { year: '2016', title: 'Award Winner', description: 'Best Coffee Shop in the city' },
  { year: '2020', title: 'Community Hub', description: 'Became the heart of our neighborhood' },
  { year: '2024', title: 'Innovation', description: 'Leading sustainable coffee practices' }
];

export default function AboutPage() {
  const [selectedTeamMember, setSelectedTeamMember] = useState<number | null>(null);

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
              <Heart className="h-5 w-5" />
              <span className="font-medium">Our Story</span>
              <Sparkles className="h-4 w-4 text-amber-300" />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
              Our{' '}
              <span className="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">
                Story
              </span>
            </h1>
            
            <p className="text-2xl text-amber-100 max-w-4xl mx-auto leading-relaxed">
              From humble beginnings to becoming a beloved community gathering place, 
              discover the passion and dedication behind Kaffee Haus.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Story Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl font-bold text-gray-800">A Coffee Journey</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
              </div>
              
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  Founded in 2008 by coffee enthusiasts Maria and Carlos Rodriguez, 
                  Kaffee Haus began as a small corner shop with a big dream: to bring 
                  exceptional coffee to our community.
                </p>
                <p>
                  What started as a passion project has grown into a beloved gathering 
                  place where friends meet, ideas are born, and the perfect cup of coffee 
                  is always within reach. Our commitment to quality and community has 
                  remained unchanged throughout the years.
                </p>
                <p>
                  Today, we continue to source the finest beans from around the world, 
                  roast them to perfection, and serve them with love and attention to detail 
                  that our customers have come to expect.
                </p>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Journey</h3>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200/50">
                      <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {milestone.year}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{milestone.title}</h4>
                        <p className="text-gray-600 text-sm">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-200 via-orange-200 to-amber-300 rounded-3xl p-12 text-center shadow-2xl">
                <div className="text-9xl mb-6">☕</div>
                <h3 className="text-3xl font-bold text-amber-800 mb-4">Our Mission</h3>
                <p className="text-amber-700 italic text-lg leading-relaxed">
                  "To create exceptional coffee experiences that bring people together 
                  and celebrate the simple joy of a perfect cup."
                </p>
                <div className="mt-8 flex justify-center space-x-4">
                  <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center">
                    <Coffee className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 text-amber-800 mb-6">
              <Award className="h-5 w-5" />
              <span className="font-medium">Our Values</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6">What Drives Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Kaffee Haus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`bg-gradient-to-br ${value.bgColor} rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/50 group`}
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-amber-100 rounded-full px-6 py-3 text-amber-800 mb-6">
              <Users className="h-5 w-5" />
              <span className="font-medium">Meet Our Team</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6">The People Behind Every Perfect Cup</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our passionate team members who make Kaffee Haus special
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`bg-gradient-to-br from-amber-50 to-orange-100 rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border border-amber-200/50 ${
                  selectedTeamMember === index ? 'ring-2 ring-amber-500 shadow-2xl' : ''
                }`}
                onClick={() => setSelectedTeamMember(selectedTeamMember === index ? null : index)}
              >
                <div className="text-8xl mb-6 group-hover:scale-110 transition-transform duration-300">{member.image}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-amber-600 font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 mb-3">{member.experience} experience</p>
                <p className="text-sm text-amber-700 font-medium mb-4">Specialty: {member.specialty}</p>
                
                {/* Rating */}
                <div className="flex items-center justify-center space-x-1 mb-4">
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <span className="text-sm font-medium text-gray-600">{member.rating}</span>
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{member.description}</p>
                
                {/* Achievements */}
                <div className="space-y-1">
                  {member.achievements.map((achievement, i) => (
                    <div key={i} className="text-xs bg-white/50 rounded-full px-3 py-1 text-amber-700 font-medium">
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-r from-amber-800 to-orange-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-amber-300/20 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-300/20 rounded-full blur-2xl" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white/90 mb-6">
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium">By the Numbers</span>
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">Our Impact</h2>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              The numbers that tell our story of growth and community impact
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className={`w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-amber-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Location & Hours */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl font-bold text-gray-800">Visit Us</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg border border-amber-200/50">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">Location</p>
                    <p className="text-gray-600">123 Coffee Street, Downtown District</p>
                    <p className="text-gray-600">City, State 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg border border-amber-200/50">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">Hours</p>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Friday: 6:00 AM - 8:00 PM</p>
                      <p>Saturday - Sunday: 7:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-amber-200/50">
              <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Customer Reviews</h3>
              <div className="space-y-6">
                {[
                  {
                    name: 'Jessica M.',
                    rating: 5,
                    comment: 'The best coffee in town! The atmosphere is perfect for working or catching up with friends.',
                    date: '2 days ago'
                  },
                  {
                    name: 'Robert K.',
                    rating: 5,
                    comment: 'Amazing latte art and the staff is incredibly friendly. Highly recommend!',
                    date: '1 week ago'
                  },
                  {
                    name: 'Sarah L.',
                    rating: 5,
                    comment: 'Fresh pastries and excellent coffee. This place has become my daily routine.',
                    date: '3 days ago'
                  }
                ].map((review, index) => (
                  <div key={index} className="border-l-4 border-amber-400 pl-6 py-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-r-2xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex space-x-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                        ))}
                      </div>
                      <span className="font-semibold text-gray-800">{review.name}</span>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}