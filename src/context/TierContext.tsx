
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type TierType = 'freemium' | 'basic' | 'pro';

export interface TierFeatures {
  maxTeamMembers: number;
  maxProjects: number;
  apiCallsLimit: number;
  toolAccess: number;
  supportResponse: string;
  storage: string;
  analytics: boolean;
  collaboration: boolean;
  workflowAutomation: boolean;
  advancedSecurity: boolean;
}

interface TierContextType {
  currentTier: TierType;
  setTier: (tier: TierType) => void;
  getTierFeatures: (tier: TierType) => TierFeatures;
  canAccess: (feature: string) => boolean;
  isFeatureAvailable: (feature: string) => boolean;
  upgradePrompt: (targetTier: TierType) => void;
}

const tierFeaturesMap: Record<TierType, TierFeatures> = {
  freemium: {
    maxTeamMembers: 1,
    maxProjects: 3,
    apiCallsLimit: 100,
    toolAccess: 10,
    supportResponse: "Community support",
    storage: "500MB",
    analytics: false,
    collaboration: false,
    workflowAutomation: false,
    advancedSecurity: false
  },
  basic: {
    maxTeamMembers: 10,
    maxProjects: 20,
    apiCallsLimit: 5000,
    toolAccess: 100,
    supportResponse: "24-48 hours",
    storage: "10GB",
    analytics: true,
    collaboration: true,
    workflowAutomation: true,
    advancedSecurity: true
  },
  pro: {
    maxTeamMembers: 50,
    maxProjects: 100,
    apiCallsLimit: 50000,
    toolAccess: 250,
    supportResponse: "4-8 hours",
    storage: "100GB",
    analytics: true,
    collaboration: true,
    workflowAutomation: true,
    advancedSecurity: true
  }
};

// Features available in each tier
const tierFeatureAccess: Record<string, TierType[]> = {
  'team-dashboard': ['basic', 'pro'],
  'collaboration-hub': ['basic', 'pro'],
  'workflow-designer': ['basic', 'pro'],
  'extended-tools': ['basic', 'pro'],
  'usage-analytics': ['basic', 'pro'],
  'team-settings': ['basic', 'pro'],
  'audit-logs': ['basic', 'pro'],
  'priority-support': ['basic', 'pro'],
  'learning-hub-pro': ['basic', 'pro'],
  'custom-models': ['pro'],
  'advanced-api': ['pro'],
  'white-labeling': ['pro'],
  'dedicated-support': ['pro']
};

const TierContext = createContext<TierContextType | undefined>(undefined);

export const TierProvider = ({ children }: { children: ReactNode }) => {
  const [currentTier, setCurrentTier] = useState<TierType>('freemium');

  const setTier = (tier: TierType) => {
    setCurrentTier(tier);
  };

  const getTierFeatures = (tier: TierType): TierFeatures => {
    return tierFeaturesMap[tier];
  };

  const canAccess = (feature: string): boolean => {
    return tierFeatureAccess[feature]?.includes(currentTier) || false;
  };

  const isFeatureAvailable = (feature: string): boolean => {
    return canAccess(feature);
  };

  const upgradePrompt = (targetTier: TierType) => {
    console.log(`Upgrade to ${targetTier} to access this feature`);
    // In a real implementation, this would show a modal or redirect to the pricing page
  };

  return (
    <TierContext.Provider value={{ 
      currentTier, 
      setTier, 
      getTierFeatures, 
      canAccess, 
      isFeatureAvailable,
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
