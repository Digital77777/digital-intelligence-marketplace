
import React from 'react';
import TierCard from './TierCard';
import { useTier } from '@/context/TierContext';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Shield, Sparkles, Zap } from 'lucide-react';

const PricingTiers = () => {
  const { currentTier } = useTier();

  const freemiumFeatures = [
    'Access to 10 core AI tools',
    'Basic learning content',
    'Community forums access',
    'Single user account',
    'Limited API access (100 calls/month)',
    'Community support'
  ];

  const basicFeatures = [
    'Everything in Freemium',
    'Access to 100+ AI tools',
    'Team dashboard & collaboration',
    'Workflow automation tools',
    'Up to 10 team members',
    '5,000 API calls per month',
    'Usage analytics and reporting',
    'Priority email support',
    'Advanced security features',
    '10GB storage'
  ];

  const proFeatures = [
    'Everything in Basic',
    'Access to 250+ AI tools',
    'Custom model development',
    'Advanced API integration',
    'White-labeling options',
    'Unlimited team members',
    '50,000 API calls per month',
    'Dedicated account manager',
    '24/7 priority support',
    '100GB storage'
  ];

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
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col md:flex-row gap-8 justify-center flex-wrap">
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <TierCard
              type="freemium"
              name="Freemium"
              price="Free"
              features={freemiumFeatures}
            />
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <TierCard
              type="basic"
              name="Basic"
              price="$29"
              features={basicFeatures}
              popular={true}
            />
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <TierCard
              type="pro"
              name="Pro"
              price="$79"
              features={proFeatures}
            />
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/10 rounded-2xl p-8 max-w-3xl mx-auto border border-blue-100/50 dark:border-blue-800/30 shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold">Your Current Plan: <span className="text-blue-600 capitalize">{currentTier}</span></h3>
              <p className="mt-2 text-foreground/70">
                You can switch between plans anytime
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-full px-4 py-2 border border-gray-200 dark:border-gray-700 shadow-sm">
              <span className="text-sm text-foreground/70">Need help choosing? <a href="#" className="text-blue-600 font-medium">Contact us</a></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
