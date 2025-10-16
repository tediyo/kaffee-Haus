'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Package, Clock, CheckCircle, XCircle, Coffee, AlertCircle, MapPin, User, Phone, Mail, Truck, Home, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderNumber?: string;
  initialEmail?: string;
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

export default function OrderTrackingModal({ isOpen, onClose, initialOrderNumber, initialEmail }: OrderTrackingModalProps) {
  const [mounted, setMounted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [tracking, setTracking] = useState<OrderTracking[]>([]);
  const [confirmingDelivery, setConfirmingDelivery] = useState(false);
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prefill fields when modal opens
  useEffect(() => {
    if (isOpen) {
      setOrderNumber(initialOrderNumber || '');
      setEmail(initialEmail || '');
      setError('');
      setSuccessMessage('');
      setOrder(null);
      setTracking([]);
      
      // Auto-fetch if both fields are filled
      if (initialOrderNumber && initialEmail) {
        handleTrackOrder();
      }
    }
  }, [isOpen, initialOrderNumber, initialEmail]);

  const handleTrackOrder = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!orderNumber.trim() || !email.trim()) {
      setError('Please enter both order number and email');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3002';
      
      const response = await fetch(`${adminApiUrl}/api/order-tracking?orderNumber=${encodeURIComponent(orderNumber.trim())}&email=${encodeURIComponent(email.trim())}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      
      if (result.success) {
        setOrder(result.data.order);
        setTracking(result.data.tracking);
        setSuccessMessage('Order found successfully!');
      } else {
        setError(result.error || 'Order not found');
      }
    } catch (error) {
      console.error('Error fetching order tracking:', error);
      setError('Failed to fetch order details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeliveryConfirmation = async () => {
    if (!order) return;

    try {
      setConfirmingDelivery(true);
      setError('');
      setSuccessMessage('');

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
        setSuccessMessage('Order confirmed as delivered! Thank you for your order.');
        
        // Refresh tracking data
        await handleTrackOrder();
      } else {
        setError(result.error || 'Failed to confirm delivery');
      }
    } catch (error) {
      console.error('Error confirming delivery:', error);
      setError('Failed to confirm delivery. Please try again.');
    } finally {
      setConfirmingDelivery(false);
    }
  };

  const handleClose = () => {
    setOrderNumber('');
    setEmail('');
    setError('');
    setSuccessMessage('');
    setOrder(null);
    setTracking([]);
    onClose();
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

  if (!isOpen || !mounted) return null;

  const currentStatus = order ? statusConfig[order.status] : null;
  const StatusIcon = currentStatus?.icon;

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[9999] backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-amber-200/30">
        {/* Coffee Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-200/20 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-amber-300/10 rounded-full -translate-x-8 -translate-y-8"></div>
        </div>
        
        {/* Coffee Bean Decoration */}
        <div className="absolute top-4 right-4 text-amber-300/30 animate-float">
          <Package className="h-8 w-8" />
        </div>
        
        <div className="p-6 border-b border-amber-200/30 relative">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Track Your Order</h3>
                <p className="text-sm text-amber-600 font-medium">
                  {order ? `Order #${order.orderNumber}` : 'Enter your order details to track your order status'}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 relative">
          {/* Search Form */}
          {!order && (
            <form onSubmit={handleTrackOrder} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm flex items-center space-x-2 animate-shake">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Order Number
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500 group-focus-within:text-amber-600 transition-colors" />
                    <input
                      type="text"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/60 backdrop-blur-sm"
                      placeholder="e.g., #ORD-008"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500 group-focus-within:text-amber-600 transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/60 backdrop-blur-sm"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-6 rounded-xl hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Track Order</span>
                  </div>
                )}
              </button>
            </form>
          )}

          {/* Order Details */}
          {order && (
            <>
              {/* Success Message */}
              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="text-green-800 font-medium">{successMessage}</p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <p className="text-red-800 font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Order Status */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200/50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Order Status</h2>
                    <p className="text-gray-600">Order #{order.orderNumber}</p>
                  </div>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full ${currentStatus?.bgColor} ${currentStatus?.color}`}>
                    {StatusIcon && <StatusIcon className="h-4 w-4 mr-2" />}
                    <span className="font-medium">{currentStatus?.label}</span>
                  </div>
                </div>
                <p className="text-gray-600">{currentStatus?.description}</p>
              </div>

              {/* Order Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Customer Info */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200/50">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h3>
                  <div className="space-y-3">
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
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200/50">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>
                  
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

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">Total</span>
                      <span className="text-2xl font-bold text-amber-600">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200/50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Timeline</h3>
                
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

              {/* Delivery/Pickup Confirmation */}
              {order.status === 'ready' && (
                <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200/50">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Order Ready for {order.orderType === 'pickup' ? 'Pickup' : 'Delivery'}!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {order.orderType === 'pickup' 
                        ? 'Your order is ready for pickup. Please come to our location to collect it.'
                        : 'Your order is ready for delivery. Please confirm when you receive it.'
                      }
                    </p>
                    <button
                      onClick={handleDeliveryConfirmation}
                      disabled={confirmingDelivery}
                      className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 flex items-center space-x-2 mx-auto ${
                        order.orderType === 'pickup' 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-green-600 hover:bg-green-700'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {confirmingDelivery ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Confirming...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          <span>Confirm {order.orderType === 'pickup' ? 'Pickup' : 'Delivery'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => {
                    setOrder(null);
                    setTracking([]);
                    setOrderNumber('');
                    setEmail('');
                    setError('');
                    setSuccessMessage('');
                  }}
                  className="bg-white border-2 border-amber-500 text-amber-600 px-6 py-2 rounded-lg hover:bg-amber-50 transition-all duration-200 font-semibold"
                >
                  Track Another Order
                </button>
                <button
                  onClick={handleClose}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 font-semibold"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
