// API configuration
const ADMIN_API_BASE_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3002';

// Types
export interface HomeContent {
  id: number;
  section: string;
  field: string;
  value: string;
  is_active: boolean;
}

export interface DisplaySetting {
  id: number;
  setting_key: string;
  setting_value: string;
  description: string;
}

export interface HighlightCard {
  id: number;
  title: string;
  description: string;
  image_url: string;
  price: string;
  badge: string;
  is_popular: boolean;
  is_seasonal: boolean;
  is_active: boolean;
  sort_order: number;
}

export interface CoffeeHistory {
  id: number;
  year: string;
  title: string;
  description: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
}

export interface CoffeeFact {
  id: number;
  fact: string;
  is_active: boolean;
  sort_order: number;
}

export interface MenuItem {
  _id?: string;
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  isPopular?: boolean;
  isNew?: boolean;
  prepTime?: number;
  calories?: number;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface MenuCategory {
  _id?: string;
  name: string;
  description?: string;
  sort_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  items?: MenuItem[];
}

export interface MenuData {
  categories: MenuCategory[];
  allItems: MenuItem[];
}

export interface SignatureDrink {
  _id?: string;
  id?: number;
  name: string;
  span: string;
  image: string;
  ingredients: string[];
  price: number;
  rating: number;
  prepTime: number;
  description: string;
  category: string;
  is_active: boolean;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface AboutValue {
  _id?: string;
  id?: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  image?: string;
  is_active: boolean;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface AboutMilestone {
  _id?: string;
  id?: number;
  year: string;
  title: string;
  description: string;
  is_active: boolean;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface AboutFAQ {
  _id?: string;
  id?: number;
  question: string;
  answer: string;
  category: string;
  icon: string;
  helpful: number;
  tags: string[];
  is_active: boolean;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface AboutContent {
  _id?: string;
  id?: number;
  section: string;
  field: string;
  value: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface AboutData {
  values: AboutValue[];
  milestones: AboutMilestone[];
  faqs: AboutFAQ[];
  content: { [section: string]: { [field: string]: string } };
  sectionVisibility: { [section: string]: boolean };
}

export interface Branch {
  _id?: string;
  id?: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
  description?: string;
  amenities?: string[];
  is_main_branch?: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface ContactData {
  branches: Branch[];
  content: { [section: string]: { [field: string]: string } };
  sectionVisibility: { [section: string]: boolean };
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
  category: string;
  image: string;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  calories?: number;
  prepTime?: number;
}

export interface Order {
  _id?: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  orderType: 'pickup' | 'delivery';
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  };
  specialInstructions?: string;
  orderTime: Date;
  estimatedReadyTime?: Date;
  actualReadyTime?: Date;
  completedTime?: Date;
  branchId?: string;
  notes?: string;
  paymentMethod?: 'cash' | 'card' | 'mobile';
  paymentStatus?: 'pending' | 'paid' | 'refunded';
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: {
    orderId: string;
    orderNumber: string;
    estimatedReadyTime: Date;
    total: number;
  };
}

// API functions
export async function fetchHomeContent(): Promise<HomeContent[]> {
  try {
    const response = await fetch(`${ADMIN_API_BASE_URL}/api/home-content`, {
      next: { revalidate: 60 } // Revalidate every minute
    });
    
    if (!response.ok) {
      console.warn('Failed to fetch home content from API, using fallback data');
      // Return fallback data instead of throwing error
      return [
        {
          section: 'hero',
          field: 'title',
          value: 'Welcome to Our Coffee Shop',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          section: 'hero',
          field: 'subtitle',
          value: 'Experience the perfect blend of tradition and innovation',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      ];
    }
    
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching home content:', error);
    // Return fallback data instead of empty array
    return [
      {
        section: 'hero',
        field: 'title',
        value: 'Welcome to Our Coffee Shop',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        section: 'hero',
        field: 'subtitle',
        value: 'Experience the perfect blend of tradition and innovation',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
  }
}

export async function fetchDisplaySettings(): Promise<DisplaySetting[]> {
  try {
    const response = await fetch(`${ADMIN_API_BASE_URL}/api/display-settings`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      console.warn('Failed to fetch display settings from API, using fallback data');
      return [
        {
          setting_key: 'show_hero',
          setting_value: 'true',
          description: 'Show hero section',
          created_at: new Date(),
          updated_at: new Date()
        }
      ]; 
    }
    
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching display settings:', error);
    return [
      {
        setting_key: 'show_hero',
        setting_value: 'true',
        description: 'Show hero section',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
  }
}

export async function fetchHighlightCards(): Promise<HighlightCard[]> {
  try {
    const response = await fetch(`${ADMIN_API_BASE_URL}/api/highlight-cards`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      console.warn('Failed to fetch highlight cards from API, using fallback data');
      return [
        {
          title: 'Premium Coffee Beans',
          description: 'Sourced from the finest coffee regions around the world',
          image_url: '',
          price: 'From $12',
          badge: 'Premium',
          is_popular: true,
          is_seasonal: false,
          is_active: true,
          sort_order: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          title: 'Artisan Roasting',
          description: 'Expertly roasted to bring out the perfect flavor profile',
          image_url: '',
          price: 'Custom',
          badge: 'Artisan',
          is_popular: false,
          is_seasonal: false,
          is_active: true,
          sort_order: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          title: 'Fresh Daily',
          description: 'Brewed fresh every day with care and attention to detail',
          image_url: '',
          price: 'Daily',
          badge: 'Fresh',
          is_popular: true,
          is_seasonal: false,
          is_active: true,
          sort_order: 3,
          created_at: new Date(),
          updated_at: new Date()
        }
      ];
    }
    
    const data = await response.json();
    return data.success ? data.data.filter((card: HighlightCard) => card.is_active) : [];
  } catch (error) {
    console.error('Error fetching highlight cards:', error);
    return [
      {
        title: 'Premium Coffee Beans',
        description: 'Sourced from the finest coffee regions around the world',
        image_url: '',
        price: 'From $12',
        badge: 'Premium',
        is_popular: true,
        is_seasonal: false,
        is_active: true,
        sort_order: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Artisan Roasting',
        description: 'Expertly roasted to bring out the perfect flavor profile',
        image_url: '',
        price: 'Custom',
        badge: 'Artisan',
        is_popular: false,
        is_seasonal: false,
        is_active: true,
        sort_order: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Fresh Daily',
        description: 'Brewed fresh every day with care and attention to detail',
        image_url: '',
        price: 'Daily',
        badge: 'Fresh',
        is_popular: true,
        is_seasonal: false,
        is_active: true,
        sort_order: 3,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
  }
}

export async function fetchCoffeeHistory(): Promise<CoffeeHistory[]> {
  try {
    const response = await fetch(`${ADMIN_API_BASE_URL}/api/coffee-history`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      console.warn('Failed to fetch coffee history from API, using fallback data');
      return [
        {
          year: '850 AD',
          title: 'Discovery of Coffee',
          description: 'Legend says a goat herder named Kaldi discovered coffee when his goats became energetic after eating coffee berries.',
          image_url: '',
          is_active: true,
          sort_order: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          year: '1500s',
          title: 'Coffee Spreads to Arabia',
          description: 'Coffee cultivation and trade began in the Arabian Peninsula, particularly in Yemen.',
          image_url: '',
          is_active: true,
          sort_order: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          year: '1600s',
          title: 'Coffee Reaches Europe',
          description: 'Coffee houses opened in major European cities, becoming centers of social and intellectual activity.',
          image_url: '',
          is_active: true,
          sort_order: 3,
          created_at: new Date(),
          updated_at: new Date()
        }
      ];
    }
    
    const data = await response.json();
    return data.success ? data.data.filter((item: CoffeeHistory) => item.is_active) : [];
  } catch (error) {
    console.error('Error fetching coffee history:', error);
    return [
      {
        year: '850 AD',
        title: 'Discovery of Coffee',
        description: 'Legend says a goat herder named Kaldi discovered coffee when his goats became energetic after eating coffee berries.',
        image_url: '',
        is_active: true,
        sort_order: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        year: '1500s',
        title: 'Coffee Spreads to Arabia',
        description: 'Coffee cultivation and trade began in the Arabian Peninsula, particularly in Yemen.',
        image_url: '',
        is_active: true,
        sort_order: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        year: '1600s',
        title: 'Coffee Reaches Europe',
        description: 'Coffee houses opened in major European cities, becoming centers of social and intellectual activity.',
        image_url: '',
        is_active: true,
        sort_order: 3,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
  }
}

export async function fetchCoffeeFacts(): Promise<CoffeeFact[]> {
  try {
    const response = await fetch(`${ADMIN_API_BASE_URL}/api/coffee-facts`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      console.warn('Failed to fetch coffee facts from API, using fallback data');
      return [
        {
          fact: 'Coffee is the second most traded commodity in the world, after oil.',
          is_active: true,
          sort_order: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          fact: 'The average coffee drinker consumes 3.1 cups of coffee per day.',
          is_active: true,
          sort_order: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          fact: 'Coffee beans are actually seeds from the coffee cherry fruit.',
          is_active: true,
          sort_order: 3,
          created_at: new Date(),
          updated_at: new Date()
        }
      ];
    }
    
    const data = await response.json();
    return data.success ? data.data.filter((fact: CoffeeFact) => fact.is_active) : [];
  } catch (error) {
    console.error('Error fetching coffee facts:', error);
    return [
      {
        fact: 'Coffee is the second most traded commodity in the world, after oil.',
        is_active: true,
        sort_order: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        fact: 'The average coffee drinker consumes 3.1 cups of coffee per day.',
        is_active: true,
        sort_order: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        fact: 'Coffee beans are actually seeds from the coffee cherry fruit.',
        is_active: true,
        sort_order: 3,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
  }
}

export async function fetchMenuData(): Promise<MenuData | null> {
  try {
    const response = await fetch(`${ADMIN_API_BASE_URL}/api/public/menu`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      console.warn('Failed to fetch menu data from API, using fallback data');
      return {
        allItems: [
          {
            _id: '1',
            name: 'Espresso',
            description: 'Rich and bold coffee shot',
            price: 2.50,
            category: 'Hot Coffee',
            rating: 4.5,
            image: '/coffee-cup.png',
            isPopular: true,
            isNew: false,
            prepTime: 2,
            calories: 5,
            isVegan: true,
            isGlutenFree: true,
            is_active: true,
            sort_order: 1,
            created_at: new Date(),
            updated_at: new Date()
          },
          {
            _id: '2',
            name: 'Cappuccino',
            description: 'Espresso with steamed milk and foam',
            price: 3.50,
            category: 'Hot Coffee',
            rating: 4.7,
            image: '/coffee-cup.png',
            isPopular: true,
            isNew: false,
            prepTime: 3,
            calories: 80,
            isVegan: false,
            isGlutenFree: true,
            is_active: true,
            sort_order: 2,
            created_at: new Date(),
            updated_at: new Date()
          }
        ],
        categories: [
          {
            _id: '1',
            name: 'Hot Coffee',
            description: 'Warm and comforting coffee drinks',
            sort_order: 1,
            is_active: true,
            created_at: new Date(),
            updated_at: new Date()
          },
          {
            _id: '2',
            name: 'Cold Drinks',
            description: 'Refreshing cold beverages',
            sort_order: 2,
            is_active: true,
            created_at: new Date(),
            updated_at: new Date()
          }
        ]
      };
    }
    
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching menu data:', error);
    return {
      allItems: [
        {
          _id: '1',
          name: 'Espresso',
          description: 'Rich and bold coffee shot',
          price: 2.50,
          category: 'Hot Coffee',
          rating: 4.5,
          image: '/coffee-cup.png',
          isPopular: true,
          isNew: false,
          prepTime: 2,
          calories: 5,
          isVegan: true,
          isGlutenFree: true,
          is_active: true,
          sort_order: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          _id: '2',
          name: 'Cappuccino',
          description: 'Espresso with steamed milk and foam',
          price: 3.50,
          category: 'Hot Coffee',
          rating: 4.7,
          image: '/coffee-cup.png',
          isPopular: true,
          isNew: false,
          prepTime: 3,
          calories: 80,
          isVegan: false,
          isGlutenFree: true,
          is_active: true,
          sort_order: 2,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      categories: [
        {
          _id: '1',
          name: 'Hot Coffee',
          description: 'Warm and comforting coffee drinks',
          sort_order: 1,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          _id: '2',
          name: 'Cold Drinks',
          description: 'Refreshing cold beverages',
          sort_order: 2,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      ]
    };
  }
}

export async function fetchMenuItems(): Promise<MenuItem[]> {
  try {
    const menuData = await fetchMenuData();
    return menuData ? menuData.allItems : [];
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
}

export async function fetchMenuCategories(): Promise<MenuCategory[]> {
  try {
    const menuData = await fetchMenuData();
    return menuData ? menuData.categories : [];
  } catch (error) {
    console.error('Error fetching menu categories:', error);
    return [];
  }
}

export async function fetchSignatureDrinks(): Promise<SignatureDrink[]> {
  try {
    const response = await fetch(`${ADMIN_API_BASE_URL}/api/public/signature-drinks`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch signature drinks');
    }
    
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching signature drinks:', error);
    return [];
  }
}

// Helper functions
export function getHomeContentValue(content: HomeContent[], section: string, field: string): string {
  const item = content.find(c => c.section === section && c.field === field);
  return item ? item.value : '';
}

export function getDisplaySetting(settings: DisplaySetting[], key: string): boolean {
  const setting = settings.find(s => s.setting_key === key);
  return setting ? setting.setting_value === 'true' : true; // Default to true if not found
}

// Menu helper functions
export function getMenuItemsByCategory(menuData: MenuData | null, category: string): MenuItem[] {
  if (!menuData) return [];
  return menuData.allItems.filter(item => item.category === category);
}

export function getPopularMenuItems(menuData: MenuData | null): MenuItem[] {
  if (!menuData) return [];
  return menuData.allItems.filter(item => item.isPopular);
}

export function getNewMenuItems(menuData: MenuData | null): MenuItem[] {
  if (!menuData) return [];
  return menuData.allItems.filter(item => item.isNew);
}

export function sortMenuItemsByPopularity(items: MenuItem[]): MenuItem[] {
  return [...items].sort((a, b) => {
    // Sort by popularity first, then by sort_order
    const aPopular = a.isPopular ? 1 : 0;
    const bPopular = b.isPopular ? 1 : 0;
    if (aPopular !== bPopular) return bPopular - aPopular;
    return a.sort_order - b.sort_order;
  });
}

// About section API functions
export async function fetchAboutData(): Promise<AboutData> {
  try {
    const response = await fetch(`${ADMIN_API_BASE_URL}/api/public/about`, {
      next: { revalidate: 60 } // Revalidate every minute
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch about data');
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching about data:', error);
    // Return fallback data
    return {
      values: [],
      milestones: [],
      faqs: [],
      content: {},
      sectionVisibility: {}
    };
  }
}

// Contact section API functions
export async function fetchContactData(): Promise<ContactData> {
  try {
    const response = await fetch(`${ADMIN_API_BASE_URL}/api/public/contact`, {
      next: { revalidate: 60 } // Revalidate every minute
    });

    if (!response.ok) {
      throw new Error('Failed to fetch contact data');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching contact data:', error);
    // Return fallback data
    return {
      branches: [],
      content: {},
      sectionVisibility: {}
    };
  }
}

// Order API functions
export async function placeOrder(orderData: Omit<Order, '_id' | 'orderNumber' | 'orderTime' | 'estimatedReadyTime'>, token?: string): Promise<OrderResponse> {
  try {
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${ADMIN_API_BASE_URL}/api/public/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error placing order:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error: Unable to connect to server');
  }
}

export async function getOrderByNumber(orderNumber: string, email: string, token?: string): Promise<Order> {
  try {
    const headers: { [key: string]: string } = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${ADMIN_API_BASE_URL}/api/public/orders?orderNumber=${orderNumber}&email=${email}`, {
      headers
    });

    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}

