'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Notification, NotificationContextType, NotificationSettings } from '@/types/notification';

const defaultSettings: NotificationSettings = {
  position: 'top-right',
  duration: 5000,
  showProgress: true,
  maxNotifications: 5,
  enableSound: true,
  enableVibration: false,
  autoClose: true,
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('notification-settings');
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    }
    return defaultSettings;
  });

  // Save settings to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('notification-settings', JSON.stringify(settings));
    }
  }, [settings]);

  const addNotification = useCallback((notificationData: Omit<Notification, 'id' | 'createdAt'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const notification: Notification = {
      ...notificationData,
      id,
      createdAt: new Date(),
      duration: notificationData.duration ?? settings.duration,
      position: notificationData.position ?? settings.position,
      showProgress: notificationData.showProgress ?? settings.showProgress,
      read: false,
    };

    setNotifications(prev => {
      const newNotifications = [notification, ...prev];
      // Limit notifications based on settings
      return newNotifications.slice(0, settings.maxNotifications);
    });

    // Auto-remove notification after duration
    if (settings.autoClose && notification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration);
    }

    // Play sound if enabled
    if (settings.enableSound) {
      playNotificationSound(notification.type);
    }

    // Vibrate if enabled
    if (settings.enableVibration && 'vibrate' in navigator) {
      navigator.vibrate(200);
    }

    return id;
  }, [settings]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const getUnreadCount = useCallback(() => {
    return notifications.filter(notification => !notification.read).length;
  }, [notifications]);

  const playNotificationSound = (type: Notification['type']) => {
    if (typeof window === 'undefined') return;
    
    // Create audio context for different notification sounds
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different frequencies for different notification types
    const frequencies = {
      success: 800,
      error: 400,
      warning: 600,
      info: 500,
      custom: 700,
    };
    
    oscillator.frequency.setValueAtTime(frequencies[type], audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const value: NotificationContextType = {
    notifications,
    settings,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    updateSettings,
    getUnreadCount,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
