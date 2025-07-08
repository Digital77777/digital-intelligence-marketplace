
import React from 'react';
import { useTierGuard } from '@/hooks/useAuthGuard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Zap } from 'lucide-react';

interface TierGuardProps {
  children: React.ReactNode;
  requiredTier: 'basic' | 'pro';
  feature?: string;
}

const TierGuard: React.FC<TierGuardProps> = ({ 
  children, 
  requiredTier,
  feature = 'This feature'
}) => {
  const { hasAccess, promptUpgrade, currentTier } = useTierGuard(requiredTier);

  if (!hasAccess) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Lock className="w-12 h-12 text-gray-400" />
          </div>
          <CardTitle className="text-xl">
            {requiredTier === 'pro' ? 'Pro' : 'Basic'} Feature
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            {feature} requires a {requiredTier} tier subscription.
          </p>
          <p className="text-sm text-muted-foreground">
            Current tier: <span className="capitalize font-medium">{currentTier}</span>
          </p>
          <Button onClick={promptUpgrade} className="w-full">
            <Zap className="w-4 h-4 mr-2" />
            Upgrade to {requiredTier === 'pro' ? 'Pro' : 'Basic'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};

export default TierGuard;
