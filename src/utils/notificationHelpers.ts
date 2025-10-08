import { Notification } from '@/types/notification';

// Helper functions for common notification patterns
export const createSuccessNotification = (
  title: string,
  message: string,
  options?: Partial<Notification>
): Omit<Notification, 'id' | 'createdAt'> => ({
  type: 'success',
  title,
  message,
  duration: 5000,
  showProgress: true,
  ...options,
});

export const createErrorNotification = (
  title: string,
  message: string,
  options?: Partial<Notification>
): Omit<Notification, 'id' | 'createdAt'> => ({
  type: 'error',
  title,
  message,
  duration: 8000,
  showProgress: true,
  ...options,
});

export const createWarningNotification = (
  title: string,
  message: string,
  options?: Partial<Notification>
): Omit<Notification, 'id' | 'createdAt'> => ({
  type: 'warning',
  title,
  message,
  duration: 6000,
  showProgress: true,
  ...options,
});

export const createInfoNotification = (
  title: string,
  message: string,
  options?: Partial<Notification>
): Omit<Notification, 'id' | 'createdAt'> => ({
  type: 'info',
  title,
  message,
  duration: 4000,
  showProgress: true,
  ...options,
});

export const createCustomNotification = (
  title: string,
  message: string,
  customColor: string,
  options?: Partial<Notification>
): Omit<Notification, 'id' | 'createdAt'> => ({
  type: 'custom',
  title,
  message,
  customColor,
  duration: 5000,
  showProgress: true,
  ...options,
});

// Coffee shop specific notification helpers
export const createOrderNotification = (orderNumber: string) =>
  createSuccessNotification(
    'Order Confirmed!',
    `Your order #${orderNumber} has been confirmed and will be ready in 5-10 minutes.`,
    {
      actions: [
        {
          label: 'Track Order',
          action: () => console.log('Track order clicked'),
          variant: 'primary',
        },
      ],
    }
  );

export const createLoyaltyPointsNotification = (points: number) =>
  createInfoNotification(
    'Loyalty Points Earned!',
    `You've earned ${points} loyalty points for your visit. Keep it up!`,
    {
      duration: 4000,
    }
  );

export const createSpecialOfferNotification = (offer: string, code: string) =>
  createCustomNotification(
    'Special Offer!',
    `${offer} Use code ${code} at checkout.`,
    '#8B5CF6',
    {
      actions: [
        {
          label: 'Use Code',
          action: () => console.log('Use code clicked'),
          variant: 'primary',
        },
      ],
    }
  );

export const createMaintenanceNotification = (message: string) =>
  createWarningNotification(
    'Scheduled Maintenance',
    message,
    {
      duration: 0, // Persistent
      actions: [
        {
          label: 'Learn More',
          action: () => console.log('Learn more clicked'),
          variant: 'secondary',
        },
      ],
    }
  );

export const createPaymentErrorNotification = () =>
  createErrorNotification(
    'Payment Failed',
    'Your payment could not be processed. Please try again with a different payment method.',
    {
      actions: [
        {
          label: 'Retry Payment',
          action: () => console.log('Retry payment clicked'),
          variant: 'danger',
        },
        {
          label: 'Change Payment',
          action: () => console.log('Change payment clicked'),
          variant: 'secondary',
        },
      ],
    }
  );

export const createNewMenuNotification = (item: string) =>
  createInfoNotification(
    'New Menu Item!',
    `Try our new ${item} - available for a limited time!`,
    {
      actions: [
        {
          label: 'View Menu',
          action: () => console.log('View menu clicked'),
          variant: 'primary',
        },
      ],
    }
  );

export const createStoreHoursNotification = (message: string) =>
  createWarningNotification(
    'Store Hours Update',
    message,
    {
      duration: 10000,
    }
  );

export const createWelcomeNotification = (customerName?: string) =>
  createSuccessNotification(
    'Welcome to Kaffee Haus!',
    customerName 
      ? `Welcome back, ${customerName}! We're excited to serve you again.`
      : 'Welcome to Kaffee Haus! We\'re excited to serve you the finest coffee experience.',
    {
      duration: 6000,
    }
  );
