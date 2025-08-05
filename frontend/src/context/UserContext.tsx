
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  created_at: string;
}

interface UserProfile {
  id: string;
  email: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

interface UserContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login for frontend-only version
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        created_at: new Date().toISOString()
      };
      
      const mockProfile: UserProfile = {
        id: mockUser.id,
        email,
        username: email.split('@')[0],
        full_name: 'Demo User',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setUser(mockUser);
      setProfile(mockProfile);
      toast.success('Successfully signed in!');
    } catch (error) {
      toast.error('Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, fullName?: string) => {
    setIsLoading(true);
    try {
      // Mock registration for frontend-only version
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        created_at: new Date().toISOString()
      };
      
      const mockProfile: UserProfile = {
        id: mockUser.id,
        email,
        username: email.split('@')[0],
        full_name: fullName || 'Demo User',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setUser(mockUser);
      setProfile(mockProfile);
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error('Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      setUser(null);
      setProfile(null);
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    // Mock refresh for frontend-only version
    console.log('Profile refreshed');
  };

  return (
    <UserContext.Provider value={{
      user,
      profile,
      loading,
      isLoading,
      login,
      register,
      logout,
      refreshProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
