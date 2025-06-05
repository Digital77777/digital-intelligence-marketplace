import React from 'react';
import { 
  LineChart, 
  BarChart3, 
  Code, 
  HelpCircle, 
  Settings, 
  MessageSquare, 
  Mic, 
  Send, 
  Satellite, 
  CloudRain, 
  Sprout,
  ArrowLeft,
  Bell,
  User,
  Check,
  Info,
  Key,
  Lock,
  Server,
  ExternalLink,
  ArrowUpRight,
  Rocket,
  Star,
  Users,
  Zap,
  Shield,
  Globe,
  Play,
  BookOpen
} from 'lucide-react';

export interface AIToolItem {
  id: string;
  name: string;
  description: string;
  category: string;
  tier: string;
  icon: React.ReactNode;
  uniqueSellingPoint: string;
  use_cases: string[];
  rationale: string;
  usageLimit?: string;
  integrations?: string[];
  image_url?: string;
}

export interface ToolCategory {
  id: string;
  name: string;
  count: number;
}

export interface ToolCategoryInfo {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  count: number;
}

export const getTierBadgeColor = (tier: string) => {
  switch (tier) {
    case 'freemium':
      return 'bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/20';
    case 'basic':
      return 'bg-blue-50 text-blue-800 hover:bg-blue-100 dark:bg-blue-950/20';
    case 'pro':
      return 'bg-purple-50 text-purple-800 hover:bg-purple-100 dark:bg-purple-950/20';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getTierIcon = (tier: string) => {
  switch (tier) {
    case 'freemium':
      return React.createElement(Lock, { className: 'w-3 h-3' });
    case 'basic':
      return React.createElement(Key, { className: 'w-3 h-3' });
    case 'pro':
      return React.createElement(Rocket, { className: 'w-3 h-3' });
    default:
      return null;
  }
};

export const getTierLabel = (tier: string) => {
  return tier.charAt(0).toUpperCase() + tier.slice(1);
};

// AI Tools Data with CropMind AI added
export const aiTools: AIToolItem[] = [
  {
    id: 'cropmind-ai',
    name: 'CropMind AI',
    description: 'Smart farming assistant providing personalized crop advice via chat, voice, and WhatsApp integration',
    category: 'agriculture',
    tier: 'basic',
    icon: React.createElement(Sprout),
    uniqueSellingPoint: 'First AI assistant designed specifically for smallholder farmers with offline capabilities and local language support',
    use_cases: [
      'Get personalized crop advice based on satellite data',
      'Receive weather-based farming recommendations',
      'Monitor crop health through NDVI analysis',
      'Connect with local agricultural experts',
      'Access farming tips in local languages'
    ],
    rationale: 'Empowers farmers with AI-driven insights to increase crop yields and reduce losses through timely, data-driven recommendations',
    usageLimit: 'Basic: 50 queries/month, Pro: Unlimited queries + WhatsApp integration',
    integrations: ['WhatsApp', 'Satellite APIs', 'Weather APIs', 'Soil Analysis'],
    image_url: '/placeholder.svg'
  },
  {
    id: 'data-insights-analyzer',
    name: 'Data Insights Analyzer',
    description: 'Uncover hidden patterns in your data with AI-driven analytics and visualization tools',
    category: 'analytics',
    tier: 'pro',
    icon: React.createElement(LineChart),
    uniqueSellingPoint: 'Automatically identifies key trends and anomalies, saving hours of manual analysis',
    use_cases: [
      'Analyze sales data to identify top-performing products',
      'Detect fraudulent transactions in real-time',
      'Predict customer churn based on behavior patterns',
      'Optimize marketing campaigns for maximum ROI',
      'Improve supply chain efficiency through demand forecasting'
    ],
    rationale: 'Transforms raw data into actionable insights, empowering businesses to make smarter decisions and gain a competitive edge',
    usageLimit: 'Pro: Unlimited data sources, advanced algorithms, and priority support',
    integrations: ['Salesforce', 'Google Analytics', 'Tableau', 'Excel'],
    image_url: '/placeholder.svg'
  },
  {
    id: 'workflow-automator',
    name: 'Workflow Automator',
    description: 'Streamline your business processes with intelligent automation and robotic process automation (RPA)',
    category: 'automation',
    tier: 'basic',
    icon: React.createElement(Code),
    uniqueSellingPoint: 'Automates repetitive tasks across multiple systems, freeing up employees to focus on higher-value work',
    use_cases: [
      'Automate invoice processing and payment approvals',
      'Generate personalized email campaigns based on customer data',
      'Schedule social media posts and monitor engagement',
      'Onboard new employees with automated task assignments',
      'Manage inventory levels and trigger reorders'
    ],
    rationale: 'Reduces operational costs, improves accuracy, and accelerates business growth by automating routine tasks and workflows',
    usageLimit: 'Basic: 10 automated workflows, 1000 tasks/month',
    integrations: ['Slack', 'Trello', 'Asana', 'Zapier'],
    image_url: '/placeholder.svg'
  },
  {
    id: 'content-generator-pro',
    name: 'Content Generator Pro',
    description: 'Create high-quality content in minutes with AI-powered writing assistance and content optimization tools',
    category: 'content',
    tier: 'pro',
    icon: React.createElement(HelpCircle),
    uniqueSellingPoint: 'Generates original, engaging content tailored to your brand voice and target audience',
    use_cases: [
      'Write blog posts, articles, and website copy',
      'Create social media posts and ad copy',
      'Generate email newsletters and marketing materials',
      'Optimize content for search engines (SEO)',
      'Translate content into multiple languages'
    ],
    rationale: 'Saves time and resources on content creation, enabling businesses to scale their content marketing efforts and drive more traffic and leads',
    usageLimit: 'Pro: Unlimited content generation, advanced SEO tools, and plagiarism checker',
    integrations: ['WordPress', 'Google Docs', 'HubSpot', 'SEMrush'],
    image_url: '/placeholder.svg'
  },
  {
    id: 'ai-code-assistant',
    name: 'AI Code Assistant',
    description: 'Write code faster and more efficiently with AI-powered code completion, debugging, and code generation tools',
    category: 'development',
    tier: 'basic',
    icon: React.createElement(Code),
    uniqueSellingPoint: 'Suggests code snippets, identifies bugs, and generates code from natural language descriptions',
    use_cases: [
      'Write code in multiple programming languages',
      'Debug code and identify errors',
      'Generate code from natural language descriptions',
      'Refactor code and improve code quality',
      'Automate repetitive coding tasks'
    ],
    rationale: 'Accelerates software development, reduces errors, and improves code quality, enabling developers to build better software faster',
    usageLimit: 'Basic: 500 code suggestions/month, limited language support',
    integrations: ['VS Code', 'GitHub', 'GitLab', 'Stack Overflow'],
    image_url: '/placeholder.svg'
  },
  {
    id: 'ai-tutor',
    name: 'AI Tutor',
    description: 'Personalized learning platform powered by AI',
    category: 'learning',
    tier: 'freemium',
    icon: React.createElement(BookOpen),
    uniqueSellingPoint: 'Adaptive learning paths tailored to individual student needs',
    use_cases: [
      'Personalized learning',
      'Adaptive assessments',
      'Automated feedback',
      'Content recommendations',
      'Progress tracking'
    ],
    rationale: 'Democratizes education, making personalized learning accessible to all',
    usageLimit: 'Freemium: Limited content, basic features',
    integrations: ['Google Classroom', 'Zoom', 'Slack'],
    image_url: '/placeholder.svg'
  },
  {
    id: 'team-collab-ai',
    name: 'Team Collab AI',
    description: 'AI-enhanced collaboration platform',
    category: 'collaboration',
    tier: 'basic',
    icon: React.createElement(Users),
    uniqueSellingPoint: 'AI-driven task assignments and progress tracking',
    use_cases: [
      'Smart task assignments',
      'Automated progress tracking',
      'Meeting summaries',
      'Sentiment analysis',
      'Conflict resolution'
    ],
    rationale: 'Enhances team productivity and collaboration through AI-driven insights',
    usageLimit: 'Basic: Limited users, basic features',
    integrations: ['Slack', 'Microsoft Teams', 'Asana'],
    image_url: '/placeholder.svg'
  },
  {
    id: 'community-builder-ai',
    name: 'Community Builder AI',
    description: 'AI-powered community management tool',
    category: 'community',
    tier: 'pro',
    icon: React.createElement(MessageSquare),
    uniqueSellingPoint: 'Automated moderation and engagement analysis',
    use_cases: [
      'Automated moderation',
      'Sentiment analysis',
      'Engagement analysis',
      'Content recommendations',
      'Spam detection'
    ],
    rationale: 'Fosters healthy online communities with AI-driven moderation and engagement tools',
    usageLimit: 'Pro: Unlimited members, advanced features',
    integrations: ['Discord', 'Reddit', 'Facebook Groups'],
    image_url: '/placeholder.svg'
  },
  {
    id: 'monetize-ai',
    name: 'Monetize AI',
    description: 'AI-driven monetization platform',
    category: 'monetization',
    tier: 'pro',
    icon: React.createElement(Star),
    uniqueSellingPoint: 'AI-powered pricing and revenue optimization',
    use_cases: [
      'Dynamic pricing',
      'Revenue optimization',
      'Churn prediction',
      'Personalized offers',
      'Automated A/B testing'
    ],
    rationale: 'Maximizes revenue and profitability with AI-driven pricing and monetization strategies',
    usageLimit: 'Pro: Unlimited products, advanced features',
    integrations: ['Stripe', 'PayPal', 'Shopify'],
    image_url: '/placeholder.svg'
  },
  {
    id: 'security-guard-ai',
    name: 'Security Guard AI',
    description: 'AI-powered security solution',
    category: 'security',
    tier: 'basic',
    icon: React.createElement(Lock),
    uniqueSellingPoint: 'Real-time threat detection and prevention',
    use_cases: [
      'Real-time threat detection',
      'Anomaly detection',
      'Fraud prevention',
      'Automated incident response',
      'Vulnerability scanning'
    ],
    rationale: 'Protects businesses from cyber threats with AI-driven security solutions',
    usageLimit: 'Basic: Limited devices, basic features',
    integrations: ['AWS', 'Azure', 'Google Cloud'],
    image_url: '/placeholder.svg'
  },
  {
    id: 'integration-hub-ai',
    name: 'Integration Hub AI',
    description: 'AI-powered integration platform',
    category: 'integration',
    tier: 'pro',
    icon: React.createElement(Zap),
    uniqueSellingPoint: 'Automated integration and data mapping',
    use_cases: [
      'Automated integration',
      'Data mapping',
      'Workflow automation',
      'API management',
      'Real-time monitoring'
    ],
    rationale: 'Simplifies integration and data management with AI-driven automation',
    usageLimit: 'Pro: Unlimited integrations, advanced features',
    integrations: ['Salesforce', 'SAP', 'Oracle'],
    image_url: '/placeholder.svg'
  },
];

export const categories: ToolCategoryInfo[] = [
  {
    id: 'agriculture',
    name: 'Agriculture & Farming',
    description: 'AI tools for modern farming, crop management, and agricultural optimization',
    icon: React.createElement(Sprout),
    count: aiTools.filter(tool => tool.category === 'agriculture').length
  },
  {
    id: 'analytics',
    name: 'Analytics & BI',
    description: 'AI tools for data analysis, visualization, and business intelligence',
    icon: React.createElement(LineChart),
    count: aiTools.filter(tool => tool.category === 'analytics').length
  },
  {
    id: 'automation',
    name: 'Automation',
    description: 'AI tools for automating tasks, workflows, and processes',
    icon: React.createElement(Code),
    count: aiTools.filter(tool => tool.category === 'automation').length
  },
  {
    id: 'content',
    name: 'Content Creation',
    description: 'AI tools for generating text, images, and other types of content',
    icon: React.createElement(HelpCircle),
    count: aiTools.filter(tool => tool.category === 'content').length
  },
  {
    id: 'development',
    name: 'Development',
    description: 'AI tools for software development, testing, and deployment',
    icon: React.createElement(Code),
    count: aiTools.filter(tool => tool.category === 'development').length
  },
  {
    id: 'learning',
    name: 'Education & Learning',
    description: 'AI tools for personalized learning and education',
    icon: React.createElement(BookOpen),
    count: aiTools.filter(tool => tool.category === 'learning').length
  },
  {
    id: 'collaboration',
    name: 'Collaboration',
    description: 'AI tools for team collaboration and communication',
    icon: React.createElement(Users),
    count: aiTools.filter(tool => tool.category === 'collaboration').length
  },
  {
    id: 'community',
    name: 'Community',
    description: 'AI tools for community management and engagement',
    icon: React.createElement(MessageSquare),
    count: aiTools.filter(tool => tool.category === 'community').length
  },
  {
    id: 'monetization',
    name: 'Monetization',
    description: 'AI tools for revenue optimization and monetization',
    icon: React.createElement(Star),
    count: aiTools.filter(tool => tool.category === 'monetization').length
  },
  {
    id: 'security',
    name: 'Security',
    description: 'AI tools for cybersecurity and threat detection',
    icon: React.createElement(Lock),
    count: aiTools.filter(tool => tool.category === 'security').length
  },
  {
    id: 'integration',
    name: 'Integration',
    description: 'AI tools for system integration and data management',
    icon: React.createElement(Zap),
    count: aiTools.filter(tool => tool.category === 'integration').length
  },
];
