import {
  AreaChart, ArrowRight, BarChart3, Bot, BookOpen, BrainCircuit, 
  CheckCircle, Code, CoinsIcon, Columns, Database, Eye, FileSpreadsheet, 
  FileText, Beaker, GitFork, Globe, Hammer, Layers, LayoutDashboard, 
  LineChart, Lock, MessageSquare, Microscope, Router, ScrollText, 
  Search, Server, Settings, Shield, ShieldCheck, Sparkles, Users, 
  Workflow, Zap
} from 'lucide-react';
import React from 'react';

export type AIToolTier = 'freemium' | 'basic' | 'pro';

export interface AIToolItem {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  tier: AIToolTier;
  usageLimit?: string;
  uniqueSellingPoint: string;
  demoAvailable: boolean;
  integrations?: string[];
  popularTool?: boolean;
}

export interface ToolCategoryInfo {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export const toolCategories: ToolCategoryInfo[] = [
  {
    id: 'analytics',
    name: 'Analytics & Insights',
    description: 'Visualize data and extract actionable insights',
    icon: React.createElement(BarChart3, { className: "h-5 w-5" })
  },
  {
    id: 'automation',
    name: 'Automation & Workflows',
    description: 'Streamline repetitive tasks and processes',
    icon: React.createElement(Workflow, { className: "h-5 w-5" })
  },
  {
    id: 'content',
    name: 'Content Creation',
    description: 'Generate and optimize various content types',
    icon: React.createElement(FileText, { className: "h-5 w-5" })
  },
  {
    id: 'development',
    name: 'AI Development',
    description: 'Build, train and deploy machine learning models',
    icon: React.createElement(Code, { className: "h-5 w-5" })
  },
  {
    id: 'learning',
    name: 'Learning Tools',
    description: 'Educational resources for AI skill development',
    icon: React.createElement(BookOpen, { className: "h-5 w-5" })
  },
  {
    id: 'collaboration',
    name: 'Collaboration',
    description: 'Team-based tools for shared projects and workflows',
    icon: React.createElement(Users, { className: "h-5 w-5" })
  },
  {
    id: 'security',
    name: 'Security & Compliance',
    description: 'Ensure ethical AI usage and regulatory compliance',
    icon: React.createElement(Shield, { className: "h-5 w-5" })
  },
  {
    id: 'integration',
    name: 'Enterprise Integration',
    description: 'Connect AI capabilities with existing infrastructure',
    icon: React.createElement(Router, { className: "h-5 w-5" })
  },
  {
    id: 'community',
    name: 'Community Tools',
    description: 'Engage with the platform community',
    icon: React.createElement(MessageSquare, { className: "h-5 w-5" })
  },
  {
    id: 'monetization',
    name: 'Monetization',
    description: 'Generate revenue from AI models and services',
    icon: React.createElement(CoinsIcon, { className: "h-5 w-5" })
  }
];

export const aiTools: AIToolItem[] = [
  // FREEMIUM TIER TOOLS
  {
    id: 'insight-lite',
    name: 'InsightLite',
    description: 'Simple dashboard for visualizing data trends including sales, social media stats, and website traffic',
    category: 'analytics',
    icon: React.createElement(LayoutDashboard, { className: "h-5 w-5" }),
    tier: 'freemium',
    usageLimit: '5 pre-built templates, limited to 3 datasets',
    uniqueSellingPoint: 'Get started with data visualization without any technical skills required',
    demoAvailable: true,
    integrations: ['CSV Upload', 'Google Sheets'],
    popularTool: true
  },
  {
    id: 'taskbot-mini',
    name: 'TaskBot Mini',
    description: 'Basic chatbot builder for FAQs and customer support with template-based responses',
    category: 'automation',
    icon: React.createElement(Bot, { className: "h-5 w-5" }),
    tier: 'freemium',
    usageLimit: '50 interactions/month',
    uniqueSellingPoint: 'Integrates with Slack and WhatsApp for seamless deployment',
    demoAvailable: true,
    integrations: ['Slack', 'WhatsApp']
  },
  {
    id: 'copycraft-free',
    name: 'CopyCraft Free',
    description: 'AI-generated social media captions and blog outlines to kickstart your content creation',
    category: 'content',
    icon: React.createElement(ScrollText, { className: "h-5 w-5" }),
    tier: 'freemium',
    usageLimit: '10 outputs/week',
    uniqueSellingPoint: 'Generate engagement-optimized content for multiple platforms',
    demoAvailable: true
  },
  {
    id: 'ai-basics-simulator',
    name: 'AI Basics Simulator',
    description: 'Interactive sandbox to test beginner AI models with guided explanations',
    category: 'learning',
    icon: React.createElement(Beaker, { className: "h-5 w-5" }),
    tier: 'freemium',
    uniqueSellingPoint: 'Hands-on learning with guided tutorials; no coding required',
    demoAvailable: true,
    popularTool: true
  },
  {
    id: 'forum-assistant',
    name: 'Forum Assistant',
    description: 'AI-powered forum moderator that flags spam and suggests replies to common questions',
    category: 'community',
    icon: React.createElement(MessageSquare, { className: "h-5 w-5" }),
    tier: 'freemium',
    usageLimit: '3 moderation actions/day',
    uniqueSellingPoint: 'Limited to public threads with basic moderation capabilities',
    demoAvailable: true
  },

  // BASIC TIER TOOLS
  {
    id: 'dataflow-pro',
    name: 'DataFlow Pro',
    description: 'Advanced dashboards with predictive insights for revenue forecasts and trend analysis',
    category: 'analytics',
    icon: React.createElement(LineChart, { className: "h-5 w-5" }),
    tier: 'basic',
    uniqueSellingPoint: 'Unlimited datasets with exports to CSV/Excel and PDF reports',
    demoAvailable: true,
    integrations: ['Excel', 'Google Analytics', 'HubSpot', 'Salesforce'],
    popularTool: true
  },
  {
    id: 'autopilot-studio',
    name: 'AutoPilot Studio',
    description: 'Customizable automation for repetitive tasks like email sorting, CRM updates, and data entry',
    category: 'automation',
    icon: React.createElement(Zap, { className: "h-5 w-5" }),
    tier: 'basic',
    usageLimit: '10,000 monthly actions',
    uniqueSellingPoint: 'Integrates with Zapier and Google Workspace for extended capabilities',
    demoAvailable: true,
    integrations: ['Zapier', 'Google Workspace', 'Microsoft 365']
  },
  {
    id: 'modelmaker-lite',
    name: 'ModelMaker Lite',
    description: 'Drag-and-drop interface to train basic ML models for sentiment analysis and classification',
    category: 'development',
    icon: React.createElement(BrainCircuit, { className: "h-5 w-5" }),
    tier: 'basic',
    usageLimit: '5 model deployments/month',
    uniqueSellingPoint: 'Pre-trained templates for common use cases with visual training process',
    demoAvailable: true
  },
  {
    id: 'seo-boost-ai',
    name: 'SEO Boost AI',
    description: 'AI-driven SEO audits and keyword suggestions for websites and blogs with actionable recommendations',
    category: 'content',
    icon: React.createElement(Search, { className: "h-5 w-5" }),
    tier: 'basic',
    uniqueSellingPoint: 'Unlimited site scans with competitor analysis for 3 domains',
    demoAvailable: true,
    integrations: ['WordPress', 'Shopify', 'Google Search Console']
  },
  {
    id: 'teamsync-ai',
    name: 'TeamSync AI',
    description: 'Shared workspace to co-edit AI models, documents, and workflows with real-time updates',
    category: 'collaboration',
    icon: React.createElement(Users, { className: "h-5 w-5" }),
    tier: 'basic',
    uniqueSellingPoint: '5 team members included with version control and commenting',
    demoAvailable: true,
    integrations: ['Slack', 'Microsoft Teams', 'Asana', 'Trello'],
    popularTool: true
  },

  // PRO TIER TOOLS
  {
    id: 'predictrix-enterprise',
    name: 'Predictrix Enterprise',
    description: 'Real-time AI predictive modeling with multi-source data integration for business intelligence',
    category: 'analytics',
    icon: React.createElement(AreaChart, { className: "h-5 w-5" }),
    tier: 'pro',
    uniqueSellingPoint: 'Customizable dashboards with API access to Salesforce, Snowflake, and more',
    demoAvailable: true,
    integrations: ['Salesforce', 'Snowflake', 'AWS', 'Azure', 'Google Cloud']
  },
  {
    id: 'neuroforge-pro',
    name: 'NeuroForge Pro',
    description: 'No-code platform to build, train, and deploy custom AI/ML models with enterprise capabilities',
    category: 'development',
    icon: React.createElement(BrainCircuit, { className: "h-5 w-5" }),
    tier: 'pro',
    uniqueSellingPoint: 'GPU acceleration with model hosting and 99.9% uptime SLA',
    demoAvailable: true,
    integrations: ['AWS SageMaker', 'Azure ML', 'Google AI Platform', 'Kubernetes'],
    popularTool: true
  },
  {
    id: 'omniflow-ai',
    name: 'OmniFlow AI',
    description: 'End-to-end workflow automation with AI decision-making for inventory management and business processes',
    category: 'automation',
    icon: React.createElement(Workflow, { className: "h-5 w-5" }),
    tier: 'pro',
    uniqueSellingPoint: 'Integrates with ERP systems featuring AI-powered anomaly detection',
    demoAvailable: true,
    integrations: ['SAP', 'Oracle', 'NetSuite', 'Sage', 'Microsoft Dynamics']
  },
  {
    id: 'ai-marketplace-publisher',
    name: 'AI Marketplace Publisher',
    description: 'Sell AI tools/services directly on the platform with customizable pricing and terms',
    category: 'monetization',
    icon: React.createElement(CoinsIcon, { className: "h-5 w-5" }),
    tier: 'pro',
    uniqueSellingPoint: '10% platform fee (vs. 30% industry standard) with built-in marketing tools',
    demoAvailable: true,
    integrations: ['Stripe', 'PayPal', 'Google Analytics']
  },
  {
    id: 'ethicsguard-ai',
    name: 'EthicsGuard AI',
    description: 'Automated compliance checks for GDPR, AI ethics, and bias detection with detailed reporting',
    category: 'security',
    icon: React.createElement(ShieldCheck, { className: "h-5 w-5" }),
    tier: 'pro',
    uniqueSellingPoint: 'Audit reports with real-time alerts for regulatory violations',
    demoAvailable: true,
    integrations: ['ComplianceHub', 'RegTech API', 'GDPR Framework']
  },
  {
    id: 'cloudbridge-ai',
    name: 'CloudBridge AI',
    description: 'Seamless integration of AI models with AWS, Azure, and Google Cloud for enterprise deployment',
    category: 'integration',
    icon: React.createElement(Server, { className: "h-5 w-5" }),
    tier: 'pro',
    uniqueSellingPoint: 'One-click deployment with dedicated support for hybrid cloud setups',
    demoAvailable: true,
    integrations: ['AWS', 'Azure', 'Google Cloud', 'Private Cloud', 'Kubernetes'],
    popularTool: true
  }
];

export const getTierTools = (tier: AIToolTier): AIToolItem[] => {
  return aiTools.filter(tool => tool.tier === tier);
};

export const getCategoryTools = (category: string): AIToolItem[] => {
  return aiTools.filter(tool => tool.category === category);
};

export const getPopularTools = (): AIToolItem[] => {
  return aiTools.filter(tool => tool.popularTool);
};

export const getTierLabel = (tier: AIToolTier): string => {
  switch (tier) {
    case 'freemium': return 'Freemium';
    case 'basic': return 'Basic';
    case 'pro': return 'Pro';
    default: return tier;
  }
};

export const getTierDescription = (tier: AIToolTier): string => {
  switch (tier) {
    case 'freemium': 
      return 'Free tools to help you get started with AI and explore basic capabilities';
    case 'basic': 
      return 'Professional tools for individuals and small teams with expanded functionality';
    case 'pro': 
      return 'Enterprise-grade tools with advanced features, integrations, and scalability';
    default: 
      return '';
  }
};

export const getTierBadgeColor = (tier: AIToolTier): string => {
  switch (tier) {
    case 'freemium': 
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    case 'basic': 
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    case 'pro': 
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800';
    default: 
      return '';
  }
};

export const getTierIcon = (tier: AIToolTier): React.ReactNode => {
  switch (tier) {
    case 'freemium': 
      return React.createElement(Sparkles, { className: "h-4 w-4" });
    case 'basic': 
      return React.createElement(Shield, { className: "h-4 w-4" });
    case 'pro': 
      return React.createElement(Zap, { className: "h-4 w-4" });
    default: 
      return null;
  }
};
