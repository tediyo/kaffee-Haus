'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import NavigationWrapper from '@/components/NavigationWrapper';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Coffee, 
  AlertCircle, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Package,
  Truck,
  Home
} from 'lucide-react';

interface OrderTracking {
  _id: string;
  orderId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  adminNotes?: string;
  customerNotes?: string;
  statusChangedAt: string;
  changedBy: 'admin' | 'customer';
}

interface Order {
  _id: string;
  orderNumber: string;
  status: 'pending' | 'accepted' | 'rejected' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  orderType: 'pickup' | 'delivery';
  total: number;
  orderTime: string;
  estimatedReadyTime?: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
}

const statusConfig = {
  pending: { 
    icon: Clock, 
    color: 'text-yellow-600', 
    bgColor: 'bg-yellow-100', 
    label: 'Order Placed',
    description: 'Your order has been placed and is waiting for confirmation'
  },
  accepted: { 
    icon: CheckCircle, 
    color: 'text-green-600', 
    bgColor: 'bg-green-100', 
    label: 'Order Accepted',
    description: 'Your order has been accepted and will be prepared soon'
  },
  rejected: { 
    icon: XCircle, 
    color: 'text-red-600', 
    bgColor: 'bg-red-100', 
    label: 'Order Rejected',
    description: 'Your order has been rejected. Please contact us for more information'
  },
  preparing: { 
    icon: Coffee, 
    color: 'text-orange-600', 
    bgColor: 'bg-orange-100', 
    label: 'Preparing',
    description: 'Your order is being prepared'
  },
  ready: { 
    icon: AlertCircle, 
    color: 'text-blue-600', 
    bgColor: 'bg-blue-100', 
    label: 'Ready for Pickup/Delivery',
    description: 'Your order is ready!'
  },
  delivered: { 
    icon: CheckCircle, 
    color: 'text-gray-600', 
    bgColor: 'bg-gray-100', 
    label: 'Delivered',
    description: 'Your order has been delivered'
  },
  cancelled: { 
    icon: XCircle, 
    color: 'text-red-600', 
    bgColor: 'bg-red-100', 
    label: 'Cancelled',
    description: 'Your order has been cancelled'
  }
};

export default function OrderTrackingPage() {
  const searchParams = useSearchParams();
  const { token, isAuthenticated } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [tracking, setTracking] = useState<OrderTracking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setError('Please login to track your order');
      setLoading(false);
      return;
    }

    const orderNumber = searchParams.get('orderNumber');
    const email = searchParams.get('email');

    if (!orderNumber || !email) {
      setError('Order number and email are required');
      setLoading(false);
      return;
    }

    fetchOrderTracking(orderNumber, email);
  }, [isAuthenticated, searchParams]);

  const fetchOrderTracking = async (orderNumber: string, email: string) => {
    try {
      setLoading(true);
      const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3002';
      
      const response = await fetch(`${adminApiUrl}/api/order-tracking?orderNumber=${orderNumber}&email=${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      
      if (result.success) {
        setOrder(result.data.order);
        setTracking(result.data.tracking);
      } else {
        setError(result.error || 'Failed to fetch order tracking');
      }
    } catch (error) {
      console.error('Error fetching order tracking:', error);
      setError('Failed to fetch order tracking');
    } finally {
      setLoading(false);
    }
  };

  const handleDeliveryConfirmation = async () => {
    if (!order) return;

    try {
      const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3002';
      
      const response = await fetch(`${adminApiUrl}/api/order-tracking`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: order._id,
          status: 'delivered',
          changedBy: 'customer'
        })
      });

      const result = await response.json();
      
      if (result.success) {
        // Refresh tracking data
        const orderNumber = searchParams.get('orderNumber');
        const email = searchParams.get('email');
        if (orderNumber && email) {
          await fetchOrderTracking(orderNumber, email);
        }
      } else {
        alert(result.error || 'Failed to confirm delivery');
      }
    } catch (error) {
      console.error('Error confirming delivery:', error);
      alert('Failed to confirm delivery');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <NavigationWrapper>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading order tracking...</p>
            </div>
          </div>
        </NavigationWrapper>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <NavigationWrapper>
          <div className="container mx-auto px-4 py-24">
            <div className="max-w-md mx-auto text-center">
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Error</h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => window.history.back()}
                className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700"
              >
                Go Back
              </button>
            </div>
          </div>
        </NavigationWrapper>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <NavigationWrapper>
          <div className="container mx-auto px-4 py-24">
            <div className="max-w-md mx-auto text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h1>
              <p className="text-gray-600 mb-6">The order you're looking for doesn't exist or you don't have permission to view it.</p>
              <button
                onClick={() => window.history.back()}
                className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700"
              >
                Go Back
              </button>
            </div>
          </div>
        </NavigationWrapper>
      </main>
    );
  }

  const currentStatus = statusConfig[order.status];
  const StatusIcon = currentStatus.icon;

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <NavigationWrapper>
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Order Tracking</h1>
                  <p className="text-gray-600">Order #{order.orderNumber}</p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full ${currentStatus.bgColor} ${currentStatus.color}`}>
                    <StatusIcon className="h-4 w-4 mr-2" />
                    <span className="font-medium">{currentStatus.label}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{currentStatus.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Details */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-800">{order.customerInfo.name}</div>
                      <div className="text-sm text-gray-600">Customer</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-800">{order.customerInfo.email}</div>
                      <div className="text-sm text-gray-600">Email</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-800">{order.customerInfo.phone}</div>
                      <div className="text-sm text-gray-600">Phone</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {order.orderType === 'pickup' ? <Home className="h-5 w-5 text-gray-500" /> : <Truck className="h-5 w-5 text-gray-500" />}
                    <div>
                      <div className="font-medium text-gray-800">
                        {order.orderType === 'pickup' ? 'Pickup' : 'Delivery'}
                      </div>
                      <div className="text-sm text-gray-600">Order Type</div>
                    </div>
                  </div>
                  
                  {order.customerInfo.address && (
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                      <div>
                        <div className="font-medium text-gray-800">{order.customerInfo.address}</div>
                        <div className="text-sm text-gray-600">Delivery Address</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total</span>
                    <span className="text-2xl font-bold text-amber-600">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Items</h2>
                
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{item.name}</div>
                        <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Timeline</h2>
              
              <div className="space-y-4">
                {tracking.map((entry, index) => {
                  const entryStatus = statusConfig[entry.status];
                  const EntryIcon = entryStatus.icon;
                  const isLast = index === tracking.length - 1;
                  
                  return (
                    <div key={entry._id} className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full ${entryStatus.bgColor} flex items-center justify-center`}>
                        <EntryIcon className={`h-4 w-4 ${entryStatus.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-gray-800">{entryStatus.label}</div>
                          <div className="text-sm text-gray-500">
                            {formatDate(entry.statusChangedAt)}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {entryStatus.description}
                        </div>
                        {entry.adminNotes && (
                          <div className="mt-2 p-2 bg-blue-50 rounded-lg text-sm text-blue-800">
                            <strong>Admin Note:</strong> {entry.adminNotes}
                          </div>
                        )}
                        {entry.customerNotes && (
                          <div className="mt-2 p-2 bg-green-50 rounded-lg text-sm text-green-800">
                            <strong>Your Note:</strong> {entry.customerNotes}
                          </div>
                        )}
                      </div>
                      {!isLast && (
                        <div className="absolute left-4 top-8 w-0.5 h-8 bg-gray-200"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Confirmation */}
            {order.status === 'ready' && order.orderType === 'delivery' && (
              <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Ready!</h3>
                  <p className="text-gray-600 mb-4">
                    Your order is ready for delivery. Please confirm when you receive it.
                  </p>
                  <button
                    onClick={handleDeliveryConfirmation}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Confirm Delivery
                  </button>
                </div>
              </div>
            )}

            {/* Pickup Confirmation */}
            {order.status === 'ready' && order.orderType === 'pickup' && (
              <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Ready for Pickup!</h3>
                  <p className="text-gray-600 mb-4">
                    Your order is ready for pickup. Please come to our location to collect it.
                  </p>
                  <button
                    onClick={handleDeliveryConfirmation}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Confirm Pickup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </NavigationWrapper>
    </main>
  );
}
