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
  { id: 'voice', name: 'Voice', icon: '🎤' }
];

export interface ToolCategoryInfo {
  id: string;
  name: string;
  icon: string;
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
];
