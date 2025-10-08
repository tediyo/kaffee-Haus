'use client';

import React, { useState } from 'react';
import { Bell, Settings, Trash2, CheckCircle, AlertCircle, AlertTriangle, Info, Coffee, X } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import NotificationSettings from './NotificationSettings';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { notifications, markAsRead, markAllAsRead, clearAll, getUnreadCount } = useNotifications();
  const [showSettings, setShowSettings] = useState(false);

  const getIcon = (type: string) => {
    const iconProps = { className: "h-4 w-4" };
    switch (type) {
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

  const getTypeColor = (type: string) => {
    const colorMap = {
      success: 'text-green-600 bg-green-100',
      error: 'text-red-600 bg-red-100',
      warning: 'text-yellow-600 bg-yellow-100',
      info: 'text-blue-600 bg-blue-100',
      custom: 'text-amber-600 bg-amber-100',
    };
    return colorMap[type as keyof typeof colorMap] || colorMap.custom;
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      
      <div className="fixed top-16 right-4 w-96 max-h-[80vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Notifications</h3>
                <p className="text-amber-100 text-sm">
                  {getUnreadCount()} unread • {notifications.length} total
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                title="Settings"
              >
                <Settings className="h-4 w-4 text-white" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        {notifications.length > 0 && (
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Mark All Read</span>
              </button>
              <button
                onClick={clearAll}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear All</span>
              </button>
            </div>
          </div>
        )}

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-600 mb-2">No notifications</h4>
              <p className="text-gray-500">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-blue-50/50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {new Date(notification.createdAt).toLocaleTimeString()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(notification.type)}`}>
                          {notification.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Settings Modal */}
      <NotificationSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
};

export default NotificationPanel;
