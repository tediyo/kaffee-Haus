'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Coffee, Users, Award, Heart, Clock, MapPin, Star, Sparkles, TrendingUp, Shield, Leaf, Zap, Phone } from 'lucide-react';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Head Barista',
    experience: '8 years',
    specialty: 'Latte Art',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    description: 'Sarah brings passion and precision to every cup, creating beautiful latte art that delights our customers.',
    achievements: ['Latte Art Champion 2023', 'Customer Favorite', 'Training Expert'],
    rating: 4.9
  },
  {
    name: 'Michael Chen',
    role: 'Coffee Roaster',
    experience: '12 years',
    specialty: 'Bean Selection',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    description: 'Michael carefully selects and roasts our beans to perfection, ensuring the highest quality in every batch.',
    achievements: ['Master Roaster', 'Bean Sourcing Expert', 'Quality Control'],
    rating: 4.8
  },
  {
    name: 'Emma Rodriguez',
    role: 'Pastry Chef',
    experience: '6 years',
    specialty: 'Fresh Baking',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    description: 'Emma creates delicious pastries daily, using traditional techniques and the finest ingredients.',
    achievements: ['Pastry Artisan', 'Recipe Innovator', 'Fresh Daily'],
    rating: 4.7
  },
  {
    name: 'David Kim',
    role: 'Store Manager',
    experience: '10 years',
    specialty: 'Customer Service',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
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
  { 
    number: 500, 
    suffix: '+', 
    label: 'Happy Customers Daily', 
    icon: Users, 
    color: 'text-blue-600',
    bgColor: 'from-blue-500 to-blue-600',
    description: 'Served with love every day'
  },
  { 
    number: 15, 
    suffix: '+', 
    label: 'Years of Experience', 
    icon: Award, 
    color: 'text-amber-600',
    bgColor: 'from-amber-500 to-amber-600',
    description: 'Perfecting our craft since 2008'
  },
  { 
    number: 50, 
    suffix: '+', 
    label: 'Coffee Varieties', 
    icon: Coffee, 
    color: 'text-green-600',
    bgColor: 'from-green-500 to-green-600',
    description: 'From around the world'
  },
  { 
    number: 4.9, 
    suffix: '/5', 
    label: 'Average Rating', 
    icon: Star, 
    color: 'text-yellow-600',
    bgColor: 'from-yellow-500 to-yellow-600',
    description: 'Based on 2,500+ reviews'
  },
  { 
    number: 10000, 
    suffix: '+', 
    label: 'Cups Served Monthly', 
    icon: TrendingUp, 
    color: 'text-purple-600',
    bgColor: 'from-purple-500 to-purple-600',
    description: 'And counting!'
  },
  { 
    number: 25, 
    suffix: '+', 
    label: 'Team Members', 
    icon: Heart, 
    color: 'text-red-600',
    bgColor: 'from-red-500 to-red-600',
    description: 'Passionate coffee lovers'
  },
  { 
    number: 98, 
    suffix: '%', 
    label: 'Customer Satisfaction', 
    icon: Shield, 
    color: 'text-indigo-600',
    bgColor: 'from-indigo-500 to-indigo-600',
    description: 'We measure what matters'
  },
  { 
    number: 5, 
    suffix: '+', 
    label: 'Awards Won', 
    icon: Zap, 
    color: 'text-orange-600',
    bgColor: 'from-orange-500 to-orange-600',
    description: 'Recognition for excellence'
  }
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
      
      {/* Enhanced Hero Section with Background Image */}
      <section className="pt-20 pb-20 relative overflow-hidden min-h-[80vh] flex items-center">
        {/* Professional Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80")'
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

              {/* Interactive Coffee Process Images */}
              <div className="grid grid-cols-3 gap-4 my-8">
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center&auto=format&q=80"
                    alt="Coffee beans sourcing"
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
                    Bean Sourcing
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop&crop=center&auto=format&q=80"
                    alt="Coffee roasting process"
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
                    Roasting
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop&crop=center&auto=format&q=80"
                    alt="Coffee brewing"
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
                    Brewing
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Journey</h3>
                <div className="space-y-4">
                {milestones.map((milestone) => (
                  <div key={milestone.year} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200/50">
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
            
            <div className="space-y-8">
              {/* Mission Card with Coffee Shop Image */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop&crop=center&auto=format&q=80"
                  alt="Coffee shop interior"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-amber-800/70 to-orange-900/80" />
                <div className="absolute inset-0 p-8 flex flex-col justify-center text-center">
                  <div className="text-6xl mb-4">☕</div>
                  <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
                  <p className="text-amber-100 italic text-lg leading-relaxed">
                    &ldquo;To create exceptional coffee experiences that bring people together 
                    and celebrate the simple joy of a perfect cup.&rdquo;
                  </p>
                  <div className="mt-8 flex justify-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Heart className="h-6 w-6 text-amber-200" />
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Coffee className="h-6 w-6 text-amber-200" />
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Users className="h-6 w-6 text-amber-200" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Coffee Journey Gallery */}
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop&crop=center&auto=format&q=80"
                    alt="Coffee shop atmosphere"
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
                    Community
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop&crop=center&auto=format&q=80"
                    alt="Coffee beans"
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
                    Quality
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
                className={`bg-gradient-to-br ${value.bgColor} rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/50 group relative overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop&crop=center&auto=format&q=80"
                    alt="Coffee background"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                  <value.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 relative z-10">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed relative z-10">{value.description}</p>
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
                <div className="relative mb-6 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto shadow-lg border-4 border-amber-200"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                    <Coffee className="h-4 w-4 text-white" />
                  </div>
                </div>
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

      {/* Enhanced Stats Section with Animated Counters */}
      <section className="py-20 bg-gradient-to-r from-amber-800 to-orange-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-amber-300/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-300/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-amber-400/15 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }} />
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

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group text-center bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${stat.bgColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2 group-hover:text-amber-200 transition-colors duration-300">
                  {stat.number.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-amber-100 text-lg font-semibold mb-2">{stat.label}</div>
                <div className="text-amber-200/80 text-sm">{stat.description}</div>
                
                {/* Progress bar for visual appeal */}
                <div className="mt-4 w-full bg-white/20 rounded-full h-1">
                  <div 
                    className={`bg-gradient-to-r ${stat.bgColor} h-1 rounded-full transition-all duration-1000 group-hover:scale-x-110`}
                    style={{ 
                      width: `${Math.min((stat.number / 1000) * 100, 100)}%`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Additional Impact Metrics */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-amber-100 text-lg">Local Partners</div>
              <div className="text-amber-200/70 text-sm">Supporting our community</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">$50K+</div>
              <div className="text-amber-100 text-lg">Community Investment</div>
              <div className="text-amber-200/70 text-sm">Giving back annually</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-amber-100 text-lg">Customer Support</div>
              <div className="text-amber-200/70 text-sm">Always here for you</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Location & Hours with Interactive Elements */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl" />
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 text-amber-800 mb-6">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Visit Our Coffee Shop</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Come Experience the Magic</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Located in the heart of downtown, we're your perfect escape for great coffee and warm community
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Location & Hours Info */}
            <div className="space-y-8">
              <div className="space-y-6">
                {/* Location Card */}
                <div className="group bg-white rounded-3xl p-8 shadow-xl border border-amber-200/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Location</h3>
                      <div className="space-y-2 text-gray-600">
                        <p className="text-lg font-semibold">123 Coffee Street</p>
                        <p className="text-lg">Downtown District</p>
                        <p className="text-lg">City, State 12345</p>
                      </div>
                      <button className="mt-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-amber-500/25 flex items-center space-x-2">
                        <MapPin className="h-5 w-5" />
                        <span>Get Directions</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Hours Card */}
                <div className="group bg-white rounded-3xl p-8 shadow-xl border border-amber-200/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Clock className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Opening Hours</h3>
                      <div className="space-y-3 text-gray-600">
                        <div className="flex justify-between items-center p-3 bg-amber-50 rounded-xl">
                          <span className="font-semibold">Monday - Friday</span>
                          <span className="text-amber-700 font-bold">6:00 AM - 8:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-amber-50 rounded-xl">
                          <span className="font-semibold">Saturday - Sunday</span>
                          <span className="text-amber-700 font-bold">7:00 AM - 9:00 PM</span>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
                        <div className="flex items-center space-x-2 text-green-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="font-semibold">Currently Open</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info Card */}
                <div className="group bg-white rounded-3xl p-8 shadow-xl border border-amber-200/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Phone className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h3>
                      <div className="space-y-2 text-gray-600">
                        <p className="text-lg">(555) 123-4567</p>
                        <p className="text-lg">hello@kaffeehaus.com</p>
                      </div>
                      <button className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-500/25 flex items-center space-x-2">
                        <Phone className="h-5 w-5" />
                        <span>Call Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Customer Reviews */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-amber-200/50">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-2">What Our Customers Say</h3>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-700">4.9/5</span>
                  <span className="text-gray-500">(2,500+ reviews)</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    name: 'Jessica M.',
                    rating: 5,
                    comment: 'The best coffee in town! The atmosphere is perfect for working or catching up with friends.',
                    date: '2 days ago',
                    avatar: '👩‍💼',
                    verified: true
                  },
                  {
                    name: 'Robert K.',
                    rating: 5,
                    comment: 'Amazing latte art and the staff is incredibly friendly. Highly recommend!',
                    date: '1 week ago',
                    avatar: '👨‍💼',
                    verified: true
                  },
                  {
                    name: 'Sarah L.',
                    rating: 5,
                    comment: 'Fresh pastries and excellent coffee. This place has become my daily routine.',
                    date: '3 days ago',
                    avatar: '👩‍🎨',
                    verified: true
                  },
                  {
                    name: 'Michael D.',
                    rating: 5,
                    comment: 'Outstanding service and the best cappuccino I&apos;ve ever had. The baristas are true artists!',
                    date: '5 days ago',
                    avatar: '👨‍🍳',
                    verified: true
                  }
                ].map((review, index) => (
                  <div 
                    key={index} 
                    className="group border-l-4 border-amber-400 pl-6 py-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-r-2xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-2xl">{review.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-gray-800">{review.name}</span>
                          {review.verified && (
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  </div>
                ))}
              </div>

              {/* View All Reviews Button */}
              <div className="mt-8 text-center">
                <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-amber-500/25">
                  View All Reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}