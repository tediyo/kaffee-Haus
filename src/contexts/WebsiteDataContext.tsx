'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  HomeContent, 
  DisplaySetting, 
  HighlightCard, 
  CoffeeHistory, 
  CoffeeFact,
  fetchHomeContent,
  fetchDisplaySettings,
  fetchHighlightCards,
  fetchCoffeeHistory,
  fetchCoffeeFacts
} from '@/lib/api';

interface WebsiteDataContextType {
  homeContent: HomeContent[];
  displaySettings: DisplaySetting[];
  highlightCards: HighlightCard[];
  coffeeHistory: CoffeeHistory[];
  coffeeFacts: CoffeeFact[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  getHomeValue: (section: string, field: string) => string;
  getDisplaySetting: (key: string) => boolean;
}

const WebsiteDataContext = createContext<WebsiteDataContextType | undefined>(undefined);

export const useWebsiteData = () => {
  const context = useContext(WebsiteDataContext);
  if (context === undefined) {
    throw new Error('useWebsiteData must be used within a WebsiteDataProvider');
  }
  return context;
};

export const WebsiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [homeContent, setHomeContent] = useState<HomeContent[]>([]);
  const [displaySettings, setDisplaySettings] = useState<DisplaySetting[]>([]);
  const [highlightCards, setHighlightCards] = useState<HighlightCard[]>([]);
  const [coffeeHistory, setCoffeeHistory] = useState<CoffeeHistory[]>([]);
  const [coffeeFacts, setCoffeeFacts] = useState<CoffeeFact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [homeData, settingsData, cardsData, historyData, factsData] = await Promise.all([
        fetchHomeContent(),
        fetchDisplaySettings(),
        fetchHighlightCards(),
        fetchCoffeeHistory(),
        fetchCoffeeFacts()
      ]);

      setHomeContent(homeData);
      setDisplaySettings(settingsData);
      setHighlightCards(cardsData);
      setCoffeeHistory(historyData);
      setCoffeeFacts(factsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Error refreshing website data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const getHomeValue = (section: string, field: string): string => {
    const item = homeContent.find(c => c.section === section && c.field === field);
    return item ? item.value : '';
  };

  const getDisplaySetting = (key: string): boolean => {
    const setting = displaySettings.find(s => s.setting_key === key);
    return setting ? setting.setting_value === 'true' : true;
  };

  const value: WebsiteDataContextType = {
    homeContent,
    displaySettings,
    highlightCards,
    coffeeHistory,
    coffeeFacts,
    loading,
    error,
    refreshData,
    getHomeValue,
    getDisplaySetting,
  };

  return (
    <WebsiteDataContext.Provider value={value}>
      {children}
    </WebsiteDataContext.Provider>
  );
};


