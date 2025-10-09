'use client';

import Navigation from '@/components/Navigation';
import { Coffee, Award, Heart, Sparkles, Leaf, Users } from 'lucide-react';


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


const milestones = [
  { year: '2008', title: 'Founded', description: 'Started as a small corner shop with big dreams' },
  { year: '2012', title: 'Expansion', description: 'Opened our second location downtown' },
  { year: '2016', title: 'Award Winner', description: 'Best Coffee Shop in the city' },
  { year: '2020', title: 'Community Hub', description: 'Became the heart of our neighborhood' },
  { year: '2024', title: 'Innovation', description: 'Leading sustainable coffee practices' }
];


export default function AboutPage() {

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
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/ch.png")'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50" />
        </div>
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
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100 relative">
        {/* Background Image */}
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
            {values.map((value, index) => {
              // Different background images for each value card
              const backgroundImages = [
                'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center&auto=format&q=80', // Quality - Coffee beans
                'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop&crop=center&auto=format&q=80', // Community - Coffee shop interior
                'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop&crop=center&auto=format&q=80', // Sustainability - Coffee roasting
                'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop&crop=center&auto=format&q=80'  // Expert Team - Barista at work
              ];
              
              return (
                <div
                  key={value.title}
                  className={`bg-gradient-to-br ${value.bgColor} rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/50 group relative overflow-hidden`}
                >
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                    <img
                      src={backgroundImages[index]}
                      alt={`${value.title} background`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                    <value.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 relative z-10">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed relative z-10">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}