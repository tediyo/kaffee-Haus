'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  isPopular?: boolean;
  isNew?: boolean;
  prepTime?: number;
  calories?: number;
  isVegan?: boolean;
  isGlutenFree?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  orderType: 'pickup' | 'delivery';
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  };
  orderTime: Date;
  estimatedReadyTime?: Date;
  specialInstructions?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, specialInstructions?: string) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderTime'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load cart and orders from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('coffee-shop-cart');
    const savedOrders = localStorage.getItem('coffee-shop-orders');
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('coffee-shop-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('coffee-shop-orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (item: MenuItem, quantity: number = 1, specialInstructions?: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.item.id === item.id);
      
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity, specialInstructions }
            : cartItem
        );
      } else {
        return [...prev, { item, quantity, specialInstructions }];
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prev => prev.filter(cartItem => cartItem.item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(cartItem =>
        cartItem.item.id === itemId
          ? { ...cartItem, quantity }
          : cartItem
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, cartItem) => total + (cartItem.item.price * cartItem.quantity), 0);
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'orderTime'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      orderTime: new Date(),
    };
    
    setOrders(prev => [newOrder, ...prev]);
    clearCart(); // Clear cart after successful order
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    orders,
    addOrder,
    updateOrderStatus,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
