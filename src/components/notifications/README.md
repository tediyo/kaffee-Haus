# Notification System Documentation

## Overview

The notification system provides a comprehensive solution for displaying user feedback, alerts, and interactive messages throughout the Kaffee Haus application. It features customizable settings, multiple notification types, and smooth animations.

## Features

### 🎨 Notification Types
- **Success**: Green notifications for positive actions
- **Error**: Red notifications for errors and failures
- **Warning**: Yellow notifications for warnings
- **Info**: Blue notifications for informational messages
- **Custom**: Purple notifications with custom colors

### ⚙️ Customization Options
- **Position**: 6 different positions (top/bottom + left/center/right)
- **Duration**: Auto-close timing (1-10 seconds or persistent)
- **Progress Bar**: Visual countdown indicator
- **Sound**: Audio feedback for new notifications
- **Vibration**: Haptic feedback (mobile devices)
- **Max Notifications**: Limit concurrent notifications (1-10)

### 🎯 Interactive Features
- **Action Buttons**: Custom actions with different variants
- **Auto-close**: Automatic dismissal after duration
- **Manual Close**: Click to dismiss notifications
- **Read/Unread**: Mark notifications as read
- **Bulk Actions**: Mark all as read, clear all notifications

## Components

### Core Components

#### `NotificationProvider`
Context provider that manages global notification state and settings.

```tsx
import { NotificationProvider } from '@/contexts/NotificationContext';

<NotificationProvider>
  <App />
</NotificationProvider>
```

#### `NotificationContainer`
Displays all active notifications based on position settings.

```tsx
import NotificationContainer from '@/components/NotificationContainer';

<NotificationContainer />
```

#### `NotificationItem`
Individual notification component with animations and interactions.

#### `NotificationPanel`
Full notification management panel with settings and history.

#### `NotificationSettings`
Comprehensive settings panel for customizing notification behavior.

### Usage

#### Basic Usage

```tsx
import { useNotifications } from '@/contexts/NotificationContext';

function MyComponent() {
  const { addNotification } = useNotifications();

  const showSuccess = () => {
    addNotification({
      type: 'success',
      title: 'Success!',
      message: 'Your action was completed successfully.',
      duration: 5000,
    });
  };

  return <button onClick={showSuccess}>Show Success</button>;
}
```

#### Using Helper Functions

```tsx
import { createOrderNotification } from '@/utils/notificationHelpers';

function OrderComponent() {
  const { addNotification } = useNotifications();

  const handleOrder = () => {
    // Process order...
    addNotification(createOrderNotification('12345'));
  };

  return <button onClick={handleOrder}>Place Order</button>;
}
```

#### Advanced Usage with Actions

```tsx
const showInteractiveNotification = () => {
  addNotification({
    type: 'error',
    title: 'Payment Failed',
    message: 'Your payment could not be processed.',
    actions: [
      {
        label: 'Retry Payment',
        action: () => retryPayment(),
        variant: 'danger',
      },
      {
        label: 'Change Card',
        action: () => changeCard(),
        variant: 'secondary',
      },
    ],
    duration: 0, // Persistent until manually closed
  });
};
```

## API Reference

### NotificationContext

#### Methods

- `addNotification(notification)`: Add a new notification
- `removeNotification(id)`: Remove a specific notification
- `markAsRead(id)`: Mark a notification as read
- `markAllAsRead()`: Mark all notifications as read
- `clearAll()`: Remove all notifications
- `updateSettings(settings)`: Update notification settings
- `getUnreadCount()`: Get count of unread notifications

#### Properties

- `notifications`: Array of current notifications
- `settings`: Current notification settings

### Notification Object

```typescript
interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'custom';
  title: string;
  message: string;
  duration?: number; // milliseconds, 0 = persistent
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  showProgress?: boolean;
  actions?: NotificationAction[];
  icon?: React.ReactNode;
  customColor?: string;
  createdAt: Date;
  read?: boolean;
}
```

### Helper Functions

#### Basic Helpers
- `createSuccessNotification(title, message, options?)`
- `createErrorNotification(title, message, options?)`
- `createWarningNotification(title, message, options?)`
- `createInfoNotification(title, message, options?)`
- `createCustomNotification(title, message, customColor, options?)`

#### Coffee Shop Specific Helpers
- `createOrderNotification(orderNumber)`
- `createLoyaltyPointsNotification(points)`
- `createSpecialOfferNotification(offer, code)`
- `createPaymentErrorNotification()`
- `createNewMenuNotification(item)`
- `createStoreHoursNotification(message)`
- `createWelcomeNotification(customerName?)`

## Settings

### Default Settings

```typescript
{
  position: 'top-right',
  duration: 5000,
  showProgress: true,
  maxNotifications: 5,
  enableSound: true,
  enableVibration: false,
  autoClose: true,
}
```

### Persistence

Settings are automatically saved to localStorage and restored on page load.

## Styling

The notification system uses Tailwind CSS classes and can be customized through:

1. **Custom Colors**: Use `customColor` property for custom notification colors
2. **CSS Variables**: Override CSS custom properties for global styling
3. **Tailwind Classes**: Modify component classes for different themes

## Accessibility

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Readers**: Proper ARIA labels and descriptions
- **Focus Management**: Automatic focus handling for modals and panels
- **Color Contrast**: High contrast colors for better visibility

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Features**: Audio API, Vibration API (where supported)

## Demo

Visit `/notifications-demo` to see the notification system in action with interactive examples and customization options.

## Troubleshooting

### Common Issues

1. **Notifications not showing**: Ensure `NotificationProvider` wraps your app
2. **Settings not persisting**: Check localStorage permissions
3. **Sound not working**: Verify browser audio permissions
4. **Vibration not working**: Check device vibration support

### Debug Mode

Enable debug logging by setting `localStorage.setItem('notification-debug', 'true')` in browser console.

## Contributing

When adding new notification types or features:

1. Update the `Notification` type interface
2. Add corresponding helper functions
3. Update the demo page with examples
4. Test accessibility and mobile responsiveness
5. Update this documentation
