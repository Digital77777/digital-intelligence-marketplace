
export type AIToolTier = 'freemium' | 'basic' | 'pro';

export interface AIToolItem {
  id: string;
  name: string;
  description: string;
  category: string;
  tier: AIToolTier;
  icon: string;
  popularTool?: boolean;
  comingSoon?: boolean;
  featured?: boolean;
  use_cases?: string[];
  rationale?: string;
  uniqueSellingPoint?: string;
  usageLimit?: string;
  integrations?: string[];
  demoAvailable?: boolean;
  relatedCourses?: string[];
}

export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

// Helper functions for tier styling and labels
export const getTierBadgeColor = (tier: AIToolTier): string => {
  switch (tier) {
    case 'freemium':
      return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
    case 'basic':
      return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
    case 'pro':
      return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-800';
  }
};

export const getTierIcon = (tier: AIToolTier): string => {
  switch (tier) {
    case 'freemium':
      return '🆓';
    case 'basic':
      return '⭐';
    case 'pro':
      return '💎';
    default:
      return '📦';
  }
};

export const getTierLabel = (tier: AIToolTier): string => {
  switch (tier) {
    case 'freemium':
      return 'Freemium';
    case 'basic':
      return 'Basic';
    case 'pro':
      return 'Pro';
    default:
      return 'Unknown';
  }
};

export const toolCategories: ToolCategory[] = [
  {
    id: 'content-creation',
    name: 'Content Creation',
    description: 'AI tools for generating text, images, and multimedia content',
    icon: '✍️',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'Streamline workflows and boost efficiency',
    icon: '⚡',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'nlp',
    name: 'Natural Language Processing',
    description: 'Advanced text analysis and language understanding',
    icon: '🗣️',
    color: 'from-purple-500 to-violet-600'
  },
  {
    id: 'marketing',
    name: 'Marketing & Sales',
    description: 'AI-powered marketing automation and analytics',
    icon: '📈',
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision',
    description: 'Image and video analysis tools',
    icon: '👁️',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'video-audio',
    name: 'Video & Audio',
    description: 'Multimedia processing and generation',
    icon: '🎥',
    color: 'from-orange-500 to-red-600'
  }
];

export const aiTools: AIToolItem[] = [
  // Content Creation Tools (8 tools)
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Advanced conversational AI for text generation, coding, and problem-solving',
    category: 'content-creation',
    tier: 'freemium',
    icon: '🤖',
    popularTool: true,
    featured: true,
    use_cases: ['Text generation', 'Code assistance', 'Creative writing', 'Problem solving'],
    rationale: 'ChatGPT revolutionizes how we interact with AI, offering natural conversation and powerful problem-solving capabilities.',
    uniqueSellingPoint: 'Most versatile conversational AI with broad knowledge and reasoning capabilities',
    usageLimit: 'Free tier: 40 messages every 3 hours',
    integrations: ['OpenAI API', 'Microsoft Office', 'Slack', 'Discord'],
    demoAvailable: true
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic\'s AI assistant for analysis, writing, and complex reasoning',
    category: 'content-creation',
    tier: 'freemium',
    icon: '🧠',
    popularTool: true,
    use_cases: ['Document analysis', 'Writing assistance', 'Code review', 'Research'],
    rationale: 'Claude excels at understanding context and nuance, making it ideal for complex analytical tasks.',
    uniqueSellingPoint: 'Superior reasoning and safety features with constitutional AI training',
    usageLimit: 'Free tier: Limited messages per day',
    integrations: ['Anthropic API', 'Web interface'],
    demoAvailable: true
  },
  {
    id: 'jasper',
    name: 'Jasper AI',
    description: 'AI writing assistant for marketing copy, blogs, and creative content',
    category: 'content-creation',
    tier: 'basic',
    icon: '✍️',
    use_cases: ['Marketing copy', 'Blog posts', 'Social media content', 'Email campaigns'],
    rationale: 'Jasper specializes in marketing content with templates and brand voice consistency.',
    uniqueSellingPoint: 'Marketing-focused AI with brand voice training and campaign optimization',
    integrations: ['Google Docs', 'WordPress', 'Shopify', 'HubSpot']
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    description: 'Generate marketing copy, product descriptions, and social media content',
    category: 'content-creation',
    tier: 'basic',
    icon: '📝',
    use_cases: ['Product descriptions', 'Ad copy', 'Social media posts', 'Email subject lines'],
    rationale: 'Copy.ai streamlines content creation with specialized templates for different marketing needs.',
    uniqueSellingPoint: 'Extensive template library with conversion-optimized copy generation',
    integrations: ['Shopify', 'WooCommerce', 'Facebook Ads', 'Google Ads']
  },
  {
    id: 'grammarly',
    name: 'Grammarly',
    description: 'AI-powered writing assistant for grammar, style, and tone improvements',
    category: 'content-creation',
    tier: 'freemium',
    icon: '📚',
    use_cases: ['Grammar checking', 'Style improvement', 'Tone adjustment', 'Plagiarism detection'],
    rationale: 'Grammarly enhances writing quality with real-time suggestions and style guidance.',
    uniqueSellingPoint: 'Comprehensive writing enhancement with real-time suggestions across platforms',
    usageLimit: 'Free tier: Basic grammar and spelling checks',
    integrations: ['Microsoft Office', 'Google Docs', 'Gmail', 'Slack']
  },
  {
    id: 'wordtune',
    name: 'Wordtune',
    description: 'AI writing companion that understands what you\'re trying to say',
    category: 'content-creation',
    tier: 'basic',
    icon: '🎯',
    use_cases: ['Sentence rewriting', 'Tone adjustment', 'Clarity improvement', 'Length optimization'],
    rationale: 'Wordtune focuses on improving expression and clarity of existing text.',
    uniqueSellingPoint: 'Contextual rewriting that preserves meaning while improving expression',
    integrations: ['Google Docs', 'Gmail', 'LinkedIn', 'Facebook']
  },
  {
    id: 'writesonic',
    name: 'Writesonic',
    description: 'AI writer for articles, ads, landing pages, and product descriptions',
    category: 'content-creation',
    tier: 'basic',
    icon: '🚀',
    use_cases: ['Article writing', 'Landing pages', 'Product descriptions', 'SEO content'],
    rationale: 'Writesonic combines content generation with SEO optimization for better reach.',
    uniqueSellingPoint: 'SEO-optimized content generation with built-in optimization tools',
    integrations: ['WordPress', 'Shopify', 'SEMrush', 'Surfer SEO']
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: 'AI-powered writing assistant integrated into Notion workspace',
    category: 'content-creation',
    tier: 'pro',
    icon: '📋',
    use_cases: ['Note enhancement', 'Document generation', 'Task automation', 'Knowledge management'],
    rationale: 'Notion AI seamlessly integrates AI capabilities into existing workflows and documentation.',
    uniqueSellingPoint: 'Native integration with Notion\'s powerful workspace and database features',
    integrations: ['Notion workspace', 'Slack', 'Google Calendar', 'Zapier']
  },

  // Productivity Tools (5 tools)
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Automate workflows between your favorite apps and services',
    category: 'productivity',
    tier: 'freemium',
    icon: '⚡',
    popularTool: true,
    use_cases: ['Workflow automation', 'Data synchronization', 'Task automation', 'App integration'],
    rationale: 'Zapier connects thousands of apps to automate repetitive tasks and streamline workflows.',
    uniqueSellingPoint: 'Largest app ecosystem with no-code automation for complex workflows',
    usageLimit: 'Free tier: 5 Zaps, 100 tasks per month',
    integrations: ['5000+ apps', 'Gmail', 'Slack', 'Salesforce', 'Google Sheets']
  },
  {
    id: 'microsoft-copilot',
    name: 'Microsoft Copilot',
    description: 'AI assistant integrated across Microsoft 365 applications',
    category: 'productivity',
    tier: 'pro',
    icon: '🔧',
    featured: true,
    use_cases: ['Document creation', 'Data analysis', 'Email management', 'Meeting summaries'],
    rationale: 'Microsoft Copilot brings AI capabilities directly into familiar Office applications.',
    uniqueSellingPoint: 'Deep integration with Microsoft 365 ecosystem and enterprise features',
    integrations: ['Microsoft 365', 'Teams', 'Outlook', 'PowerBI', 'SharePoint']
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'AI pair programmer that helps you write code faster',
    category: 'productivity',
    tier: 'pro',
    icon: '💻',
    popularTool: true,
    use_cases: ['Code completion', 'Function generation', 'Bug fixing', 'Code explanation'],
    rationale: 'GitHub Copilot accelerates development by suggesting code and entire functions.',
    uniqueSellingPoint: 'Advanced code generation trained on billions of lines of code',
    integrations: ['VS Code', 'Visual Studio', 'Neovim', 'JetBrains IDEs']
  },
  {
    id: 'calendly',
    name: 'Calendly AI',
    description: 'Smart scheduling assistant with AI-powered meeting optimization',
    category: 'productivity',
    tier: 'basic',
    icon: '📅',
    use_cases: ['Meeting scheduling', 'Calendar optimization', 'Availability management', 'Follow-up automation'],
    rationale: 'Calendly AI optimizes scheduling with intelligent availability and preference learning.',
    uniqueSellingPoint: 'Intelligent scheduling with automatic time zone detection and optimization',
    integrations: ['Google Calendar', 'Outlook', 'Zoom', 'Salesforce', 'HubSpot']
  },
  {
    id: 'otter-ai',
    name: 'Otter.ai',
    description: 'AI meeting assistant that records, transcribes, and summarizes meetings',
    category: 'productivity',
    tier: 'freemium',
    icon: '🎙️',
    use_cases: ['Meeting transcription', 'Note-taking', 'Action item extraction', 'Meeting summaries'],
    rationale: 'Otter.ai transforms meetings into actionable insights with accurate transcription.',
    uniqueSellingPoint: 'Real-time transcription with speaker identification and live collaboration',
    usageLimit: 'Free tier: 600 minutes per month',
    integrations: ['Zoom', 'Google Meet', 'Microsoft Teams', 'Slack']
  },

  // Natural Language Processing (4 tools)
  {
    id: 'huggingface',
    name: 'Hugging Face',
    description: 'Open-source platform for NLP models and datasets',
    category: 'nlp',
    tier: 'freemium',
    icon: '🤗',
    popularTool: true,
    use_cases: ['Model hosting', 'Dataset sharing', 'Fine-tuning', 'Model deployment'],
    rationale: 'Hugging Face democratizes access to state-of-the-art NLP models and tools.',
    uniqueSellingPoint: 'Largest repository of open-source NLP models with collaborative features',
    usageLimit: 'Free tier: Public repositories and limited compute',
    integrations: ['PyTorch', 'TensorFlow', 'JAX', 'AWS', 'Google Cloud']
  },
  {
    id: 'openai-api',
    name: 'OpenAI API',
    description: 'Access to GPT models for custom applications',
    category: 'nlp',
    tier: 'pro',
    icon: '🔑',
    featured: true,
    use_cases: ['Custom chatbots', 'Text generation', 'Content creation', 'Code generation'],
    rationale: 'OpenAI API provides programmatic access to powerful language models for developers.',
    uniqueSellingPoint: 'Access to cutting-edge GPT models with flexible API integration',
    integrations: ['REST API', 'Python SDK', 'Node.js SDK', 'cURL']
  },
  {
    id: 'spacy',
    name: 'spaCy',
    description: 'Industrial-strength natural language processing library',
    category: 'nlp',
    tier: 'freemium',
    icon: '🐍',
    use_cases: ['Text processing', 'Named entity recognition', 'Part-of-speech tagging', 'Dependency parsing'],
    rationale: 'spaCy provides production-ready NLP tools with excellent performance and accuracy.',
    uniqueSellingPoint: 'High-performance NLP library optimized for production use',
    integrations: ['Python', 'Docker', 'Jupyter', 'scikit-learn']
  },
  {
    id: 'dialogflow',
    name: 'Dialogflow',
    description: 'Google\'s conversational AI platform for chatbots and voice assistants',
    category: 'nlp',
    tier: 'basic',
    icon: '💬',
    use_cases: ['Chatbot development', 'Voice assistants', 'Customer service automation', 'Intent recognition'],
    rationale: 'Dialogflow simplifies building conversational interfaces with powerful NLU capabilities.',
    uniqueSellingPoint: 'Enterprise-grade conversational AI with Google\'s NLU technology',
    integrations: ['Google Assistant', 'Facebook Messenger', 'Slack', 'Telegram']
  },

  // Marketing & Sales Tools (4 tools)
  {
    id: 'hubspot-ai',
    name: 'HubSpot AI',
    description: 'AI-powered CRM and marketing automation platform',
    category: 'marketing',
    tier: 'pro',
    icon: '📊',
    featured: true,
    use_cases: ['Lead scoring', 'Content optimization', 'Email automation', 'Sales forecasting'],
    rationale: 'HubSpot AI enhances marketing and sales processes with intelligent automation.',
    uniqueSellingPoint: 'Comprehensive inbound marketing platform with AI-driven insights',
    integrations: ['Salesforce', 'Gmail', 'Outlook', 'WordPress', 'Shopify']
  },
  {
    id: 'salesforce-einstein',
    name: 'Salesforce Einstein',
    description: 'AI-powered CRM insights and automation',
    category: 'marketing',
    tier: 'pro',
    icon: '☁️',
    use_cases: ['Predictive analytics', 'Lead scoring', 'Opportunity insights', 'Customer segmentation'],
    rationale: 'Salesforce Einstein brings AI capabilities directly into the world\'s leading CRM platform.',
    uniqueSellingPoint: 'Native AI integration with comprehensive CRM and analytics capabilities',
    integrations: ['Salesforce CRM', 'Tableau', 'MuleSoft', 'Slack']
  },
  {
    id: 'mailchimp-ai',
    name: 'Mailchimp AI',
    description: 'AI-powered email marketing optimization and personalization',
    category: 'marketing',
    tier: 'basic',
    icon: '📧',
    use_cases: ['Email optimization', 'Send time optimization', 'Content suggestions', 'Audience segmentation'],
    rationale: 'Mailchimp AI optimizes email campaigns for better engagement and conversion rates.',
    uniqueSellingPoint: 'Email marketing optimization with predictive analytics and personalization',
    integrations: ['Shopify', 'WooCommerce', 'Facebook', 'Instagram', 'Google Ads']
  },
  {
    id: 'surfer-seo',
    name: 'Surfer SEO',
    description: 'AI-powered SEO optimization and content analysis',
    category: 'marketing',
    tier: 'basic',
    icon: '🏄',
    use_cases: ['SEO content optimization', 'Keyword research', 'SERP analysis', 'Content planning'],
    rationale: 'Surfer SEO uses AI to analyze top-ranking pages and optimize content for search engines.',
    uniqueSellingPoint: 'Data-driven SEO optimization with real-time content scoring',
    integrations: ['Google Search Console', 'WordPress', 'Google Docs', 'Jasper']
  },

  // Computer Vision Tools (3 tools)
  {
    id: 'opencv',
    name: 'OpenCV',
    description: 'Open-source computer vision and machine learning library',
    category: 'computer-vision',
    tier: 'freemium',
    icon: '👁️',
    use_cases: ['Image processing', 'Object detection', 'Face recognition', 'Video analysis'],
    rationale: 'OpenCV is the de facto standard for computer vision applications across industries.',
    uniqueSellingPoint: 'Comprehensive computer vision library with extensive algorithm support',
    integrations: ['Python', 'C++', 'Java', 'MATLAB', 'Android', 'iOS']
  },
  {
    id: 'roboflow',
    name: 'Roboflow',
    description: 'Computer vision platform for dataset management and model deployment',
    category: 'computer-vision',
    tier: 'basic',
    icon: '🔍',
    use_cases: ['Dataset management', 'Image annotation', 'Model training', 'Edge deployment'],
    rationale: 'Roboflow streamlines the entire computer vision pipeline from data to deployment.',
    uniqueSellingPoint: 'End-to-end computer vision platform with collaborative dataset management',
    integrations: ['YOLOv5', 'TensorFlow', 'PyTorch', 'AWS', 'Google Cloud']
  },
  {
    id: 'tensorflow-vision',
    name: 'TensorFlow Vision',
    description: 'Google\'s machine learning framework for computer vision tasks',
    category: 'computer-vision',
    tier: 'pro',
    icon: '🧮',
    use_cases: ['Deep learning models', 'Image classification', 'Object detection', 'Semantic segmentation'],
    rationale: 'TensorFlow Vision provides state-of-the-art computer vision models and tools.',
    uniqueSellingPoint: 'Google-backed framework with pre-trained models and scalable deployment',
    integrations: ['Google Cloud', 'Kubernetes', 'Docker', 'Jupyter', 'Colab']
  },

  // Video & Audio Tools (3 tools)
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'AI voice synthesis and cloning platform',
    category: 'video-audio',
    tier: 'basic',
    icon: '🎵',
    popularTool: true,
    use_cases: ['Voice cloning', 'Text-to-speech', 'Dubbing', 'Audiobook creation'],
    rationale: 'ElevenLabs creates incredibly realistic synthetic voices for various applications.',
    uniqueSellingPoint: 'Ultra-realistic voice cloning with emotional expression control',
    integrations: ['API access', 'Python SDK', 'Web interface', 'Discord bot']
  },
  {
    id: 'descript',
    name: 'Descript',
    description: 'AI-powered video and audio editing with transcription',
    category: 'video-audio',
    tier: 'basic',
    icon: '🎬',
    use_cases: ['Video editing', 'Podcast editing', 'Transcription', 'Voice synthesis'],
    rationale: 'Descript revolutionizes audio/video editing with text-based editing capabilities.',
    uniqueSellingPoint: 'Text-based video editing with AI voice cloning and filler word removal',
    integrations: ['YouTube', 'Vimeo', 'Spotify', 'Apple Podcasts']
  },
  {
    id: 'runway-ml',
    name: 'Runway ML',
    description: 'AI-powered creative tools for video generation and editing',
    category: 'video-audio',
    tier: 'pro',
    icon: '🎭',
    featured: true,
    use_cases: ['Video generation', 'Background removal', 'Style transfer', 'Motion tracking'],
    rationale: 'Runway ML empowers creators with cutting-edge AI tools for video content creation.',
    uniqueSellingPoint: 'Cutting-edge generative AI for video creation and manipulation',
    integrations: ['Adobe Premiere', 'Final Cut Pro', 'DaVinci Resolve', 'Blender']
  }
];

// Helper function to get tools by tier
export const getToolsByTier = (tier: AIToolTier): AIToolItem[] => {
  return aiTools.filter(tool => tool.tier === tier);
};

// Helper function to get tools by category
export const getToolsByCategory = (category: string): AIToolItem[] => {
  return aiTools.filter(tool => tool.category === category);
};

// Helper function to get popular tools
export const getPopularTools = (): AIToolItem[] => {
  return aiTools.filter(tool => tool.popularTool);
};

// Helper function to get featured tools
export const getFeaturedTools = (): AIToolItem[] => {
  return aiTools.filter(tool => tool.featured);
};
