import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Tier } from '../data';

interface AuthContextType {
  userTier: Tier;
  setUserTier: (tier: Tier) => void;
  isLoggedIn: boolean;
  login: (tier: Tier) => void;
  logout: () => void;
  remainingRequests: number;
  decrementRequests: () => void;
  name: string;
  setName: (name: string) => void;
  occupation: string;
  setOccupation: (occupation: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userTier, setUserTier] = useState<Tier>('free');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [remainingRequests, setRemainingRequests] = useState(3);
  const [name, setName] = useState('ผู้ใช้งานใหม่');
  const [occupation, setOccupation] = useState('ยังไม่ระบุอาชีพ');
  const [favorites, setFavorites] = useState<string[]>([]);

  const login = (tier: Tier) => {
    setUserTier(tier);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserTier('free');
    setFavorites([]);
  };

  const decrementRequests = () => {
    setRemainingRequests((prev) => Math.max(0, prev - 1));
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <AuthContext.Provider value={{ 
      userTier, setUserTier, isLoggedIn, login, logout, remainingRequests, decrementRequests,
      name, setName, occupation, setOccupation, favorites, toggleFavorite
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
