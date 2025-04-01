
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

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
  customModels: boolean;
  aiStudio: boolean;
  unlimitedTeamMembers: boolean;
  dedicatedSupport: boolean;
  complianceTools: boolean;
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
    advancedSecurity: false,
    customModels: false,
    aiStudio: false,
    unlimitedTeamMembers: false,
    dedicatedSupport: false,
    complianceTools: false
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
    advancedSecurity: true,
    customModels: false,
    aiStudio: false,
    unlimitedTeamMembers: false,
    dedicatedSupport: false,
    complianceTools: false
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
    advancedSecurity: true,
    customModels: true,
    aiStudio: true,
    unlimitedTeamMembers: true,
    dedicatedSupport: true,
    complianceTools: true
  }
};

// Features available in each tier
const tierFeatureAccess: Record<string, TierType[]> = {
  // Freemium accessible features
  'ai-tools-directory': ['freemium', 'basic', 'pro'],
  'forums': ['freemium', 'basic', 'pro'],
  'marketplace': ['freemium', 'basic', 'pro'],
  'profile-management': ['freemium', 'basic', 'pro'],
  'starter-api': ['freemium', 'basic', 'pro'],
  'learning-hub': ['freemium', 'basic', 'pro'],
  'ai-streams': ['freemium', 'basic', 'pro'],
  
  // Basic tier features
  'team-dashboard': ['basic', 'pro'],
  'collaboration-hub': ['basic', 'pro'],
  'workflow-designer': ['basic', 'pro'],
  'extended-tools': ['basic', 'pro'],
  'usage-analytics': ['basic', 'pro'],
  'team-settings': ['basic', 'pro'],
  'audit-logs': ['basic', 'pro'],
  'priority-support': ['basic', 'pro'],
  'learning-hub-pro': ['basic', 'pro'],
  'api-calls-5000': ['basic', 'pro'],
  
  // Pro tier features
  'custom-models': ['pro'],
  'advanced-api': ['pro'],
  'white-labeling': ['pro'],
  'dedicated-support': ['pro'],
  'ai-studio': ['pro'],
  'model-marketplace': ['pro'],
  'pipeline-designer': ['pro'],
  'team-workspace': ['pro'],
  'compliance-center': ['pro'],
  'security-dashboard': ['pro'],
  'business-insights': ['pro'],
  'pro-chatbot': ['pro'],
  'learning-academy': ['pro'],
  'api-calls-50000': ['pro']
};

// Create the context with default values
const TierContext = createContext<TierContextType | undefined>(undefined);

export const TierProvider = ({ children }: { children: ReactNode }) => {
  const [currentTier, setCurrentTier] = useState<TierType>('freemium');

  const setTier = (tier: TierType) => {
    // Only show a toast if the tier is actually changing
    if (tier !== currentTier) {
      const tierName = tier.charAt(0).toUpperCase() + tier.slice(1);
      toast.success(`Switched to ${tierName} tier!`, {
        description: tier === 'freemium' 
          ? "You now have access to basic features and 10 core AI tools."
          : tier === 'basic'
          ? "You now have access to team collaboration features and 100+ AI tools!"
          : "You now have access to all premium features and 250+ AI tools!"
      });
    }
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
    toast.info(`Upgrade to ${targetTier} to access this feature`, {
      description: "Explore enhanced features with our premium tiers",
      action: {
        label: "View Plans",
        onClick: () => window.location.href = '/pricing'
      }
    });
  };

  // Persist tier selection to localStorage
  useEffect(() => {
    const savedTier = localStorage.getItem('userTier');
    if (savedTier && (savedTier === 'freemium' || savedTier === 'basic' || savedTier === 'pro')) {
      setCurrentTier(savedTier as TierType);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userTier', currentTier);
  }, [currentTier]);

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
