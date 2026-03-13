import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from 'firebase/auth';
import { authService, UserProfile, Tier } from '../services/authService';
import { setSentryUser, clearSentryUser, addBreadcrumb } from '../lib/sentry';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  remainingRequests: number;
  toggleFavorite: (id: string) => Promise<void>;
  incrementRequestCount: () => Promise<boolean>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = authService.getCurrentUser() ? () => {} : () => {};

    // Set initial state
    const currentUser = authService.getCurrentUser();
    const currentProfile = authService.getUserProfile();
    setUser(currentUser);
    setUserProfile(currentProfile);

    // Set Sentry user context if logged in
    if (currentUser && currentProfile) {
      setSentryUser({
        id: currentUser.uid,
        email: currentUser.email || undefined,
        username: currentProfile.displayName,
      });
      addBreadcrumb(`User authenticated: ${currentProfile.displayName}`, 'auth', 'info');
    }

    setIsLoading(false);

    return unsubscribe;
  }, []);

  const handleAuthError = (error: any) => {
    setError(typeof error === 'string' ? error : error.message);
  };

  const clearError = () => setError(null);

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setError(null);
      setIsLoading(true);
      await authService.signUp(email, password, displayName);
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      await authService.signIn(email, password);
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setError(null);
      setIsLoading(true);
      await authService.signInWithGoogle();
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await authService.signOut();
      setUser(null);
      setUserProfile(null);
      clearSentryUser();
      addBreadcrumb('User logged out', 'auth', 'info');
    } catch (error) {
      handleAuthError(error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      await authService.resetPassword(email);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    try {
      setError(null);
      await authService.updateProfile(updates);
      setUserProfile(authService.getUserProfile());
    } catch (error) {
      handleAuthError(error);
    }
  };

  const toggleFavorite = async (id: string) => {
    try {
      await authService.toggleFavorite(id);
      setUserProfile(authService.getUserProfile());
    } catch (error) {
      handleAuthError(error);
    }
  };

  const incrementRequestCount = async (): Promise<boolean> => {
    try {
      const success = await authService.incrementRequestCount();
      if (success) {
        setUserProfile(authService.getUserProfile());
        addBreadcrumb('AI request count incremented', 'usage', 'info');
      } else {
        addBreadcrumb('AI request limit exceeded', 'usage', 'warning');
      }
      return success;
    } catch (error) {
      handleAuthError(error);
      addBreadcrumb('Failed to increment request count', 'error', 'error');
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    isLoggedIn: authService.isAuthenticated(),
    isLoading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    resetPassword,
    updateProfile: updateUserProfile,
    remainingRequests: authService.getRemainingRequests(),
    toggleFavorite,
    incrementRequestCount,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
