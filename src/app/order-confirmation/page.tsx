'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import Navigation from '@/components/Navigation';
import { CheckCircle, Clock, MapPin, Phone, Mail, ArrowRight, Coffee, Star } from 'lucide-react';
import Link from 'next/link';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const { orders } = useCart();
  const [order, setOrder] = useState<any>(null);
  const [estimatedReadyTime, setEstimatedReadyTime] = useState<Date | null>(null);

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (orderId && orders.length > 0) {
      // Find the most recent order (since we just created it)
      const latestOrder = orders[0];
      setOrder(latestOrder);
      
      // Calculate estimated ready time
      const now = new Date();
      const readyTime = new Date(now.getTime() + (latestOrder.orderType === 'pickup' ? 20 : 45) * 60000);
      setEstimatedReadyTime(readyTime);
    }
  }, [searchParams, orders]);

  if (!order) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </div>
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
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-2">Thank you for your order</p>
            <p className="text-gray-500">Order ID: #{order.id.split('-')[1]}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-amber-200/50">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {order.items.map((cartItem: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{cartItem.item.name}</h4>
                      <p className="text-gray-600 text-sm">Quantity: {cartItem.quantity}</p>
                      {cartItem.specialInstructions && (
                        <p className="text-amber-600 text-sm italic mt-1">
                          "{cartItem.specialInstructions}"
                        </p>
                      )}
                    </div>
                    <span className="font-bold text-amber-600">
                      ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-xl font-bold text-gray-800">
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
                  
                  {estimatedReadyTime && (
                    <div className="flex items-center space-x-3">
                      <Coffee className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-800">Estimated Ready Time</p>
                        <p className="text-gray-600 text-sm">
                          {formatDate(estimatedReadyTime)} at {formatTime(estimatedReadyTime)}
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
    </main>
  );
}
