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

// API functions
export async function fetchHomeContent(): Promise<HomeContent[]> {
  try {
    const response = await fetch(`${ADMIN_API_BASE_URL}/api/home-content`, {
      next: { revalidate: 60 } // Revalidate every minute
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch home content');
    }
    
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching home content:', error);
    return [];
  }
}

export async function fetchDisplaySettings(): Promise<DisplaySetting[]> {
  try {
    const response = await fetch(`${ADMIN_API_BASE_URL}/api/display-settings`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch display settings');
    }
    
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching display settings:', error);
    return [];
  }
}

export async function fetchHighlightCards(): Promise<HighlightCard[]> {
  try {
    const response = await fetch(`${ADMIN_API_BASE_URL}/api/highlight-cards`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch highlight cards');
    }
    
    const data = await response.json();
    return data.success ? data.data.filter((card: HighlightCard) => card.is_active) : [];
  } catch (error) {
    console.error('Error fetching highlight cards:', error);
    return [];
  }
}

export async function fetchCoffeeHistory(): Promise<CoffeeHistory[]> {
  try {
    const response = await fetch(`${ADMIN_API_BASE_URL}/api/coffee-history`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch coffee history');
    }
    
    const data = await response.json();
    return data.success ? data.data.filter((item: CoffeeHistory) => item.is_active) : [];
  } catch (error) {
    console.error('Error fetching coffee history:', error);
    return [];
  }
}

export async function fetchCoffeeFacts(): Promise<CoffeeFact[]> {
  try {
    const response = await fetch(`${ADMIN_API_BASE_URL}/api/coffee-facts`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch coffee facts');
    }
    
    const data = await response.json();
    return data.success ? data.data.filter((fact: CoffeeFact) => fact.is_active) : [];
  } catch (error) {
    console.error('Error fetching coffee facts:', error);
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


