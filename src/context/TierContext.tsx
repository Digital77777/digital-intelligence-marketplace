import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { AIToolTier } from '@/data/ai-tools-tiers';

export type TierType = AIToolTier;

interface TierContextType {
  currentTier: TierType;
  setCurrentTier: (tier: TierType) => void;
  setTier: (tier: TierType) => void;
  upgradePrompt: (requiredTier: TierType) => void;
  canAccess: (feature: string) => boolean;
  getTierFeatures: (tier: TierType) => string[];
  isSubscribed: boolean;
  subscriptionEnd: string | null;
  refreshSubscription: () => Promise<void>;
  isLoading: boolean;
}

const TierContext = createContext<TierContextType | undefined>(undefined);

export const TierProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTier, setCurrentTier] = useState<TierType>('freemium');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, session } = useUser();

  // Check subscription status on user login/session change
  useEffect(() => {
    if (user && session) {
      refreshSubscription();
    } else {
      setCurrentTier('freemium');
      setIsSubscribed(false);
      setSubscriptionEnd(null);
    }
  }, [user, session]);

  // Check for URL parameters indicating successful payment
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      toast.success("Payment successful! Your subscription is being activated.");
      refreshSubscription();
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    } else if (urlParams.get('canceled') === 'true') {
      toast.error("Payment was canceled.");
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const refreshSubscription = async () => {
    if (!user || !session) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Error checking subscription:', error);
        return;
      }

      if (data) {
        setCurrentTier(data.subscription_tier || 'freemium');
        setIsSubscribed(data.subscribed || false);
        setSubscriptionEnd(data.subscription_end || null);
      }
    } catch (error) {
      console.error('Failed to check subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const upgradePrompt = (requiredTier: TierType) => {
    toast.error(`This feature requires a ${requiredTier} subscription. Please upgrade to continue.`);
  };

  const setTier = (tier: TierType) => {
    if (tier === 'freemium') {
      setCurrentTier(tier);
      setIsSubscribed(false);
      setSubscriptionEnd(null);
    }
    // For paid tiers, this will be handled by the payment flow
  };

  const canAccess = (feature: string): boolean => {
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
      getTierFeatures,
      isSubscribed,
      subscriptionEnd,
      refreshSubscription,
      isLoading
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
