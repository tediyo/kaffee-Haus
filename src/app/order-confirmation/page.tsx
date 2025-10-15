'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import NavigationWrapper from '@/components/NavigationWrapper';
import { CheckCircle, Clock, MapPin, Phone, Mail, ArrowRight, Coffee, Star } from 'lucide-react';
import Link from 'next/link';
import { getOrderByNumber, Order } from '@/lib/api';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const { orders } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrder = async (retryCount = 0) => {
      try {
        setLoading(true);
        const orderNumber = searchParams.get('orderNumber');
        const email = searchParams.get('email');
        
        console.log('URL parameters:', { orderNumber, email });
        console.log('All search params:', Object.fromEntries(searchParams.entries()));
        
        if (orderNumber && email) {
          console.log('Looking for order:', { orderNumber, email });
          console.log('Available local orders:', orders.length);
          
          // Try to fetch from API first
          try {
            const apiOrder = await getOrderByNumber(orderNumber, email);
            console.log('Found order in API:', apiOrder);
            setOrder(apiOrder);
          } catch (apiError) {
            console.log('API fetch failed, trying local storage...', apiError);
            // Fallback to local storage
            const localOrder = orders.find(o => o.orderNumber === orderNumber);
            if (localOrder) {
              console.log('Found order in local storage:', localOrder);
              setOrder(localOrder);
            } else {
              console.log('Available orders:', orders.map(o => ({ id: o.id, orderNumber: o.orderNumber })));
              
              // If this is the first attempt and we have no orders yet, retry after a short delay
              if (retryCount === 0 && orders.length === 0) {
                console.log('No orders found yet, retrying in 500ms...');
                setTimeout(() => loadOrder(1), 500);
                return;
              }
              
              throw new Error('Order not found in local storage');
            }
          }
        } else {
          // Fallback to local storage - show most recent order
          console.log('No URL parameters, showing most recent order');
          if (orders.length > 0) {
            const latestOrder = orders[0];
            console.log('Showing latest order:', latestOrder);
            setOrder(latestOrder);
          } else {
            console.log('No orders found in local storage');
            throw new Error('No orders found. Please place an order first.');
          }
        }
      } catch (err) {
        console.error('Error loading order:', err);
        const errorMessage = err instanceof Error ? err.message : 'Order not found';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [searchParams, orders]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <NavigationWrapper>
        <div className="pt-20 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </div>
        </NavigationWrapper>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <NavigationWrapper>
        <div className="pt-20 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The order you are looking for could not be found.'}</p>
            <Link
              href="/menu"
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-200"
            >
              Browse Menu
            </Link>
          </div>
        </div>
        </NavigationWrapper>
      </main>
    );
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <NavigationWrapper>
      
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-2">Thank you for your order</p>
            <p className="text-gray-500">Order Number: {order.orderNumber}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-amber-200/50">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                      {item.specialInstructions && (
                        <p className="text-amber-600 text-sm italic mt-1">
                          "{item.specialInstructions}"
                        </p>
                      )}
                    </div>
                    <span className="font-bold text-amber-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                {order.deliveryFee > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>${order.deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-800 border-t border-gray-300 pt-2">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Order Information */}
            <div className="space-y-6">
              {/* Order Status */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-amber-200/50">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Order Status</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-yellow-700">Order Received</span>
                </div>
                <p className="text-gray-600 text-sm">
                  We've received your order and will start preparing it shortly.
                </p>
              </div>

              {/* Timing Information */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-amber-200/50">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Timing</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="font-semibold text-gray-800">Order Time</p>
                      <p className="text-gray-600 text-sm">
                        {formatDate(new Date(order.orderTime))} at {formatTime(new Date(order.orderTime))}
                      </p>
                    </div>
                  </div>
                  
                  {order.estimatedReadyTime && (
                    <div className="flex items-center space-x-3">
                      <Coffee className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-800">Estimated Ready Time</p>
                        <p className="text-gray-600 text-sm">
                          {formatDate(new Date(order.estimatedReadyTime))} at {formatTime(new Date(order.estimatedReadyTime))}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-amber-200/50">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Customer Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{order.customerInfo.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{order.customerInfo.email}</span>
                  </div>
                  {order.orderType === 'delivery' && order.customerInfo.address && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{order.customerInfo.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Type */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-amber-200/50">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Order Type</h3>
                <div className="flex items-center space-x-3">
                  {order.orderType === 'pickup' ? (
                    <Clock className="h-5 w-5 text-amber-600" />
                  ) : (
                    <MapPin className="h-5 w-5 text-orange-600" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-800 capitalize">{order.orderType}</p>
                    <p className="text-gray-600 text-sm">
                      {order.orderType === 'pickup' 
                        ? 'Ready for pickup at our location' 
                        : 'Will be delivered to your address'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/menu"
                className="bg-white border-2 border-amber-500 text-amber-600 hover:bg-amber-50 px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2"
              >
                <Coffee className="h-5 w-5" />
                <span>Order More</span>
              </Link>
              
              <Link
                href="/"
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2"
              >
                <span>Back to Home</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-8 border border-amber-200">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-amber-400 fill-current" />
                ))}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You for Choosing Kaffee Haus!</h3>
              <p className="text-gray-600">
                We're excited to serve you the finest coffee experience. Your order is being prepared with love and care.
              </p>
            </div>
          </div>
        </div>
      </div>
      </NavigationWrapper>
    </main>
  );
}
