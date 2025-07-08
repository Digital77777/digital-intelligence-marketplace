
import React from 'react';
import { Check, Minus } from 'lucide-react';
import { AIToolTier, getTierBadgeColor, getTierIcon, getTierLabel } from '@/data/ai-tools-tiers';
import { Button } from '@/components/ui/button';
import { useTier } from '@/context/TierContext';
import { cn } from '@/lib/utils';

interface FeatureComparisonItem {
  feature: string;
  description: string;
  tiers: {
    freemium: boolean | string;
    basic: boolean | string;
    pro: boolean | string;
  };
}

const comparisonFeatures: FeatureComparisonItem[] = [
  {
    feature: 'AI Tools Access',
    description: 'Number of tools available',
    tiers: {
      freemium: '10 tools',
      basic: '100+ tools',
      pro: '250+ tools'
    }
  },
  {
    feature: 'Analytics Capabilities',
    description: 'Data visualization and insights',
    tiers: {
      freemium: 'Basic charts',
      basic: 'Advanced dashboards',
      pro: 'Real-time predictive'
    }
  },
  {
    feature: 'Model Development',
    description: 'Build and train custom AI models',
    tiers: {
      freemium: false,
      basic: 'Limited templates',
      pro: 'Full custom models'
    }
  },
  {
    feature: 'Workflow Automation',
    description: 'Automate repetitive tasks',
    tiers: {
      freemium: 'Basic tasks',
      basic: '10,000 actions/month',
      pro: 'Unlimited actions'
    }
  },
  {
    feature: 'Team Collaboration',
    description: 'Work together on AI projects',
    tiers: {
      freemium: false,
      basic: '10 team members',
      pro: 'Unlimited members'
    }
  },
  {
    feature: 'Data Storage',
    description: 'Storage for models and datasets',
    tiers: {
      freemium: '500MB',
      basic: '10GB',
      pro: '100GB'
    }
  },
  {
    feature: 'API Access',
    description: 'Programmatically access tools',
    tiers: {
      freemium: '100 calls/month',
      basic: '5,000 calls/month',
      pro: '50,000 calls/month'
    }
  },
  {
    feature: 'Enterprise Integrations',
    description: 'Connect with existing systems',
    tiers: {
      freemium: false,
      basic: 'Basic integrations',
      pro: 'Advanced integrations'
    }
  },
  {
    feature: 'Monetization Tools',
    description: 'Sell your AI models & tools',
    tiers: {
      freemium: false,
      basic: false,
      pro: true
    }
  },
  {
    feature: 'Security & Compliance',
    description: 'GDPR, ethics, and bias detection',
    tiers: {
      freemium: 'Basic security',
      basic: 'Enhanced security',
      pro: 'Full compliance suite'
    }
  },
  {
    feature: 'Support Level',
    description: 'Technical assistance',
    tiers: {
      freemium: 'Community',
      basic: 'Email support',
      pro: 'Priority support'
    }
  }
];

const ToolTierComparison: React.FC = () => {
  const { currentTier, setTier } = useTier();
  
  const tierOrder: AIToolTier[] = ['freemium', 'basic', 'pro'];
  
  const renderCellContent = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <Minus className="h-5 w-5 text-gray-300 dark:text-gray-600 mx-auto" />
      );
    }
    return <span className="text-sm">{value}</span>;
  };

  const getTierPrice = (tier: AIToolTier): string => {
    switch (tier) {
      case 'freemium': 
        return 'Free';
      case 'basic': 
        return '$21/mo';
      case 'pro': 
        return '$46/mo';
      default: 
        return '';
    }
  };
  
  return (
    <div className="rounded-xl overflow-hidden border shadow-sm bg-white dark:bg-gray-950">
      {/* Header Row */}
      <div className="grid grid-cols-4 border-b">
        <div className="p-4 bg-muted/50">
          <h3 className="font-semibold">Features</h3>
        </div>
        
        {tierOrder.map((tier) => (
          <div 
            key={tier} 
            className={cn(
              "p-4 text-center border-l",
              currentTier === tier ? "bg-primary/5" : ""
            )}
          >
            <div className="flex flex-col items-center">
              <div className={`px-3 py-1 rounded-full text-sm flex items-center gap-1.5 mb-2 ${getTierBadgeColor(tier)}`}>
                {getTierIcon(tier)}
                <span>{getTierLabel(tier)}</span>
              </div>
              <span className="font-semibold">{getTierPrice(tier)}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Feature Rows */}
      {comparisonFeatures.map((item, idx) => (
        <div 
          key={idx} 
          className={cn(
            "grid grid-cols-4 border-b", 
            idx % 2 === 0 ? "bg-muted/20" : ""
          )}
        >
          <div className="p-4">
            <div className="font-medium text-sm">{item.feature}</div>
            <div className="text-xs text-muted-foreground">{item.description}</div>
          </div>
          
          {tierOrder.map((tier) => (
            <div 
              key={tier} 
              className={cn(
                "p-4 text-center border-l flex items-center justify-center",
                currentTier === tier ? "bg-primary/5" : ""
              )}
            >
              {renderCellContent(item.tiers[tier])}
            </div>
          ))}
        </div>
      ))}
      
      {/* Action Row */}
      <div className="grid grid-cols-4 bg-muted/30">
        <div className="p-4"></div>
        
        {tierOrder.map((tier) => (
          <div key={tier} className="p-4 flex justify-center border-l">
            <Button
              variant={currentTier === tier ? "default" : "outline"}
              disabled={currentTier === tier}
              onClick={() => setTier(tier)}
              className="w-full"
            >
              {currentTier === tier ? "Current Plan" : "Select Plan"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolTierComparison;
