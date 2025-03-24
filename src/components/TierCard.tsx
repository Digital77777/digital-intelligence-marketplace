
import React from 'react';
import { Check } from 'lucide-react';
import Button from './Button';
import { useTier, TierType } from '@/context/TierContext';
import { cn } from '@/lib/utils';

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
  const isActive = currentTier === type;

  const handleSelectTier = () => {
    setTier(type);
  };

  return (
    <div 
      className={cn(
        "relative w-full max-w-md rounded-2xl border overflow-hidden transition-all duration-300 transform",
        isActive 
          ? "border-blue-500 shadow-lg scale-[1.02] z-10" 
          : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700",
        popular && !isActive && "sm:mt-6"
      )}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-bl from-blue-600 to-purple-600 text-white px-4 py-1 text-sm font-medium">
          Popular
        </div>
      )}
      
      <div className="p-6 sm:p-8 flex flex-col h-full">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className="mt-4">
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
                <div className="flex-shrink-0 h-5 w-5 text-green-500">
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
            className="w-full justify-center"
            onClick={handleSelectTier}
            disabled={isActive}
          >
            {isActive ? 'Current Tier' : 'Select Tier'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TierCard;
