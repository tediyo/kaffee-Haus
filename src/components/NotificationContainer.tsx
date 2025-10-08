'use client';

import React from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import NotificationItem from './NotificationItem';

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification, markAsRead, settings } = useNotifications();

  const getPositionClasses = () => {
    const positionMap = {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
      'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
    };
    return positionMap[settings.position];
  };

  if (notifications.length === 0) return null;

  return (
    <div className={`fixed z-50 ${getPositionClasses()}`}>
      <div className="space-y-3">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={removeNotification}
            onMarkAsRead={markAsRead}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationContainer;
