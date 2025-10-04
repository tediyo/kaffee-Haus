'use client';

import { Coffee, Star, Heart, Share2, Clock, MapPin, Phone } from 'lucide-react';
import CommonModal, { ModalButton } from './CommonModal';

interface InteractiveModalNewProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'coffee' | 'location' | 'contact' | 'special';
  data?: any;
}

const InteractiveModalNew = ({ isOpen, onClose, type, data }: InteractiveModalNewProps) => {
  const renderContent = () => {
    switch (type) {
      case 'coffee':
        return (
          <div className="space-y-6 p-6">
            <div className="text-center">
              <div className="text-6xl mb-4">☕</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Premium Coffee</h3>
              <p className="text-gray-600">Sourced from the finest coffee regions worldwide</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <Coffee className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-800">Fresh Roasted</p>
                <p className="text-sm text-gray-600">Daily</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <Star className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-800">Premium Quality</p>
                <p className="text-sm text-gray-600">4.9/5 Rating</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-bold text-gray-800">Our Coffee Process:</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Carefully selected beans from sustainable farms</p>
                <p>• Roasted to perfection in small batches</p>
                <p>• Ground fresh for each order</p>
                <p>• Brewed by expert baristas</p>
              </div>
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-6 p-6">
            <div className="text-center">
              <div className="text-6xl mb-4">📍</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Visit Our Shop</h3>
              <p className="text-gray-600">Located in the heart of downtown</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-amber-50 rounded-xl">
                <MapPin className="h-6 w-6 text-amber-600" />
                <div>
                  <p className="font-semibold text-gray-800">123 Coffee Street</p>
                  <p className="text-gray-600">Downtown District, City, State 12345</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-amber-50 rounded-xl">
                <Clock className="h-6 w-6 text-amber-600" />
                <div>
                  <p className="font-semibold text-gray-800">Hours</p>
                  <p className="text-gray-600">Mon-Fri: 6AM-8PM, Sat-Sun: 7AM-9PM</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-amber-50 rounded-xl">
                <Phone className="h-6 w-6 text-amber-600" />
                <div>
                  <p className="font-semibold text-gray-800">Phone</p>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6 p-6">
            <div className="text-center">
              <div className="text-6xl mb-4">📞</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Get in Touch</h3>
              <p className="text-gray-600">We'd love to hear from you</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl">
                <Phone className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-800">Call Us</p>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl">
                <Heart className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-800">Email Us</p>
                  <p className="text-gray-600">hello@kaffeehaus.com</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'special':
        return (
          <div className="space-y-6 p-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Special Offers</h3>
              <p className="text-gray-600">Limited time deals and promotions</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                <h4 className="font-bold text-amber-800 mb-2">20% Off First Order</h4>
                <p className="text-amber-700 text-sm">Use code WELCOME20 for new customers</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <h4 className="font-bold text-green-800 mb-2">Free Delivery</h4>
                <p className="text-green-700 text-sm">On orders over $25 within 5 miles</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getModalConfig = () => {
    switch (type) {
      case 'coffee':
        return {
          title: 'Premium Coffee',
          subtitle: 'Sourced from the finest coffee regions worldwide',
          icon: <Coffee className="h-6 w-6" />,
          headerColor: 'amber' as const,
          buttons: [
            {
              text: 'Learn More',
              onClick: () => console.log('Learn more clicked'),
              variant: 'primary' as const,
              icon: <Coffee className="h-4 w-4" />
            },
            {
              text: 'Share',
              onClick: () => console.log('Share clicked'),
              variant: 'secondary' as const,
              icon: <Share2 className="h-4 w-4" />
            }
          ]
        };
      case 'location':
        return {
          title: 'Visit Our Shop',
          subtitle: 'Located in the heart of downtown',
          icon: <MapPin className="h-6 w-6" />,
          headerColor: 'blue' as const,
          buttons: [
            {
              text: 'Get Directions',
              onClick: () => console.log('Get directions clicked'),
              variant: 'primary' as const,
              icon: <MapPin className="h-4 w-4" />
            }
          ]
        };
      case 'contact':
        return {
          title: 'Get in Touch',
          subtitle: 'We\'d love to hear from you',
          icon: <Phone className="h-6 w-6" />,
          headerColor: 'green' as const,
          buttons: [
            {
              text: 'Call Now',
              onClick: () => console.log('Call now clicked'),
              variant: 'primary' as const,
              icon: <Phone className="h-4 w-4" />
            }
          ]
        };
      case 'special':
        return {
          title: 'Special Offers',
          subtitle: 'Limited time deals and promotions',
          icon: <Star className="h-6 w-6" />,
          headerColor: 'orange' as const,
          buttons: [
            {
              text: 'View All Offers',
              onClick: () => console.log('View all offers clicked'),
              variant: 'primary' as const,
              icon: <Star className="h-4 w-4" />
            }
          ]
        };
      default:
        return {
          title: 'Modal',
          subtitle: '',
          icon: null,
          headerColor: 'amber' as const,
          buttons: []
        };
    }
  };

  const config = getModalConfig();

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={config.title}
      subtitle={config.subtitle}
      icon={config.icon}
      size="md"
      headerColor={config.headerColor}
      buttons={config.buttons}
    >
      {renderContent()}
    </CommonModal>
  );
};

export default InteractiveModalNew;
