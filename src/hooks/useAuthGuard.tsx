
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';

export const useAuthGuard = (redirectTo: string = '/auth') => {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate(redirectTo);
    }
  }, [user, loading, navigate, redirectTo]);

  return { user, loading, isAuthenticated: !!user };
};

export const useTierGuard = (requiredTier: 'basic' | 'pro', redirectTo: string = '/pricing') => {
  const { currentTier, upgradePrompt } = useTier();
  const { isAuthenticated } = useAuthGuard();

  const hasAccess = () => {
    if (requiredTier === 'basic') {
      return currentTier === 'basic' || currentTier === 'pro';
    }
    if (requiredTier === 'pro') {
      return currentTier === 'pro';
    }
    return true;
  };

  const promptUpgrade = () => {
    upgradePrompt(requiredTier);
  };

  return {
    hasAccess: hasAccess(),
    isAuthenticated,
    promptUpgrade,
    currentTier
  };
};
