'use client';

import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalButton {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  icon?: ReactNode;
  disabled?: boolean;
}

export interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  headerColor?: 'amber' | 'blue' | 'green' | 'red' | 'purple' | 'gray' | 'orange';
  buttons?: ModalButton[];
  showHeader?: boolean;
  className?: string;
  maxHeight?: string;
}

const CommonModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  headerColor = 'amber',
  buttons = [],
  showHeader = true,
  className = '',
  maxHeight = '90vh'
}: CommonModalProps) => {
  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl'
  };

  const headerColorClasses = {
    amber: 'from-amber-600 to-orange-600',
    blue: 'from-blue-600 to-indigo-600',
    green: 'from-green-600 to-emerald-600',
    red: 'from-red-600 to-pink-600',
    purple: 'from-purple-600 to-violet-600',
    gray: 'from-gray-600 to-gray-700',
    orange: 'from-orange-600 to-red-600'
  };

  const buttonVariantClasses = {
    primary: 'bg-amber-600 hover:bg-amber-700 text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      
      {/* Modal Container */}
      <div className={`relative bg-white rounded-3xl w-full ${sizeClasses[size]} max-h-[${maxHeight}] overflow-hidden shadow-2xl ${className}`}>
        {/* Header */}
        {showHeader && (title || subtitle || icon) && (
          <div className={`bg-gradient-to-r ${headerColorClasses[headerColor]} p-6 text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {icon && (
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    {icon}
                  </div>
                )}
                <div>
                  {title && (
                    <h2 className="text-2xl font-bold">{title}</h2>
                  )}
                  {subtitle && (
                    <p className="text-white/90 text-sm mt-1">{subtitle}</p>
                  )}
                </div>
              </div>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: `calc(${maxHeight} - ${showHeader ? '120px' : '0px'})` }}>
          {children}
        </div>

        {/* Footer with Buttons */}
        {buttons.length > 0 && (
          <div className="p-6 bg-gray-50 border-t">
            <div className="flex space-x-3 justify-end">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={button.onClick}
                  disabled={button.disabled}
                  className={`px-6 py-3 rounded-xl font-semibold transition-colors flex items-center space-x-2 ${
                    buttonVariantClasses[button.variant || 'primary']
                  } ${button.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {button.icon && <span>{button.icon}</span>}
                  <span>{button.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonModal;
