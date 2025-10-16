'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Package, Search, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderNumber?: string;
  initialEmail?: string;
}

export default function TrackOrderModal({ isOpen, onClose, initialOrderNumber, initialEmail }: TrackOrderModalProps) {
  const [mounted, setMounted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prefill fields when modal opens
  useEffect(() => {
    if (isOpen) {
      setOrderNumber(initialOrderNumber || '');
      setEmail(initialEmail || '');
      setError('');
    }
  }, [isOpen, initialOrderNumber, initialEmail]);

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderNumber.trim() || !email.trim()) {
      setError('Please enter both order number and email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Navigate to order tracking page with parameters
      const params = new URLSearchParams({
        orderNumber: orderNumber.trim(),
        email: email.trim()
      });
      
      router.push(`/order-tracking?${params.toString()}`);
      onClose();
    } catch (error) {
      console.error('Error tracking order:', error);
      setError('Failed to track order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOrderNumber('');
    setEmail('');
    setError('');
    onClose();
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[9999] backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-amber-200/30">
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
                  Enter your order details to track your order status
                </p>
                {initialOrderNumber && (
                  <p className="text-xs text-gray-500 mt-1">Recent Order: <span className="font-semibold">{initialOrderNumber}</span></p>
                )}
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

        <form onSubmit={handleTrackOrder} className="p-6 space-y-5 relative">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm flex items-center space-x-2 animate-shake">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

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
                placeholder="e.g., #ORD-001"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-6 rounded-xl hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Tracking...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Track Order</span>
              </div>
            )}
          </button>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-500">
              Don't have your order details? Check your email for the order confirmation.
            </p>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
