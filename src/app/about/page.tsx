'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Coffee, Users, Award, Heart, Clock, MapPin, Star } from 'lucide-react';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Head Barista',
    experience: '8 years',
    specialty: 'Latte Art',
    image: '👩‍🍳',
    description: 'Sarah brings passion and precision to every cup, creating beautiful latte art that delights our customers.'
  },
  {
    name: 'Michael Chen',
    role: 'Coffee Roaster',
    experience: '12 years',
    specialty: 'Bean Selection',
    image: '👨‍🍳',
    description: 'Michael carefully selects and roasts our beans to perfection, ensuring the highest quality in every batch.'
  },
  {
    name: 'Emma Rodriguez',
    role: 'Pastry Chef',
    experience: '6 years',
    specialty: 'Fresh Baking',
    image: '👩‍🍳',
    description: 'Emma creates delicious pastries daily, using traditional techniques and the finest ingredients.'
  },
  {
    name: 'David Kim',
    role: 'Store Manager',
    experience: '10 years',
    specialty: 'Customer Service',
    image: '👨‍💼',
    description: 'David ensures every customer feels welcome and has an exceptional experience at Kaffee Haus.'
  }
];

const values = [
  {
    icon: Coffee,
    title: 'Quality First',
    description: 'We source only the finest beans and use traditional brewing methods to ensure exceptional taste.'
  },
  {
    icon: Heart,
    title: 'Community Focused',
    description: 'We believe in building connections and creating a welcoming space for everyone in our community.'
  },
  {
    icon: Award,
    title: 'Sustainability',
    description: 'We\'re committed to environmentally friendly practices and supporting fair trade coffee farmers.'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our skilled baristas and staff are passionate about coffee and dedicated to your satisfaction.'
  }
];

const stats = [
  { number: '500+', label: 'Happy Customers Daily' },
  { number: '15+', label: 'Years of Experience' },
  { number: '50+', label: 'Coffee Varieties' },
  { number: '4.9', label: 'Average Rating' }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-amber-800 to-amber-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Our Story
            </h1>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              From humble beginnings to becoming a beloved community gathering place, 
              discover the passion and dedication behind Kaffee Haus.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-gray-800">A Coffee Journey</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
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
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-amber-200 to-amber-300 rounded-2xl p-8 text-center">
                <div className="text-8xl mb-4">☕</div>
                <h3 className="text-2xl font-bold text-amber-800 mb-2">Our Mission</h3>
                <p className="text-amber-700 italic">
                  "To create exceptional coffee experiences that bring people together 
                  and celebrate the simple joy of a perfect cup."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Kaffee Haus
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind every perfect cup
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-amber-600 font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 mb-3">{member.experience} experience</p>
                <p className="text-sm text-amber-700 font-medium mb-3">Specialty: {member.specialty}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-amber-800 to-amber-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">By the Numbers</h2>
            <p className="text-xl text-amber-100">
              Our impact on the community we serve
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-amber-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-gray-800">Visit Us</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-amber-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Location</p>
                    <p className="text-gray-600">123 Coffee Street, Downtown District</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-amber-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Hours</p>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Friday: 6:00 AM - 8:00 PM</p>
                      <p>Saturday - Sunday: 7:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h3>
              <div className="space-y-4">
                {[
                  {
                    name: 'Jessica M.',
                    rating: 5,
                    comment: 'The best coffee in town! The atmosphere is perfect for working or catching up with friends.'
                  },
                  {
                    name: 'Robert K.',
                    rating: 5,
                    comment: 'Amazing latte art and the staff is incredibly friendly. Highly recommend!'
                  },
                  {
                    name: 'Sarah L.',
                    rating: 5,
                    comment: 'Fresh pastries and excellent coffee. This place has become my daily routine.'
                  }
                ].map((review, index) => (
                  <div key={index} className="border-l-4 border-amber-400 pl-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex space-x-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                        ))}
                      </div>
                      <span className="font-semibold text-gray-800">{review.name}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
