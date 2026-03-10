import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Tier } from '../data';

interface AuthContextType {
  userTier: Tier;
  setUserTier: (tier: Tier) => void;
  remainingRequests: number;
  decrementRequests: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userTier, setUserTier] = useState<Tier>('free');
  const [remainingRequests, setRemainingRequests] = useState(3);

  const decrementRequests = () => {
    setRemainingRequests((prev) => Math.max(0, prev - 1));
  };

  return (
    <AuthContext.Provider value={{ userTier, setUserTier, remainingRequests, decrementRequests }}>
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
