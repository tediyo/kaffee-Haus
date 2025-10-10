'use client';

import { useState } from 'react';
import Navigation from './Navigation';
import Cart from './Cart';

interface NavigationWrapperProps {
  children: React.ReactNode;
}

const NavigationWrapper: React.FC<NavigationWrapperProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartOpen = () => setIsCartOpen(true);
  const handleCartClose = () => setIsCartOpen(false);

  return (
    <>
      <Navigation onCartClick={handleCartOpen} />
      <Cart isOpen={isCartOpen} onClose={handleCartClose} />
      {children}
    </>
  );
};

export default NavigationWrapper;
