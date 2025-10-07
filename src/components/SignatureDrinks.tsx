'use client';

import { motion } from 'framer-motion';
import { Coffee, Flame } from 'lucide-react';

interface SignatureDrink {
  id: number;
  name: string;
  span: string;
  image: string;
  ingredients: string[];
  price: number;
  rating: number;
  prepTime: number;
  description: string;
}

const signatureDrinks: SignatureDrink[] = [
  {
    id: 1,
    name: 'Ethiopian',
    span: 'Yirgacheffe',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=600&fit=crop&crop=center&auto=format&q=80',
    ingredients: ['Single Origin Beans', 'Light Roast', 'Floral Notes', 'Citrus Finish'],
    price: 4.50,
    rating: 4.9,
    prepTime: 3,
    description: 'Premium single origin coffee with bright acidity and floral aromas'
  },
  {
    id: 2,
    name: 'Colombian',
    span: 'Supremo',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=600&fit=crop&crop=center&auto=format&q=80',
    ingredients: ['Colombian Beans', 'Medium Roast', 'Chocolate Notes', 'Nutty Finish'],
    price: 4.25,
    rating: 4.8,
    prepTime: 4,
    description: 'Rich and full-bodied with chocolate undertones'
  },
  {
    id: 3,
    name: 'Italian',
    span: 'Espresso',
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&h=600&fit=crop&crop=center&auto=format&q=80',
    ingredients: ['Dark Roast Blend', 'Robusta & Arabica', 'Bold Flavor', 'Perfect Crema'],
    price: 3.75,
    rating: 4.7,
    prepTime: 2,
    description: 'Classic Italian espresso with perfect crema and bold flavor'
  },
  {
    id: 4,
    name: 'Cappuccino',
    span: 'Art',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=600&fit=crop&crop=center&auto=format&q=80',
    ingredients: ['Espresso', 'Steamed Milk', 'Milk Foam', 'Latte Art'],
    price: 4.50,
    rating: 4.9,
    prepTime: 5,
    description: 'Perfectly balanced espresso with beautiful foam art'
  }
];

const SignatureDrinks = () => {

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 text-amber-800 border border-amber-200 mb-6"
          >
            <Coffee className="h-5 w-5" />
            <span className="font-semibold">Our Signature Drinks</span>
            <Flame className="h-4 w-4 text-orange-500" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
          >
            Crafted with{' '}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Passion
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Explore our signature coffee creations, each carefully crafted to perfection
          </motion.p>
        </div>

        {/* Interactive Slideshow Container - Horizontal Layout */}
        <div className="flex flex-wrap justify-center gap-8">
          {signatureDrinks.map((drink, index) => (
            <div key={drink.id} className="slideshow-container">
              <div className="slideshow">
                <div
                  className="slide"
                  style={{ '--i': 0 } as React.CSSProperties}
                >
                  <h2>
                    {drink.name}
                    <span>{drink.span}</span>
                  </h2>
                  <img src={drink.image} alt={drink.name} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 text-lg">
            Watch our signature drinks rotate in 3D space
          </p>
        </motion.div>
      </div>

      <style jsx global>{`
        .slideshow-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slideshow {
          position: relative;
          width: 250px;
          height: 350px;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .slideshow .slide {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: start;
          justify-content: start;
          transform: rotateY(270deg);
          transform-style: preserve-3d;
          animation: animate 8s linear infinite;
          animation-delay: calc(var(--i) * 0.5s);
        }

        @keyframes animate {
          0% {
            transform: rotateY(270deg);
          }
          25% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(90deg);
          }
          75% {
            transform: rotateY(180deg);
          }
          100% {
            transform: rotateY(270deg);
          }
        }

        .slideshow .slide img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .slideshow .slide h2 {
          position: relative;
          z-index: 1000;
          color: #000000;
          font-size: 1.8em;
          transform: rotateY(180deg) translateY(120px) translateZ(50px);
          transform-style: preserve-3d;
          backface-visibility: hidden;
          font-weight: 900;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .slideshow .slide h2 span {
          position: absolute;
          top: 50%;
          left: 0;
          font-size: 1.8em;
          font-weight: 300;
          transform: translateZ(50px);
          backface-visibility: hidden;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .slideshow {
            width: 200px;
            height: 300px;
          }
          
          .slideshow .slide h2 {
            font-size: 1.4em;
            transform: rotateY(180deg) translateY(100px) translateZ(40px);
          }
          
          .slideshow .slide h2 span {
            font-size: 1.4em;
            transform: translateZ(40px);
          }
        }

        @media (max-width: 480px) {
          .slideshow {
            width: 180px;
            height: 280px;
          }
          
          .slideshow .slide h2 {
            font-size: 1.2em;
            transform: rotateY(180deg) translateY(90px) translateZ(30px);
          }
          
          .slideshow .slide h2 span {
            font-size: 1.2em;
            transform: translateZ(30px);
          }
        }
      `}</style>
    </section>
  );
};

export default SignatureDrinks;
