import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

type TierType = 'freemium' | 'basic' | 'pro';

interface TierContextType {
  currentTier: TierType;
  canAccess: (feature: string) => boolean;
  upgradePrompt: (requiredTier: TierType) => void;
}

const TierContext = createContext<TierContextType | undefined>(undefined);

export const TierProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTier, setCurrentTier] = useState<TierType>('pro'); // Default to pro for demo

  const canAccess = (feature: string): boolean => {
    // Mock tier access for frontend-only version
    const featureTiers: Record<string, TierType> = {
      'ai-studio': 'pro',
      'workflow-templates': 'basic',
      'automation': 'pro',
      'analytics': 'basic'
    };

    const requiredTier = featureTiers[feature] || 'freemium';
    
    const tierLevels = { freemium: 0, basic: 1, pro: 2 };
    return tierLevels[currentTier] >= tierLevels[requiredTier];
  };

  const upgradePrompt = (requiredTier: TierType) => {
    toast.error(`This feature requires a ${requiredTier} subscription. Please upgrade to continue.`);
  };

  return (
    <TierContext.Provider value={{
      currentTier,
      canAccess,
      upgradePrompt
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
