
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

type Tier = 'freemium' | 'basic' | 'pro';

interface TierContextType {
  currentTier: Tier;
  upgradePrompt: (requiredTier: Tier) => void;
  hasAccess: (requiredTier: Tier) => boolean;
}

const TierContext = createContext<TierContextType | undefined>(undefined);

export const TierProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentTier, setCurrentTier] = useState<Tier>('freemium');

  useEffect(() => {
    if (user?.email === 'bbadibanga55@gmail.com') {
      setCurrentTier('pro');
    } else {
      setCurrentTier('freemium');
    }
  }, [user]);

  const upgradePrompt = (requiredTier: Tier) => {
    toast.error(`This feature requires ${requiredTier} tier. Please upgrade your account.`);
  };

  const hasAccess = (requiredTier: Tier) => {
    const tierLevels = { freemium: 0, basic: 1, pro: 2 };
    return tierLevels[currentTier] >= tierLevels[requiredTier];
  };

  return (
    <TierContext.Provider value={{
      currentTier,
      upgradePrompt,
      hasAccess
    }}>
      {children}
    </TierContext.Provider>
  );
};

export const useTier = () => {
  const context = useContext(TierContext);
  if (context === undefined) {
    throw new Error('useTier must be used within a TierProvider');
  }
  return context;
};
