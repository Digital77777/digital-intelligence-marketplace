
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
}

export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

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
    featured: true
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic\'s AI assistant for analysis, writing, and complex reasoning',
    category: 'content-creation',
    tier: 'freemium',
    icon: '🧠',
    popularTool: true
  },
  {
    id: 'jasper',
    name: 'Jasper AI',
    description: 'AI writing assistant for marketing copy, blogs, and creative content',
    category: 'content-creation',
    tier: 'basic',
    icon: '✍️'
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    description: 'Generate marketing copy, product descriptions, and social media content',
    category: 'content-creation',
    tier: 'basic',
    icon: '📝'
  },
  {
    id: 'grammarly',
    name: 'Grammarly',
    description: 'AI-powered writing assistant for grammar, style, and tone improvements',
    category: 'content-creation',
    tier: 'freemium',
    icon: '📚'
  },
  {
    id: 'wordtune',
    name: 'Wordtune',
    description: 'AI writing companion that understands what you\'re trying to say',
    category: 'content-creation',
    tier: 'basic',
    icon: '🎯'
  },
  {
    id: 'writesonic',
    name: 'Writesonic',
    description: 'AI writer for articles, ads, landing pages, and product descriptions',
    category: 'content-creation',
    tier: 'basic',
    icon: '🚀'
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: 'AI-powered writing assistant integrated into Notion workspace',
    category: 'content-creation',
    tier: 'pro',
    icon: '📋'
  },

  // Productivity Tools (5 tools)
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Automate workflows between your favorite apps and services',
    category: 'productivity',
    tier: 'freemium',
    icon: '⚡',
    popularTool: true
  },
  {
    id: 'microsoft-copilot',
    name: 'Microsoft Copilot',
    description: 'AI assistant integrated across Microsoft 365 applications',
    category: 'productivity',
    tier: 'pro',
    icon: '🔧',
    featured: true
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'AI pair programmer that helps you write code faster',
    category: 'productivity',
    tier: 'pro',
    icon: '💻',
    popularTool: true
  },
  {
    id: 'calendly',
    name: 'Calendly AI',
    description: 'Smart scheduling assistant with AI-powered meeting optimization',
    category: 'productivity',
    tier: 'basic',
    icon: '📅'
  },
  {
    id: 'otter-ai',
    name: 'Otter.ai',
    description: 'AI meeting assistant that records, transcribes, and summarizes meetings',
    category: 'productivity',
    tier: 'freemium',
    icon: '🎙️'
  },

  // Natural Language Processing (4 tools)
  {
    id: 'huggingface',
    name: 'Hugging Face',
    description: 'Open-source platform for NLP models and datasets',
    category: 'nlp',
    tier: 'freemium',
    icon: '🤗',
    popularTool: true
  },
  {
    id: 'openai-api',
    name: 'OpenAI API',
    description: 'Access to GPT models for custom applications',
    category: 'nlp',
    tier: 'pro',
    icon: '🔑',
    featured: true
  },
  {
    id: 'spacy',
    name: 'spaCy',
    description: 'Industrial-strength natural language processing library',
    category: 'nlp',
    tier: 'freemium',
    icon: '🐍'
  },
  {
    id: 'dialogflow',
    name: 'Dialogflow',
    description: 'Google\'s conversational AI platform for chatbots and voice assistants',
    category: 'nlp',
    tier: 'basic',
    icon: '💬'
  },

  // Marketing & Sales Tools (4 tools)
  {
    id: 'hubspot-ai',
    name: 'HubSpot AI',
    description: 'AI-powered CRM and marketing automation platform',
    category: 'marketing',
    tier: 'pro',
    icon: '📊',
    featured: true
  },
  {
    id: 'salesforce-einstein',
    name: 'Salesforce Einstein',
    description: 'AI-powered CRM insights and automation',
    category: 'marketing',
    tier: 'pro',
    icon: '☁️'
  },
  {
    id: 'mailchimp-ai',
    name: 'Mailchimp AI',
    description: 'AI-powered email marketing optimization and personalization',
    category: 'marketing',
    tier: 'basic',
    icon: '📧'
  },
  {
    id: 'surfer-seo',
    name: 'Surfer SEO',
    description: 'AI-powered SEO optimization and content analysis',
    category: 'marketing',
    tier: 'basic',
    icon: '🏄'
  },

  // Computer Vision Tools (3 tools)
  {
    id: 'opencv',
    name: 'OpenCV',
    description: 'Open-source computer vision and machine learning library',
    category: 'computer-vision',
    tier: 'freemium',
    icon: '👁️'
  },
  {
    id: 'roboflow',
    name: 'Roboflow',
    description: 'Computer vision platform for dataset management and model deployment',
    category: 'computer-vision',
    tier: 'basic',
    icon: '🔍'
  },
  {
    id: 'tensorflow-vision',
    name: 'TensorFlow Vision',
    description: 'Google\'s machine learning framework for computer vision tasks',
    category: 'computer-vision',
    tier: 'pro',
    icon: '🧮'
  },

  // Video & Audio Tools (3 tools)
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'AI voice synthesis and cloning platform',
    category: 'video-audio',
    tier: 'basic',
    icon: '🎵',
    popularTool: true
  },
  {
    id: 'descript',
    name: 'Descript',
    description: 'AI-powered video and audio editing with transcription',
    category: 'video-audio',
    tier: 'basic',
    icon: '🎬'
  },
  {
    id: 'runway-ml',
    name: 'Runway ML',
    description: 'AI-powered creative tools for video generation and editing',
    category: 'video-audio',
    tier: 'pro',
    icon: '🎭',
    featured: true
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
