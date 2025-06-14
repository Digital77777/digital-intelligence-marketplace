
import React, { useState } from 'react';
import { Check, Shield, Sparkles, Zap, Loader2 } from 'lucide-react';
import Button from './Button';
import { useTier, TierType } from '@/context/TierContext';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TierCardProps {
  type: TierType;
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const TierCard: React.FC<TierCardProps> = ({ 
  type, 
  name, 
  price, 
  features, 
  popular = false 
}) => {
  const { currentTier, setTier } = useTier();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const isActive = currentTier === type;

  const handleSelectTier = async () => {
    if (!user) {
      toast.error("Please sign in to upgrade your plan");
      return;
    }

    if (type === 'freemium') {
      setTier(type);
      toast.success("Switched to Freemium plan");
      return;
    }

    if (isActive) {
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { tier: type }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to start checkout process');
    } finally {
      setIsLoading(false);
    }
  };

  const getTierIcon = () => {
    switch(type) {
      case 'basic':
        return <Shield className="h-5 w-5 text-blue-500 mr-2" />;
      case 'pro':
        return <Zap className="h-5 w-5 text-purple-500 mr-2" />;
      default:
        return <Sparkles className="h-5 w-5 text-amber-500 mr-2" />;
    }
  };

  const getTierGradient = () => {
    switch(type) {
      case 'basic':
        return "from-blue-600 to-indigo-600";
      case 'pro':
        return "from-purple-600 to-pink-600";
      default:
        return "from-amber-500 to-orange-500";
    }
  };

  const getButtonText = () => {
    if (isActive) return 'Current Tier';
    if (type === 'freemium') return 'Switch to Free';
    return `Upgrade to ${name}`;
  };

  return (
    <div 
      className={cn(
        "relative w-full max-w-md rounded-2xl overflow-hidden transition-all duration-300 transform",
        isActive 
          ? `border-2 ${type === 'basic' ? 'border-blue-500' : type === 'pro' ? 'border-purple-500' : 'border-amber-500'} shadow-lg scale-[1.02] z-10` 
          : "border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md",
        popular && !isActive && "sm:mt-6",
        isActive ? "bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950" : "bg-white dark:bg-gray-900"
      )}
    >
      {popular && (
        <div className={`absolute top-0 right-0 bg-gradient-to-bl ${getTierGradient()} text-white px-4 py-1 text-sm font-medium`}>
          Popular
        </div>
      )}
      
      {isActive && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      )}
      
      <div className="p-6 sm:p-8 flex flex-col h-full">
        <div className="mb-6">
          <div className="flex items-center">
            {getTierIcon()}
            <h3 className="text-lg font-semibold">{name}</h3>
          </div>
          <div className="mt-4 flex items-baseline">
            <span className="text-3xl font-bold">{price}</span>
            {price !== "Free" && <span className="text-foreground/60 ml-2">/month</span>}
          </div>
          <p className="mt-2 text-sm text-foreground/60">
            {type === 'freemium' && 'Perfect for getting started'}
            {type === 'basic' && 'Great for individual professionals'}
            {type === 'pro' && 'Best for businesses and teams'}
          </p>
        </div>

        <div className="flex-grow">
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className={`flex-shrink-0 h-5 w-5 ${type === 'basic' ? 'text-blue-500' : type === 'pro' ? 'text-purple-500' : 'text-green-500'}`}>
                  <Check size={18} />
                </div>
                <p className="ml-3 text-sm text-foreground/70">{feature}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8">
          <Button
            variant={isActive ? "premium" : "outline"}
            className={cn(
              "w-full justify-center",
              !isActive && "hover:bg-gradient-to-r hover:text-white",
              !isActive && type === 'basic' && "hover:from-blue-600 hover:to-indigo-600",
              !isActive && type === 'pro' && "hover:from-purple-600 hover:to-pink-600",
              !isActive && type === 'freemium' && "hover:from-amber-500 hover:to-orange-500"
            )}
            onClick={handleSelectTier}
            disabled={isActive || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              getButtonText()
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TierCard;
