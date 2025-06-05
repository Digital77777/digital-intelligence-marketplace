
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AIToolTier } from '@/data/ai-tools-tiers';

export type TierType = AIToolTier;

interface TierContextType {
  currentTier: TierType;
  setCurrentTier: (tier: TierType) => void;
  setTier: (tier: TierType) => void;
  upgradePrompt: (requiredTier: TierType) => void;
  canAccess: (feature: string) => boolean;
  getTierFeatures: (tier: TierType) => string[];
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

  const setTier = (tier: TierType) => {
    setCurrentTier(tier);
  };

  const canAccess = (feature: string): boolean => {
    // Define feature access rules based on tier
    const tierHierarchy = {
      'freemium': 0,
      'basic': 1,
      'pro': 2
    };

    const featureRequirements: { [key: string]: number } = {
      'ai-tools-directory': 0,
      'learning-hub': 0,
      'ai-streams': 0,
      'marketplace': 0,
      'forums': 0,
      'team-dashboard': 1,
      'workflow-designer': 1,
      'collaboration-hub': 1,
      'ai-studio': 2,
      'business-insights': 2,
      'pipeline-designer': 2,
      'compliance-center': 2,
      'learning-academy': 2,
      'forum-category-basic': 1,
      'forum-category-pro': 2,
      'forum-category-freemium': 0,
    };

    const requiredLevel = featureRequirements[feature] ?? 0;
    const userLevel = tierHierarchy[currentTier];
    
    return userLevel >= requiredLevel;
  };

  const getTierFeatures = (tier: TierType): string[] => {
    const features = {
      'freemium': [
        'Basic AI Tools Access',
        'Community Forums',
        'Learning Resources',
        'AI Streams (Limited)',
        'Basic Marketplace Access'
      ],
      'basic': [
        'Advanced AI Tools',
        'Team Collaboration',
        'Workflow Designer',
        'Enhanced Forums',
        'Full Marketplace Access',
        'Priority Support'
      ],
      'pro': [
        'All AI Tools & Features',
        'AI Studio',
        'Business Insights',
        'Pipeline Designer',
        'Compliance Center',
        'Learning Academy',
        'Advanced Analytics',
        'Custom Integrations',
        'Dedicated Support'
      ]
    };

    return features[tier] || [];
  };

  return (
    <TierContext.Provider value={{ 
      currentTier, 
      setCurrentTier, 
      setTier,
      upgradePrompt, 
      canAccess, 
      getTierFeatures 
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
