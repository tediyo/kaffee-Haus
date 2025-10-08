export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'custom';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number; // in milliseconds, 0 means persistent
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  showProgress?: boolean;
  actions?: NotificationAction[];
  icon?: React.ReactNode;
  customColor?: string;
  createdAt: Date;
  read?: boolean;
}

export interface NotificationAction {
  label: string;
  action: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface NotificationSettings {
  position: Notification['position'];
  duration: number;
  showProgress: boolean;
  maxNotifications: number;
  enableSound: boolean;
  enableVibration: boolean;
  autoClose: boolean;
}

export interface NotificationContextType {
  notifications: Notification[];
  settings: NotificationSettings;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => string;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  updateSettings: (settings: Partial<NotificationSettings>) => void;
  getUnreadCount: () => number;
}
