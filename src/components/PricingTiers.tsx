
import React from 'react';
import TierCard from './TierCard';
import { useTier } from '@/context/TierContext';

const PricingTiers = () => {
  const { currentTier } = useTier();

  const freemiumFeatures = [
    'Basic data insights',
    'Limited API access',
    'Standard reporting',
    'Email support',
    'Single user account'
  ];

  const basicFeatures = [
    'Everything in Freemium',
    'Advanced data analytics',
    'Expanded API access',
    'Custom reporting',
    'Priority email support',
    'Up to 3 user accounts'
  ];

  const proFeatures = [
    'Everything in Basic',
    'Full data insights suite',
    'Unlimited API access',
    'Advanced custom reporting',
    'Custom integrations',
    '24/7 priority support',
    'Unlimited user accounts',
    'Dedicated account manager'
  ];

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

        <div className="mt-16 bg-blue-50 dark:bg-blue-950/20 rounded-2xl p-8 max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold">Your Current Plan: <span className="text-blue-600 capitalize">{currentTier}</span></h3>
              <p className="mt-2 text-foreground/70">
                You can switch between plans anytime
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-full px-4 py-2 border border-gray-200 dark:border-gray-700">
              <span className="text-sm text-foreground/70">Need help choosing? <a href="#" className="text-blue-600 font-medium">Contact us</a></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
