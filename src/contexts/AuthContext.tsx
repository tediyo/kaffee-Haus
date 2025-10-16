'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
}

interface AuthContextType {
  customer: Customer | null;
  token: string | null;
  login: (token: string, customer: Customer) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored auth data on mount
    const storedToken = localStorage.getItem('auth_token');
    const storedCustomer = localStorage.getItem('auth_customer');
    
    if (storedToken && storedCustomer) {
      setToken(storedToken);
      setCustomer(JSON.parse(storedCustomer));
    }
  }, []);

  const login = (newToken: string, newCustomer: Customer) => {
    setToken(newToken);
    setCustomer(newCustomer);
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('auth_customer', JSON.stringify(newCustomer));
  };

  const logout = () => {
    setToken(null);
    setCustomer(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_customer');
  };

  const isAuthenticated = !!token && !!customer;

  return (
    <AuthContext.Provider value={{
      customer,
      token,
      login,
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
