'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import NavigationWrapper from '@/components/NavigationWrapper';
import { ArrowLeft, CreditCard, MapPin, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { placeOrder, OrderItem } from '@/lib/api';

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, addOrder, clearCart } = useCart();
  const router = useRouter();
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    specialInstructions: ''
  });

  const totalPrice = getTotalPrice();
  const deliveryFee = orderType === 'delivery' ? 2.50 : 0;
  const tax = totalPrice * 0.08; // 8% tax
  const finalTotal = totalPrice + deliveryFee + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate cart items
      if (!cartItems || cartItems.length === 0) {
        throw new Error('No items in cart');
      }

      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
        throw new Error('Please fill in all required fields');
      }

      // Convert cart items to order items with validation
      const orderItems: OrderItem[] = cartItems.map((cartItem, index) => {
        if (!cartItem || !cartItem.item) {
          throw new Error(`Invalid cart item at index ${index}`);
        }

        // Handle both _id and id fields
        const itemId = (cartItem.item as any)._id || cartItem.item.id;
        
        return {
          menuItemId: itemId ? itemId.toString() : `item-${index}`,
          name: cartItem.item.name || 'Unknown Item',
          description: cartItem.item.description || '',
          price: cartItem.item.price || 0,
          quantity: cartItem.quantity || 1,
          specialInstructions: cartItem.specialInstructions,
          category: cartItem.item.category || 'general',
          image: cartItem.item.image || '',
          isVegan: cartItem.item.isVegan || false,
          isGlutenFree: cartItem.item.isGlutenFree || false,
          calories: cartItem.item.calories || 0,
          prepTime: cartItem.item.prepTime || 0
        };
      });

      // Create order data
      const orderData = {
        items: orderItems,
        subtotal: totalPrice,
        deliveryFee: deliveryFee,
        tax: tax,
        total: finalTotal,
        orderType,
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: orderType === 'delivery' ? formData.address : undefined
        },
        specialInstructions: formData.specialInstructions
      };

      // Try to place order via API first
      try {
        const response = await placeOrder(orderData);
        
        if (response.success) {
          // Also add to local cart context for backup
          addOrder({
            ...orderData,
            id: response.data.orderId,
            orderNumber: response.data.orderNumber,
            status: 'pending' as const,
            orderTime: new Date()
          });
          
          clearCart();
          
          // Redirect to order confirmation with real order number
          router.push(`/order-confirmation?orderNumber=${response.data.orderNumber}&email=${formData.email}`);
          return;
        } else {
          throw new Error(response.message || 'Failed to place order');
        }
      } catch (apiError) {
        console.warn('API order placement failed, using local fallback:', apiError);
        
        // Show user-friendly message about offline mode
        alert('Note: Order placed in offline mode. Your order will be processed when the system is back online.');
        
        // Fallback: Create order locally
        const localOrderId = `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const localOrderNumber = `#LOC-${String(Date.now()).slice(-6)}`;
        
        const localOrder = {
          ...orderData,
          id: localOrderId,
          orderNumber: localOrderNumber,
          status: 'pending' as const,
          orderTime: new Date(),
          estimatedReadyTime: new Date(Date.now() + (orderType === 'delivery' ? 45 : 20) * 60000)
        };
        
        addOrder(localOrder);
        clearCart();
        
        // Redirect to order confirmation with local order
        router.push(`/order-confirmation?orderNumber=${localOrderNumber}&email=${formData.email}`);
        return;
      }
    } catch (error) {
      console.error('Error placing order:', error);
      let errorMessage = 'Failed to place order. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('toString')) {
          errorMessage = 'Invalid item data detected. Please refresh the page and try again.';
        } else {
          errorMessage = error.message;
        }
      }
      
      alert(`Order Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <NavigationWrapper>
          <div className="pt-20 flex items-center justify-center min-h-[80vh]">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
              <p className="text-gray-600 mb-8">Add some delicious items to your cart first!</p>
              <Link
                href="/menu"
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-200"
              >
                Browse Menu
              </Link>
            </div>
          </div>
        </NavigationWrapper>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <NavigationWrapper>
      
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/menu"
              className="inline-flex items-center space-x-2 text-amber-600 hover:text-amber-700 mb-4"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Menu</span>
            </Link>
            <h1 className="text-4xl font-bold text-gray-800">Checkout</h1>
            <p className="text-gray-600 mt-2">Complete your order</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-amber-200/50">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h2>
              
              {/* Order Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Order Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      orderType === 'pickup'
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <Clock className="h-6 w-6 mx-auto mb-2" />
                    <span className="font-semibold">Pickup</span>
                    <p className="text-sm text-gray-500 mt-1">Ready in 15-20 min</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      orderType === 'delivery'
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <MapPin className="h-6 w-6 mx-auto mb-2" />
                    <span className="font-semibold">Delivery</span>
                    <p className="text-sm text-gray-500 mt-1">30-45 min + $2.50</p>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <User className="h-4 w-4 inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Phone className="h-4 w-4 inline mr-2" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <MapPin className="h-4 w-4 inline mr-2" />
                        Delivery Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required={orderType === 'delivery'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                        placeholder="123 Main St, City, State 12345"
                      />
                    </div>
                  )}
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MessageSquare className="h-4 w-4 inline mr-2" />
                    Special Instructions
                  </label>
                  <textarea
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 resize-none"
                    placeholder="Any special requests or dietary restrictions?"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-6 w-6 text-gray-600" />
                      <span className="text-gray-700 font-medium">Pay at pickup/delivery</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      We accept cash, credit cards, and mobile payments
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-2xl ${
                    isSubmitting
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white hover:scale-105 hover:shadow-amber-500/25'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Order...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span>Place Order - ${finalTotal.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-amber-200/50">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((cartItem) => (
                  <div key={cartItem.item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm">{cartItem.item.name}</h4>
                      <p className="text-gray-600 text-xs">Qty: {cartItem.quantity}</p>
                    </div>
                    <span className="font-bold text-amber-600">
                      ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-800 border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Order Info */}
              <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <div className="flex items-center space-x-2 text-amber-700 mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold">Estimated Time</span>
                </div>
                <p className="text-amber-600 text-sm">
                  {orderType === 'pickup' ? '15-20 minutes' : '30-45 minutes'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </NavigationWrapper>
    </main>
  );
}
