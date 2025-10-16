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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[9999] backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-hidden relative shadow-2xl border border-amber-200/50 animate-slideUp">
        {/* Professional Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 rounded-3xl overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-200/30 to-orange-300/20 rounded-full -translate-y-20 translate-x-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-200/30 to-amber-300/20 rounded-full translate-y-16 -translate-x-16 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-br from-amber-300/20 to-orange-400/10 rounded-full -translate-x-10 -translate-y-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Animated Coffee Bean Decoration */}
        <div className="absolute top-6 right-6 text-amber-400/40 animate-float">
          <Package className="h-10 w-10" />
        </div>
        <div className="absolute bottom-6 left-6 text-orange-400/30 animate-float" style={{animationDelay: '1.5s'}}>
          <Coffee className="h-8 w-8" />
        </div>
        
         <div className="p-6 border-b border-amber-200/30 relative bg-white">
           <div className="flex justify-between items-center">
             <div className="flex items-center space-x-3">
               <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                 <Package className="h-5 w-5 text-white" />
               </div>
               <div>
                 <h3 className="text-xl font-bold text-gray-800">
                   Order Tracking
                 </h3>
                 <p className="text-sm text-amber-600 font-medium">
                   {order ? `Order #${order.orderNumber}` : 'Enter your order details to track your order status'}
                 </p>
                 {order && (
                   <div className="mt-1 flex items-center space-x-2">
                     <div className={`px-2 py-1 rounded-full text-xs font-semibold ${currentStatus?.bgColor} ${currentStatus?.color}`}>
                       {currentStatus?.label}
                     </div>
                     <div className="text-xs text-gray-500">
                       {formatDate(order.orderTime)}
                     </div>
                   </div>
                 )}
               </div>
             </div>
             <button
               onClick={handleClose}
               className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-all duration-200"
             >
               <X className="h-5 w-5" />
             </button>
           </div>
         </div>

         <div className="p-6 space-y-6 relative">
           {/* Search Form */}
           {!order && (
             <div className="bg-white rounded-xl p-6 border border-amber-200/50 shadow-md">
               <div className="text-center mb-6">
                 <h4 className="text-lg font-bold text-gray-800 mb-2">Find Your Order</h4>
                 <p className="text-gray-600 text-sm">Enter your order details to track your order status</p>
               </div>
              
               <form onSubmit={handleTrackOrder} className="space-y-4">
                 {error && (
                   <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-3 text-red-700 text-sm flex items-center space-x-2 animate-shake">
                     <AlertCircle className="h-4 w-4 flex-shrink-0" />
                     <span className="font-medium">{error}</span>
                   </div>
                 )}

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="group">
                     <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                       <Package className="h-4 w-4 text-amber-500" />
                       <span>Order Number</span>
                     </label>
                     <div className="relative">
                       <input
                         type="text"
                         value={orderNumber}
                         onChange={(e) => setOrderNumber(e.target.value)}
                         className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 bg-white text-sm font-medium"
                         placeholder="e.g., #ORD-008"
                         required
                       />
                       <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500 group-focus-within:text-amber-600 transition-colors" />
                     </div>
                   </div>

                   <div className="group">
                     <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                       <Search className="h-4 w-4 text-amber-500" />
                       <span>Email Address</span>
                     </label>
                     <div className="relative">
                       <input
                         type="email"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 bg-white text-sm font-medium"
                         placeholder="Enter your email address"
                         required
                       />
                       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500 group-focus-within:text-amber-600 transition-colors" />
                     </div>
                   </div>
                 </div>

                 <button
                   type="submit"
                   disabled={loading}
                   className="w-full gradient-primary text-white py-3 px-6 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-sm hover-lift"
                 >
                   {loading ? (
                     <div className="flex items-center justify-center space-x-2">
                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                       <span>Searching...</span>
                     </div>
                   ) : (
                     <div className="flex items-center justify-center space-x-2">
                       <Package className="h-4 w-4" />
                       <span>Track My Order</span>
                     </div>
                   )}
                 </button>
               </form>
            </div>
          )}

          {/* Order Details */}
          {order && (
            <>
               {/* Success Message */}
               {successMessage && (
                 <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4 shadow-md animate-bounce">
                   <div className="flex items-center space-x-2">
                     <CheckCircle className="h-5 w-5 text-green-600" />
                     <div>
                       <p className="text-green-800 font-semibold text-sm">{successMessage}</p>
                       <p className="text-green-600 text-xs">Your order status has been updated</p>
                     </div>
                   </div>
                 </div>
               )}

               {/* Error Message */}
               {error && (
                 <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4 shadow-md animate-shake">
                   <div className="flex items-center space-x-2">
                     <AlertCircle className="h-5 w-5 text-red-600" />
                     <div>
                       <p className="text-red-800 font-semibold text-sm">{error}</p>
                       <p className="text-red-600 text-xs">Please try again or contact support</p>
                     </div>
                   </div>
                 </div>
               )}

               {/* Order Status Card */}
               <div className="bg-white rounded-lg shadow-md p-4 border border-amber-200/50">
                 <div className="flex items-center justify-between mb-3">
                   <div>
                     <h2 className="text-lg font-bold text-gray-800">Order Status</h2>
                     <p className="text-gray-600 text-sm">Order #{order.orderNumber}</p>
                   </div>
                   <div className={`inline-flex items-center px-3 py-2 rounded-lg ${currentStatus?.bgColor} ${currentStatus?.color} shadow-sm`}>
                     {StatusIcon && <StatusIcon className="h-4 w-4 mr-2" />}
                     <span className="font-semibold text-sm">{currentStatus?.label}</span>
                   </div>
                 </div>
                 <div className="bg-gray-50 rounded-lg p-3">
                   <p className="text-gray-700 text-sm font-medium">{currentStatus?.description}</p>
                 </div>
               </div>

               {/* Order Details Grid */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                 {/* Customer Info */}
                 <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                   <div className="flex items-center space-x-2 mb-4">
                     <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                       <User className="h-4 w-4 text-blue-600" />
                     </div>
                     <h3 className="text-lg font-bold text-gray-800">Customer Information</h3>
                   </div>
                   <div className="space-y-3">
                     <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                       <User className="h-4 w-4 text-blue-500" />
                       <div>
                         <div className="font-semibold text-gray-800 text-sm">{order.customerInfo.name}</div>
                         <div className="text-xs text-blue-600 font-medium">Customer Name</div>
                       </div>
                     </div>
                     
                     <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                       <Mail className="h-4 w-4 text-blue-500" />
                       <div>
                         <div className="font-semibold text-gray-800 text-sm">{order.customerInfo.email}</div>
                         <div className="text-xs text-blue-600 font-medium">Email Address</div>
                       </div>
                     </div>
                     
                     <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                       <Phone className="h-4 w-4 text-blue-500" />
                       <div>
                         <div className="font-semibold text-gray-800 text-sm">{order.customerInfo.phone}</div>
                         <div className="text-xs text-blue-600 font-medium">Phone Number</div>
                       </div>
                     </div>
                     
                     <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                       {order.orderType === 'pickup' ? <Home className="h-4 w-4 text-blue-500" /> : <Truck className="h-4 w-4 text-blue-500" />}
                       <div>
                         <div className="font-semibold text-gray-800 text-sm">
                           {order.orderType === 'pickup' ? 'Pickup' : 'Delivery'}
                         </div>
                         <div className="text-xs text-blue-600 font-medium">Order Type</div>
                       </div>
                     </div>
                     
                     {order.customerInfo.address && (
                       <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                         <MapPin className="h-4 w-4 text-blue-500 mt-1" />
                         <div>
                           <div className="font-semibold text-gray-800 text-sm">{order.customerInfo.address}</div>
                           <div className="text-xs text-blue-600 font-medium">Delivery Address</div>
                         </div>
                       </div>
                     )}
                   </div>
                 </div>

                 {/* Order Items */}
                 <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                   <div className="flex items-center space-x-2 mb-4">
                     <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                       <Package className="h-4 w-4 text-amber-600" />
                     </div>
                     <h3 className="text-lg font-bold text-gray-800">Order Items</h3>
                   </div>
                   
                   <div className="space-y-3">
                     {order.items.map((item, index) => (
                       <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                         <img
                           src={item.image}
                           alt={item.name}
                           className="w-12 h-12 rounded-lg object-cover"
                         />
                         <div className="flex-1">
                           <div className="font-semibold text-gray-800 text-sm">{item.name}</div>
                           <div className="text-xs text-amber-600 font-medium">Qty: {item.quantity}</div>
                         </div>
                         <div className="text-right">
                           <div className="font-semibold text-gray-800 text-sm">
                             ${(item.price * item.quantity).toFixed(2)}
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>

                   <div className="mt-4 pt-4 border-t border-gray-200">
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
               <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                 <div className="flex items-center space-x-2 mb-4">
                   <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                     <Clock className="h-4 w-4 text-green-600" />
                   </div>
                   <h3 className="text-lg font-bold text-gray-800">Order Timeline</h3>
                 </div>
                 
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
                 <div className="bg-white rounded-lg shadow-md p-6 border border-amber-200/50">
                   <div className="text-center">
                     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                       <CheckCircle className="h-8 w-8 text-green-600" />
                     </div>
                     <h3 className="text-xl font-semibold text-gray-800 mb-2">
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
               <div className="flex items-center justify-center space-x-4 pt-4">
                 <button
                   onClick={() => {
                     setOrder(null);
                     setTracking([]);
                     setOrderNumber('');
                     setEmail('');
                     setError('');
                     setSuccessMessage('');
                   }}
                   className="bg-white border-2 border-amber-500 text-amber-600 px-6 py-2 rounded-lg hover:bg-amber-50 transition-all duration-200 font-semibold text-sm"
                 >
                   <div className="flex items-center space-x-2">
                     <Search className="h-4 w-4" />
                     <span>Track Another Order</span>
                   </div>
                 </button>
                 <button
                   onClick={handleClose}
                   className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 font-semibold text-sm"
                 >
                   <div className="flex items-center space-x-2">
                     <X className="h-4 w-4" />
                     <span>Close</span>
                   </div>
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
