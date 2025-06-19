import { AIToolTier } from './ai-tools-tiers';

export interface PricingTier {
  type: AIToolTier;
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    type: 'freemium' as AIToolTier,
    name: 'Freemium',
    price: 'Free',
    features: [
      'Access to 10 core AI tools',
      'Basic learning content',
      'Community forums access',
      'Single user account',
      'Limited API access (100 calls/month)',
      'Community support'
    ]
  },
  {
    type: 'basic' as AIToolTier,
    name: 'Basic',
    price: '$21',
    features: [
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
    ],
    popular: true
  },
  {
    type: 'pro' as AIToolTier,
    name: 'Pro',
    price: '$46',
    features: [
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
    ]
  }
];
