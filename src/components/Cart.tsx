'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Plus, Minus, X, Trash2, Edit3, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalItems, getTotalPrice } = useCart();
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [specialInstructions, setSpecialInstructions] = useState<{ [key: number]: string }>({});

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleQuantityChange = (itemId: number, change: number) => {
    const currentQuantity = cartItems.find(item => item.item.id === itemId)?.quantity || 0;
    const newQuantity = Math.max(0, currentQuantity + change);
    updateQuantity(itemId, newQuantity);
  };

  const handleSpecialInstructionsChange = (itemId: number, instructions: string) => {
    setSpecialInstructions(prev => ({
      ...prev,
      [itemId]: instructions
    }));
  };

  const saveSpecialInstructions = (itemId: number) => {
    const instructions = specialInstructions[itemId] || '';
    // Here you would typically update the cart item with special instructions
    setEditingItem(null);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50">
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="h-6 w-6 text-amber-600" />
                  <h2 className="text-xl font-bold text-gray-800">Your Order</h2>
                  <span className="bg-amber-100 text-amber-800 text-sm px-2 py-1 rounded-full font-semibold">
                    {totalItems}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                    <p className="text-gray-400 text-sm">Add some delicious items to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((cartItem) => (
                      <div key={cartItem.item.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="flex items-start space-x-3">
                          <img
                            src={cartItem.item.image}
                            alt={cartItem.item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 text-sm">{cartItem.item.name}</h3>
                            <p className="text-gray-600 text-xs mt-1">${cartItem.item.price.toFixed(2)} each</p>
                            
                            {/* Special Instructions */}
                            {editingItem === cartItem.item.id ? (
                              <div className="mt-2">
                                <textarea
                                  value={specialInstructions[cartItem.item.id] || ''}
                                  onChange={(e) => handleSpecialInstructionsChange(cartItem.item.id, e.target.value)}
                                  placeholder="Special instructions..."
                                  className="w-full text-xs p-2 border border-gray-300 rounded-lg resize-none"
                                  rows={2}
                                />
                                <div className="flex space-x-2 mt-2">
                                  <button
                                    onClick={() => saveSpecialInstructions(cartItem.item.id)}
                                    className="text-xs bg-amber-600 text-white px-3 py-1 rounded-lg hover:bg-amber-700"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingItem(null)}
                                    className="text-xs bg-gray-300 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-400"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="mt-2">
                                {cartItem.specialInstructions && (
                                  <p className="text-xs text-amber-600 italic">
                                    "{cartItem.specialInstructions}"
                                  </p>
                                )}
                                <button
                                  onClick={() => setEditingItem(cartItem.item.id)}
                                  className="text-xs text-amber-600 hover:text-amber-700 flex items-center space-x-1 mt-1"
                                >
                                  <Edit3 className="h-3 w-3" />
                                  <span>Add instructions</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleQuantityChange(cartItem.item.id, -1)}
                              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-lg font-semibold min-w-[2rem] text-center">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(cartItem.item.id, 1)}
                              className="p-1 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-amber-600">
                              ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(cartItem.item.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-800">Total:</span>
                    <span className="text-2xl font-bold text-amber-600">${totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <Link
                      href="/checkout"
                      onClick={onClose}
                      className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-amber-500/25"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Proceed to Checkout</span>
                    </Link>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-white border-2 border-amber-500 text-amber-600 hover:bg-amber-50 py-2 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Pickup</span>
                      </button>
                      <button className="flex-1 bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 py-2 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>Delivery</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
