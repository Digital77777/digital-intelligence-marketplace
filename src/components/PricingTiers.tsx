
import React, { useState } from 'react';
import TierCard from './TierCard';
import { useTier } from '@/context/TierContext';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Shield, Sparkles, Zap, Loader2, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { pricingTiers } from '@/data/pricingTiers';

const PricingTiers = () => {
  const { currentTier, isSubscribed, subscriptionEnd, refreshSubscription, isLoading } = useTier();
  const { user } = useUser();
  const [isPortalLoading, setIsPortalLoading] = useState(false);

  const getTierIcon = (tier: string) => {
    switch(tier) {
      case 'basic':
        return <Shield className="h-4 w-4 text-blue-500" />;
      case 'pro':
        return <Zap className="h-4 w-4 text-purple-500" />;
      default:
        return <Sparkles className="h-4 w-4 text-amber-500" />;
    }
  };

  const getTierAlertColor = (tier: string) => {
    switch(tier) {
      case 'basic':
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
      case 'pro':
        return "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800";
      default:
        return "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800";
    }
  };

  const handleManageSubscription = async () => {
    if (!user) {
      toast.error("Please sign in to manage your subscription");
      return;
    }

    setIsPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) {
        throw new Error(error.message);
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No portal URL received');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast.error('Failed to open subscription management');
    } finally {
      setIsPortalLoading(false);
    }
  };

  return (
    <section id="pricing" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Choose the Perfect Plan
          </h2>
          <p className="mt-4 text-xl text-foreground/70 max-w-3xl mx-auto">
            Select the tier that best fits your needs. Change anytime as your requirements evolve.
          </p>
        </div>

        {currentTier && (
          <Alert className={`mb-8 ${getTierAlertColor(currentTier)}`}>
            {getTierIcon(currentTier)}
            <AlertTitle>You're on the {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)} Plan</AlertTitle>
            <AlertDescription>
              {currentTier === 'freemium' && "You have access to 10 core AI tools and community features. Upgrade to Basic or Pro for advanced features."}
              {currentTier === 'basic' && "You now have access to the advanced collaboration features, team dashboard, workflow automation, and extended AI tool access."}
              {currentTier === 'pro' && "You have unlimited access to all features, tools, and premium support services."}
              {isSubscribed && subscriptionEnd && (
                <div className="mt-2 text-sm">
                  <span className="font-medium">Subscription ends:</span> {new Date(subscriptionEnd).toLocaleDateString()}
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col md:flex-row gap-8 justify-center flex-wrap">
          {pricingTiers.map((tier) => (
            <div className="animate-slide-up" style={{ animationDelay: `0.${pricingTiers.indexOf(tier) + 1}s` }}>
              <TierCard
                key={tier.type}
                type={tier.type}
                name={tier.name}
                price={tier.price}
                features={tier.features}
                popular={tier.popular}
              />
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/10 rounded-2xl p-8 max-w-3xl mx-auto border border-blue-100/50 dark:border-blue-800/30 shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold">Your Current Plan: <span className="text-blue-600 capitalize">{currentTier}</span></h3>
              <p className="mt-2 text-foreground/70">
                {isSubscribed ? 'Manage your subscription anytime' : 'You can upgrade between plans anytime'}
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={refreshSubscription}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Info className="h-4 w-4" />
                    Refresh Status
                  </>
                )}
              </Button>
              
              {isSubscribed && (
                <Button 
                  onClick={handleManageSubscription}
                  disabled={isPortalLoading}
                  className="flex items-center gap-2"
                >
                  {isPortalLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Opening...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" />
                      Manage Subscription
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
