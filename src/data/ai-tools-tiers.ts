export type AIToolTier = 'freemium' | 'basic' | 'pro';

export interface AIToolItem {
  id: string;
  name: string;
  description: string;
  category: string;
  tier: AIToolTier;
  icon: string;
  use_cases?: string[];
  rationale?: string;
  usageLimit?: string;
  uniqueSellingPoint?: string;
  integrations?: string[];
  demoAvailable?: boolean;
  popularTool?: boolean;
}

export const getTierLabel = (tier: AIToolTier | 'all'): string => {
  switch (tier) {
    case 'freemium': return 'Free';
    case 'basic': return 'Basic';
    case 'pro': return 'Pro';
    case 'all': return 'All Tiers';
    default: return tier;
  }
};

export const getTierIcon = (tier: AIToolTier | 'all'): string => {
  switch (tier) {
    case 'freemium': return '🆓';
    case 'basic': return '🔹';
    case 'pro': return '⭐';
    case 'all': return '🔍';
    default: return '•';
  }
};

export const getTierBadgeColor = (tier: AIToolTier | 'all'): string => {
  switch (tier) {
    case 'freemium': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'basic': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    case 'pro': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
    case 'all': return 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const toolCategories = [
  { id: 'image-generation', name: 'Image Generation', icon: '🖼️' },
  { id: 'text-tools', name: 'Text Tools', icon: '📝' },
  { id: 'development', name: 'Development', icon: '💻' },
  { id: 'productivity', name: 'Productivity', icon: '⚡' },
  { id: 'marketing', name: 'Marketing', icon: '📊' },
  { id: 'video-editing', name: 'Video Editing', icon: '🎬' },
  { id: 'music', name: 'Music', icon: '🎵' },
  { id: 'voice', name: 'Voice', icon: '🎤' },
  { id: 'data-analysis', name: 'Data Analysis', icon: '📊' },
  { id: 'automation', name: 'Automation', icon: '⚙️' },
  { id: 'collaboration', name: 'Collaboration', icon: '👥' },
  { id: 'machine-learning', name: 'Machine Learning', icon: '🧠' },
  { id: 'seo', name: 'SEO', icon: '🔍' },
  { id: 'ethics', name: 'AI Ethics', icon: '🛡️' },
  { id: 'cloud', name: 'Cloud Integration', icon: '☁️' }
];

export interface ToolCategoryInfo {
  id: string;
  name: string;
  icon: React.ReactNode;
  description?: string;
}

export const aiTools: AIToolItem[] = [
  {
    id: '1',
    name: 'AI Image Generator',
    description: 'Generate stunning images from text prompts using AI.',
    category: 'Image Generation',
    tier: 'freemium',
    icon: '🖼️',
    use_cases: [
      'Create unique artwork',
      'Generate marketing visuals',
      'Design website graphics',
    ],
    rationale: 'Quickly create visuals without needing design skills.',
    usageLimit: '25 generations per day',
    uniqueSellingPoint: 'Highest quality image generation with minimal prompt engineering required',
    integrations: ['Photoshop', 'Figma', 'Canva'],
    demoAvailable: true,
    popularTool: true
  },
  {
    id: '2',
    name: 'AI Text Summarizer',
    description: 'Summarize long articles and documents into concise summaries.',
    category: 'Text Tools',
    tier: 'freemium',
    icon: '📝',
    use_cases: [
      'Summarize research papers',
      'Get quick insights from articles',
      'Condense meeting notes',
    ],
    rationale: 'Save time by quickly understanding key information.',
    usageLimit: '10 documents per day',
    uniqueSellingPoint: 'Contextual awareness preserves meaning while reducing length by up to 90%',
    integrations: ['Google Docs', 'Microsoft Word', 'Notion'],
    demoAvailable: true
  },
  {
    id: '3',
    name: 'AI Code Assistant',
    description: 'Get real-time coding suggestions and error detection.',
    category: 'Development',
    tier: 'basic',
    icon: '💻',
    use_cases: [
      'Write code faster',
      'Reduce coding errors',
      'Learn new programming languages',
    ],
    rationale: 'Improve coding efficiency and accuracy.',
    usageLimit: 'Unlimited',
    uniqueSellingPoint: 'AI-powered code completion and debugging',
    integrations: ['VS Code', 'IntelliJ IDEA', 'PyCharm'],
    demoAvailable: false
  },
  {
    id: '4',
    name: 'AI Email Writer',
    description: 'Generate professional emails quickly and easily.',
    category: 'Productivity',
    tier: 'basic',
    icon: '📧',
    use_cases: [
      'Write marketing emails',
      'Create customer support responses',
      'Generate sales pitches',
    ],
    rationale: 'Streamline email communication and save time.',
    usageLimit: 'Unlimited',
    uniqueSellingPoint: 'AI-powered email drafting and personalization',
    integrations: ['Gmail', 'Outlook', 'Zoho Mail'],
    demoAvailable: false
  },
  {
    id: '5',
    name: 'AI Social Media Manager',
    description: 'Automate social media posting and engagement.',
    category: 'Marketing',
    tier: 'pro',
    icon: '📱',
    use_cases: [
      'Schedule social media posts',
      'Analyze social media engagement',
      'Generate social media content',
    ],
    rationale: 'Enhance social media presence and engagement.',
    usageLimit: 'Unlimited',
    uniqueSellingPoint: 'AI-powered social media scheduling and analytics',
    integrations: ['Facebook', 'Instagram', 'Twitter'],
    demoAvailable: true
  },
  {
    id: '6',
    name: 'AI Video Editor',
    description: 'Edit videos automatically with AI-powered tools.',
    category: 'Video Editing',
    tier: 'pro',
    icon: '🎬',
    use_cases: [
      'Create professional videos',
      'Automate video editing tasks',
      'Generate video content',
    ],
    rationale: 'Simplify video editing and create high-quality videos.',
    usageLimit: 'Unlimited',
    uniqueSellingPoint: 'AI-powered video editing and rendering',
    integrations: ['Adobe Premiere Pro', 'Final Cut Pro', 'DaVinci Resolve'],
    demoAvailable: true
  },
  {
    id: '7',
    name: 'AI Presentation Maker',
    description: 'Create stunning presentations with AI-generated slides.',
    category: 'Productivity',
    tier: 'freemium',
    icon: '📊',
    use_cases: [
      'Generate presentation slides',
      'Design presentation templates',
      'Create engaging presentations',
    ],
    rationale: 'Design professional presentations quickly and easily.',
    usageLimit: 'Unlimited',
    uniqueSellingPoint: 'AI-powered presentation design and customization',
    integrations: ['Microsoft PowerPoint', 'Google Slides', 'Canva'],
    demoAvailable: true
  },
  {
    id: '8',
    name: 'AI Music Composer',
    description: 'Compose original music with AI-powered tools.',
    category: 'Music',
    tier: 'basic',
    icon: '🎵',
    use_cases: [
      'Create original music tracks',
      'Generate background music',
      'Design custom music for videos',
    ],
    rationale: 'Create unique music tracks without needing musical skills.',
    usageLimit: 'Unlimited',
    uniqueSellingPoint: 'AI-powered music composition and arrangement',
    integrations: ['Ableton Live', 'Logic Pro', 'FL Studio'],
    demoAvailable: false
  },
  {
    id: '9',
    name: 'AI Language Translator',
    description: 'Translate text between multiple languages with AI.',
    category: 'Text Tools',
    tier: 'freemium',
    icon: '🌐',
    use_cases: [
      'Translate documents',
      'Communicate with international clients',
      'Learn new languages',
    ],
    rationale: 'Communicate effectively across different languages.',
    usageLimit: 'Unlimited',
    uniqueSellingPoint: 'AI-powered language translation and interpretation',
    integrations: ['Google Translate', 'Microsoft Translator', 'DeepL'],
    demoAvailable: true
  },
  {
    id: '10',
    name: 'AI Voice Generator',
    description: 'Generate realistic voiceovers with AI.',
    category: 'Voice',
    tier: 'pro',
    icon: '🎤',
    use_cases: [
      'Create voiceovers for videos',
      'Generate audio content',
      'Design custom voice assistants',
    ],
    rationale: 'Create professional voiceovers without hiring voice actors.',
    usageLimit: 'Unlimited',
    uniqueSellingPoint: 'AI-powered voice generation and synthesis',
    integrations: ['Vocaloid', 'Synthesia', 'Deep Voice'],
    demoAvailable: true
  },
  {
    id: '11',
    name: 'InsightLite',
    description: 'Basic data visualization and insights tool for small datasets.',
    category: 'Data Analysis',
    tier: 'freemium',
    icon: '📊',
    use_cases: [
      'Visualize simple data trends',
      'Create basic reports',
      'Analyze small datasets'
    ],
    rationale: 'Makes data analysis accessible to everyone without technical skills.',
    usageLimit: '5MB data limit',
    uniqueSellingPoint: 'One-click insights from CSV and Excel files',
    integrations: ['Excel', 'Google Sheets', 'CSV'],
    demoAvailable: true
  },
  {
    id: '12',
    name: 'TaskBot Mini',
    description: 'Simple task automation assistant for repetitive work.',
    category: 'Automation',
    tier: 'freemium',
    icon: '🤖',
    use_cases: [
      'Automate data entry',
      'Schedule reminders',
      'Simple workflow automation'
    ],
    rationale: 'Save time on repetitive tasks without coding skills.',
    usageLimit: '50 automated tasks per month',
    uniqueSellingPoint: 'No-code automation for everyday tasks',
    integrations: ['Gmail', 'Google Calendar', 'Trello'],
    demoAvailable: true
  },
  {
    id: '13',
    name: 'CopyCraft Free',
    description: 'Generate basic marketing copy and content ideas.',
    category: 'Text Tools',
    tier: 'freemium',
    icon: '✍️',
    use_cases: [
      'Create social media captions',
      'Write email subject lines',
      'Generate blog ideas'
    ],
    rationale: 'Help small businesses create engaging content quickly.',
    usageLimit: '500 words per day',
    uniqueSellingPoint: 'AI-powered content inspiration for beginners',
    integrations: ['WordPress', 'Buffer', 'Mailchimp'],
    demoAvailable: true
  },
  {
    id: '14',
    name: 'AI Basic Simulator',
    description: 'Simple AI concept simulator to understand machine learning basics.',
    category: 'Machine Learning',
    tier: 'freemium',
    icon: '🧩',
    use_cases: [
      'Learn AI concepts',
      'Visualize simple algorithms',
      'Educational demonstrations'
    ],
    rationale: 'Makes AI concepts accessible to beginners and students.',
    usageLimit: '10 simulations per day',
    uniqueSellingPoint: 'Visual learning tool for AI fundamentals',
    integrations: ['Educational platforms', 'Learning management systems'],
    demoAvailable: true
  },
  {
    id: '15',
    name: 'Forum Assistant',
    description: 'AI-powered forum moderation and response suggestion tool.',
    category: 'Collaboration',
    tier: 'freemium',
    icon: '💬',
    use_cases: [
      'Auto-moderate comments',
      'Suggest responses to questions',
      'Summarize forum discussions'
    ],
    rationale: 'Helps community managers maintain healthy online discussions.',
    usageLimit: '100 suggestions per day',
    uniqueSellingPoint: 'Smart content moderation for small communities',
    integrations: ['Discourse', 'Reddit', 'WordPress forums'],
    demoAvailable: true
  },
  {
    id: '16',
    name: 'DataFlow Pro',
    description: 'Advanced data processing and visualization platform.',
    category: 'Data Analysis',
    tier: 'basic',
    icon: '📈',
    use_cases: [
      'Create interactive dashboards',
      'Process large datasets',
      'Generate business reports'
    ],
    rationale: 'Transform complex data into actionable insights.',
    usageLimit: '50MB data processing',
    uniqueSellingPoint: 'Drag-and-drop interface for complex data analysis',
    integrations: ['SQL databases', 'CSV', 'Excel', 'Tableau'],
    demoAvailable: true
  },
  {
    id: '17',
    name: 'AutoPilot Studio',
    description: 'Comprehensive workflow automation suite for businesses.',
    category: 'Automation',
    tier: 'basic',
    icon: '⚙️',
    use_cases: [
      'Create complex automations',
      'Integrate multiple systems',
      'Build custom workflows'
    ],
    rationale: 'Increase productivity through intelligent process automation.',
    usageLimit: '1,000 automations per month',
    uniqueSellingPoint: 'Visual workflow builder with conditional logic',
    integrations: ['Salesforce', 'HubSpot', 'Zapier', 'Slack'],
    demoAvailable: true
  },
  {
    id: '18',
    name: 'ModelMaker Lite',
    description: 'User-friendly platform for creating and deploying AI models.',
    category: 'Machine Learning',
    tier: 'basic',
    icon: '🧠',
    use_cases: [
      'Build custom classifiers',
      'Train prediction models',
      'Deploy ML solutions'
    ],
    rationale: 'Makes machine learning accessible to non-technical users.',
    usageLimit: '5 active models',
    uniqueSellingPoint: 'No-code ML model creation and deployment',
    integrations: ['AWS', 'Google Cloud', 'Azure'],
    demoAvailable: true
  },
  {
    id: '19',
    name: 'SEO Boost AI',
    description: 'AI-powered SEO optimization and content enhancement.',
    category: 'SEO',
    tier: 'basic',
    icon: '🔍',
    use_cases: [
      'Optimize website content',
      'Analyze competitors',
      'Generate SEO recommendations'
    ],
    rationale: 'Improve search rankings with AI-assisted optimization.',
    usageLimit: '25 pages analyzed per day',
    uniqueSellingPoint: 'Real-time content optimization suggestions',
    integrations: ['WordPress', 'Shopify', 'Google Analytics'],
    demoAvailable: false
  },
  {
    id: '20',
    name: 'TeamSync AI',
    description: 'AI-enhanced team collaboration and project management.',
    category: 'Collaboration',
    tier: 'basic',
    icon: '👥',
    use_cases: [
      'Automate meeting notes',
      'Track project progress',
      'Enhance team communication'
    ],
    rationale: 'Streamline team workflows and boost productivity.',
    usageLimit: '10 team members',
    uniqueSellingPoint: 'AI assistant for team coordination and task management',
    integrations: ['Microsoft Teams', 'Slack', 'Asana', 'Trello'],
    demoAvailable: true
  },
  {
    id: '21',
    name: 'Predictirix Enterprise',
    description: 'Advanced predictive analytics and forecasting platform.',
    category: 'Data Analysis',
    tier: 'pro',
    icon: '📉',
    use_cases: [
      'Forecast business trends',
      'Predict customer behavior',
      'Perform risk analysis'
    ],
    rationale: 'Make data-driven decisions with predictive intelligence.',
    usageLimit: 'Unlimited data processing',
    uniqueSellingPoint: 'Enterprise-grade predictive modeling with 99% accuracy',
    integrations: ['SAP', 'Oracle', 'Salesforce', 'Tableau'],
    demoAvailable: true
  },
  {
    id: '22',
    name: 'NeuroForge Pro',
    description: 'Enterprise neural network design and deployment platform.',
    category: 'Machine Learning',
    tier: 'pro',
    icon: '🧠',
    use_cases: [
      'Design custom neural networks',
      'Train models on proprietary data',
      'Deploy AI at scale'
    ],
    rationale: 'Build advanced AI systems without deep ML expertise.',
    usageLimit: 'Unlimited models',
    uniqueSellingPoint: 'Visual neural network architecture designer with performance optimization',
    integrations: ['TensorFlow', 'PyTorch', 'CUDA', 'Cloud GPUs'],
    demoAvailable: true
  },
  {
    id: '23',
    name: 'OmniFlow AI',
    description: 'Enterprise-grade automation platform for complex workflows.',
    category: 'Automation',
    tier: 'pro',
    icon: '⚙️',
    use_cases: [
      'Automate enterprise processes',
      'Create complex decision systems',
      'Build intelligent business operations'
    ],
    rationale: 'Transform business operations with intelligent automation.',
    usageLimit: 'Unlimited automations',
    uniqueSellingPoint: 'Advanced process mining and optimization with predictive capabilities',
    integrations: ['SAP', 'Oracle', 'ServiceNow', 'Workday'],
    demoAvailable: true
  },
  {
    id: '24',
    name: 'AI Marketplace Publisher',
    description: 'Create and monetize your own AI models and applications.',
    category: 'Development',
    tier: 'pro',
    icon: '🏪',
    use_cases: [
      'Publish custom AI solutions',
      'Monetize AI models',
      'Build AI application marketplace'
    ],
    rationale: 'Turn AI expertise into revenue streams.',
    usageLimit: 'Unlimited publishing',
    uniqueSellingPoint: 'End-to-end platform for AI model monetization and distribution',
    integrations: ['Stripe', 'PayPal', 'AWS Marketplace', 'Docker'],
    demoAvailable: false
  },
  {
    id: '25',
    name: 'EthicsGuard AI',
    description: 'Enterprise AI governance and ethical compliance platform.',
    category: 'Ethics',
    tier: 'pro',
    icon: '🛡️',
    use_cases: [
      'Monitor AI bias',
      'Ensure ethical AI deployment',
      'Generate compliance reports'
    ],
    rationale: 'Maintain ethical standards and regulatory compliance in AI systems.',
    usageLimit: 'Unlimited monitoring',
    uniqueSellingPoint: 'Comprehensive AI governance with regulatory compliance frameworks',
    integrations: ['Custom AI systems', 'Cloud AI services', 'Enterprise data environments'],
    demoAvailable: true
  },
  {
    id: '26',
    name: 'CloudBridge AI',
    description: 'Enterprise AI integration platform for multi-cloud environments.',
    category: 'Cloud',
    tier: 'pro',
    icon: '☁️',
    use_cases: [
      'Unify multi-cloud AI services',
      'Orchestrate distributed AI workloads',
      'Manage enterprise AI infrastructure'
    ],
    rationale: 'Simplify complex cloud AI deployments across providers.',
    usageLimit: 'Unlimited connections',
    uniqueSellingPoint: 'Seamless integration of AI services across AWS, Azure, and Google Cloud',
    integrations: ['AWS', 'Azure', 'Google Cloud', 'IBM Cloud', 'Oracle Cloud'],
    demoAvailable: false
  }
];
