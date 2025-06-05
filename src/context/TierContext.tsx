
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AIToolTier } from '@/data/ai-tools-tiers';

export type TierType = AIToolTier;

interface TierContextType {
  currentTier: TierType;
  setCurrentTier: (tier: TierType) => void;
  upgradePrompt: (requiredTier: TierType) => void;
}

const TierContext = createContext<TierContextType | undefined>(undefined);

export const TierProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTier, setCurrentTier] = useState<TierType>('freemium');
  const { toast } = useToast();

  const upgradePrompt = (requiredTier: TierType) => {
    toast({
      title: "Upgrade Required",
      description: `This feature requires a ${requiredTier} subscription. Please upgrade to continue.`,
      variant: "destructive",
    });
  };

  return (
    <TierContext.Provider value={{ currentTier, setCurrentTier, upgradePrompt }}>
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
