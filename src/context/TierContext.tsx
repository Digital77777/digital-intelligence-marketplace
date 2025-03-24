
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type TierType = 'freemium' | 'basic' | 'pro';

interface TierContextType {
  currentTier: TierType;
  setTier: (tier: TierType) => void;
}

const TierContext = createContext<TierContextType | undefined>(undefined);

export const TierProvider = ({ children }: { children: ReactNode }) => {
  const [currentTier, setCurrentTier] = useState<TierType>('freemium');

  const setTier = (tier: TierType) => {
    setCurrentTier(tier);
  };

  return (
    <TierContext.Provider value={{ currentTier, setTier }}>
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
