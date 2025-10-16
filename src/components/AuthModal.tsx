'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, User, Mail, Phone, MapPin, Lock, Eye, EyeOff, Coffee } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (token: string, customer: any) => void;
}

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check API connection when modal opens
  useEffect(() => {
    if (isOpen) {
      checkApiConnection();
    }
  }, [isOpen]);

  const checkApiConnection = async () => {
    try {
      const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3002';
      const response = await fetch(`${adminApiUrl}/api/health`, { 
        method: 'GET',
        signal: AbortSignal.timeout(3000) // 3 second timeout
      });
      setConnectionStatus(response.ok ? 'connected' : 'disconnected');
    } catch (error) {
      setConnectionStatus('disconnected');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3002';
      
      if (isLogin) {
        // Login
        const response = await fetch(`${adminApiUrl}/api/customers/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const result = await response.json();
        
        if (result.success) {
          onLogin(result.data.token, result.data.customer);
          onClose();
        } else {
          setError(result.error || 'Login failed');
        }
      } else {
        // Register
        const response = await fetch(`${adminApiUrl}/api/customers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const result = await response.json();
        
        if (result.success) {
          onLogin(result.data.token, result.data.customer);
          onClose();
        } else {
          setError(result.error || 'Registration failed');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        setError('Cannot connect to server. Please make sure the admin panel is running on port 3002.');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 bg-white/10 flex items-center justify-center p-4 z-[9999] backdrop-blur-md">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-amber-200/30">
        {/* Coffee Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-200/20 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-amber-300/10 rounded-full -translate-x-8 -translate-y-8"></div>
        </div>
        
        {/* Coffee Bean Decoration */}
        <div className="absolute top-4 right-4 text-amber-300/30 animate-float">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
          </svg>
        </div>
        
        {/* Additional Coffee Bean */}
        <div className="absolute bottom-4 left-4 text-amber-200/20 animate-float" style={{animationDelay: '1.5s'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
          </svg>
        </div>
        <div className="p-6 border-b border-amber-200/30 relative">
          {/* Coffee Steam Animation */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            <div className="w-1 h-4 bg-amber-300/40 rounded-full animate-coffee-steam"></div>
            <div className="w-1 h-6 bg-amber-400/50 rounded-full animate-coffee-steam" style={{animationDelay: '0.5s'}}></div>
            <div className="w-1 h-3 bg-amber-300/40 rounded-full animate-coffee-steam" style={{animationDelay: '1s'}}></div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                <Coffee className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {isLogin ? 'Welcome Back!' : 'Join Us!'}
                </h3>
                <p className="text-sm text-amber-600 font-medium">
                  {isLogin ? 'Sign in to continue your coffee journey' : 'Create your account to start ordering'}
                </p>
                {connectionStatus === 'disconnected' && (
                  <div className="mt-2 flex items-center space-x-2 text-xs text-red-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Server offline - Please start the admin panel</span>
                  </div>
                )}
                {connectionStatus === 'connected' && (
                  <div className="mt-2 flex items-center space-x-2 text-xs text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Server connected</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 relative">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm flex items-center space-x-2 animate-shake">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>{error}</span>
            </div>
          )}

          {!isLogin && (
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500 group-focus-within:text-amber-600 transition-colors" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/60 backdrop-blur-sm"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500 group-focus-within:text-amber-600 transition-colors" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500 group-focus-within:text-amber-600 transition-colors" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/60 backdrop-blur-sm"
                  placeholder="Enter your phone number"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500 group-focus-within:text-amber-600 transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/60 backdrop-blur-sm"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-500 hover:text-amber-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Delivery Address <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500 group-focus-within:text-amber-600 transition-colors" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/60 backdrop-blur-sm"
                  placeholder="Enter your delivery address"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-6 rounded-xl hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Coffee className="h-5 w-5" />
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              </div>
            )}
          </button>

          <div className="text-center pt-2">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-amber-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-amber-600 font-medium">or</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  password: '',
                  address: ''
                });
              }}
              className="mt-4 text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors hover:underline"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
