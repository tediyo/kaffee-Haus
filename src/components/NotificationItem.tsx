'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, Coffee } from 'lucide-react';
import { Notification } from '@/types/notification';

interface NotificationItemProps {
  notification: Notification;
  onRemove: (id: string) => void;
  onMarkAsRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onRemove,
  onMarkAsRead,
}) => {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (notification.duration > 0 && notification.showProgress) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - (100 / (notification.duration / 100));
          if (newProgress <= 0) {
            onRemove(notification.id);
            return 0;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [notification.duration, notification.showProgress, notification.id, onRemove]);

  const getIcon = () => {
    if (notification.icon) return notification.icon;
    
    const iconProps = { className: "h-5 w-5" };
    
    switch (notification.type) {
      case 'success':
        return <CheckCircle {...iconProps} />;
      case 'error':
        return <AlertCircle {...iconProps} />;
      case 'warning':
        return <AlertTriangle {...iconProps} />;
      case 'info':
        return <Info {...iconProps} />;
      default:
        return <Coffee {...iconProps} />;
    }
  };

  const getColors = () => {
    if (notification.customColor) {
      return {
        bg: notification.customColor,
        text: 'text-white',
        border: 'border-transparent',
      };
    }

    const colorMap = {
      success: {
        bg: 'bg-green-500',
        text: 'text-white',
        border: 'border-green-600',
      },
      error: {
        bg: 'bg-red-500',
        text: 'text-white',
        border: 'border-red-600',
      },
      warning: {
        bg: 'bg-yellow-500',
        text: 'text-white',
        border: 'border-yellow-600',
      },
      info: {
        bg: 'bg-blue-500',
        text: 'text-white',
        border: 'border-blue-600',
      },
      custom: {
        bg: 'bg-amber-500',
        text: 'text-white',
        border: 'border-amber-600',
      },
    };

    return colorMap[notification.type];
  };

  const colors = getColors();

  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(notification.id);
  };

  return (
    <div
      className={`
        relative max-w-sm w-full bg-white rounded-xl shadow-2xl border-2 ${colors.border} 
        transform transition-all duration-300 ease-out cursor-pointer
        hover:shadow-3xl hover:scale-105
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${notification.read ? 'opacity-75' : 'opacity-100'}
      `}
      onClick={handleClick}
    >
      {/* Progress bar */}
      {notification.showProgress && notification.duration > 0 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-t-xl overflow-hidden">
          <div
            className={`h-full ${colors.bg} transition-all duration-100 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Header */}
      <div className={`p-4 ${colors.bg} rounded-t-xl`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full bg-white/20 ${colors.text}`}>
              {getIcon()}
            </div>
            <div>
              <h4 className={`font-bold text-lg ${colors.text}`}>
                {notification.title}
              </h4>
              <p className={`text-sm ${colors.text} opacity-90`}>
                {notification.message}
              </p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className={`p-1 rounded-full hover:bg-white/20 transition-colors ${colors.text}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Actions */}
      {notification.actions && notification.actions.length > 0 && (
        <div className="p-4 bg-gray-50 rounded-b-xl">
          <div className="flex space-x-2">
            {notification.actions.map((action, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  action.action();
                }}
                className={`
                  px-3 py-1 rounded-lg text-sm font-medium transition-colors
                  ${action.variant === 'danger' 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : action.variant === 'secondary'
                    ? 'bg-gray-500 text-white hover:bg-gray-600'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                  }
                `}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Unread indicator */}
      {!notification.read && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
      )}
    </div>
  );
};

export default NotificationItem;
