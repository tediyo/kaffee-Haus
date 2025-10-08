'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { useNotifications } from '@/contexts/NotificationContext';
import { Coffee, CheckCircle, AlertCircle, AlertTriangle, Info, Star, Heart, Gift, Bell } from 'lucide-react';
import { 
  createOrderNotification, 
  createLoyaltyPointsNotification, 
  createSpecialOfferNotification,
  createPaymentErrorNotification,
  createNewMenuNotification,
  createStoreHoursNotification,
  createWelcomeNotification
} from '@/utils/notificationHelpers';

export default function NotificationsDemoPage() {
  const { addNotification } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);

  const demoNotifications = [
    {
      type: 'success' as const,
      title: 'Order Confirmed!',
      message: 'Your coffee order has been confirmed and will be ready in 5 minutes.',
      icon: <Coffee className="h-5 w-5" />,
      actions: [
        {
          label: 'Track Order',
          action: () => console.log('Track order clicked'),
          variant: 'primary' as const,
        },
      ],
    },
    {
      type: 'info' as const,
      title: 'New Menu Item',
      message: 'Try our new seasonal pumpkin spice latte - available for a limited time!',
      icon: <Star className="h-5 w-5" />,
      actions: [
        {
          label: 'View Menu',
          action: () => console.log('View menu clicked'),
          variant: 'primary' as const,
        },
      ],
    },
    {
      type: 'warning' as const,
      title: 'Store Hours Change',
      message: 'We will be closing early today at 6 PM due to a private event.',
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      type: 'error' as const,
      title: 'Payment Failed',
      message: 'Your payment could not be processed. Please try again with a different card.',
      icon: <AlertCircle className="h-5 w-5" />,
      actions: [
        {
          label: 'Retry Payment',
          action: () => console.log('Retry payment clicked'),
          variant: 'danger' as const,
        },
        {
          label: 'Change Card',
          action: () => console.log('Change card clicked'),
          variant: 'secondary' as const,
        },
      ],
    },
    {
      type: 'custom' as const,
      title: 'Special Offer!',
      message: 'Get 20% off your next order with code COFFEE20. Valid until end of month.',
      icon: <Gift className="h-5 w-5" />,
      customColor: '#8B5CF6',
      actions: [
        {
          label: 'Use Code',
          action: () => console.log('Use code clicked'),
          variant: 'primary' as const,
        },
      ],
    },
  ];

  const handleNotificationDemo = (notification: any) => {
    addNotification({
      ...notification,
      duration: 8000,
      showProgress: true,
    });
  };

  const handleAsyncDemo = async () => {
    setIsLoading(true);
    
    // Simulate async operation
    addNotification({
      type: 'info',
      title: 'Processing...',
      message: 'Please wait while we process your request.',
      icon: <Bell className="h-5 w-5" />,
      duration: 0, // Persistent until manually closed
    });

    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsLoading(false);
    
    addNotification({
      type: 'success',
      title: 'Process Complete!',
      message: 'Your request has been processed successfully.',
      icon: <CheckCircle className="h-5 w-5" />,
      duration: 5000,
    });
  };

  const handleBulkNotifications = () => {
    const bulkNotifications = [
      createWelcomeNotification('John'),
      createLoyaltyPointsNotification(50),
      createNewMenuNotification('Pumpkin Spice Latte'),
      createSpecialOfferNotification('20% off your next order', 'COFFEE20'),
    ];

    bulkNotifications.forEach((notification, index) => {
      setTimeout(() => {
        addNotification(notification);
      }, index * 1000);
    });
  };

  const handleCoffeeShopDemos = () => {
    const coffeeShopNotifications = [
      createOrderNotification('12345'),
      createPaymentErrorNotification(),
      createStoreHoursNotification('We will be closing early today at 6 PM due to a private event.'),
    ];

    coffeeShopNotifications.forEach((notification, index) => {
      setTimeout(() => {
        addNotification(notification);
      }, index * 2000);
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-amber-100 rounded-full px-6 py-3 text-amber-800 mb-6">
              <Bell className="h-5 w-5" />
              <span className="font-medium">Notification System Demo</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Customize Your{' '}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Notifications
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Experience our comprehensive notification system with customizable settings, 
              different types, and smooth animations.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Notification Types */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-amber-200/50">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Notification Types</h2>
              <p className="text-gray-600 mb-8">
                Click any button below to see different notification types in action.
              </p>
              
              <div className="space-y-4">
                {demoNotifications.map((notification, index) => (
                  <button
                    key={index}
                    onClick={() => handleNotificationDemo(notification)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                      notification.type === 'success' 
                        ? 'border-green-200 bg-green-50 hover:bg-green-100 text-green-800'
                        : notification.type === 'error'
                        ? 'border-red-200 bg-red-50 hover:bg-red-100 text-red-800'
                        : notification.type === 'warning'
                        ? 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100 text-yellow-800'
                        : notification.type === 'info'
                        ? 'border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800'
                        : 'border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {notification.icon}
                      <div className="text-left">
                        <h3 className="font-bold">{notification.title}</h3>
                        <p className="text-sm opacity-80">{notification.message}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Demos */}
            <div className="space-y-8">
              {/* Async Demo */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-amber-200/50">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Async Operations</h3>
                <p className="text-gray-600 mb-6">
                  Simulate real-world async operations with progress notifications.
                </p>
                <button
                  onClick={handleAsyncDemo}
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 ${
                    isLoading
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Start Async Demo'
                  )}
                </button>
              </div>

              {/* Bulk Notifications */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-amber-200/50">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Bulk Notifications</h3>
                <p className="text-gray-600 mb-6">
                  See how multiple notifications are handled with staggered timing.
                </p>
                <button
                  onClick={handleBulkNotifications}
                  className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105"
                >
                  Send Bulk Notifications
                </button>
              </div>

              {/* Coffee Shop Demos */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-amber-200/50">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Coffee Shop Scenarios</h3>
                <p className="text-gray-600 mb-6">
                  Real-world notification examples for a coffee shop experience.
                </p>
                <button
                  onClick={handleCoffeeShopDemos}
                  className="w-full py-4 px-6 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105"
                >
                  Coffee Shop Demo
                </button>
              </div>

              {/* Customization Info */}
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8 border border-amber-200/50">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Customization Features</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Multiple notification types (success, error, warning, info, custom)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Customizable positions and durations</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Action buttons and custom icons</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Sound and vibration settings</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Progress bars and auto-close options</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Persistent storage and settings</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Notification Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our notification system provides a comprehensive solution for user feedback and engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Smart Notifications</h3>
              <p className="text-gray-600">
                Intelligent notification management with auto-close, progress tracking, and smart positioning.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Customizable Settings</h3>
              <p className="text-gray-600">
                Full control over notification behavior, appearance, and user preferences with persistent storage.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">User Experience</h3>
              <p className="text-gray-600">
                Smooth animations, accessibility features, and responsive design for the best user experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
