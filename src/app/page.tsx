'use client';

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import AnimatedHeroSection from '@/components/AnimatedHeroSection';
import CoffeeShopScene from '@/components/CoffeeShopScene';
import InteractiveModal from '@/components/InteractiveModal';
import InteractiveTime from '@/components/InteractiveTime';
import DynamicHighlights from '@/components/DynamicHighlights';
import DynamicCoffeeHistory from '@/components/DynamicCoffeeHistory';
import DynamicCoffeeFacts from '@/components/DynamicCoffeeFacts';
// Removed unused imports since we're now using only dynamic components

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'coffee' | 'location' | 'contact' | 'special'>('coffee');

  const openModal = (type: 'coffee' | 'location' | 'contact' | 'special') => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Animated Hero Section */}
      <div className="pt-20">
        <AnimatedHeroSection />
        </div>

      {/* Dynamic Highlights Section */}
      <DynamicHighlights />

      {/* Dynamic Coffee History Section */}
            <DynamicCoffeeHistory />

      {/* Dynamic Coffee Facts Section */}
            <DynamicCoffeeFacts />


      {/* Interactive Modal */}
      <InteractiveModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />
    </main>
  );
}
