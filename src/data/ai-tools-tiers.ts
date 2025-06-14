import React from 'react';
import { 
  Brain, 
  FileText, 
  Presentation, 
  Languages, 
  BarChart3, 
  Bot, 
  PenTool, 
  Cpu, 
  Users, 
  Code, 
  Mail, 
  Music, 
  Zap, 
  Settings, 
  Share2, 
  Video, 
  Mic, 
  TrendingUp, 
  Network, 
  Workflow, 
  Upload, 
  Shield, 
  Cloud
} from 'lucide-react';

export type AIToolTier = 'freemium' | 'basic' | 'pro';

export interface AIToolItem {
  id: string;
  name: string;
  description: string;
  category: string;
  tier: AIToolTier;
  icon: string | React.ReactNode;
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
  technologies?: string[];
  function?: string;
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
    id: 'image-generation',
    name: 'Image Generation',
    description: 'AI tools for creating and editing images from text prompts',
    icon: '🎨',
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'text-tools',
    name: 'Text Tools',
    description: 'Advanced text processing, summarization, and language tools',
    icon: '📝',
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
    id: 'data-analysis',
    name: 'Data Analysis',
    description: 'Analyze data patterns and generate insights',
    icon: '📊',
    color: 'from-purple-500 to-violet-600'
  },
  {
    id: 'automation',
    name: 'Automation',
    description: 'Task automation and workflow management',
    icon: '🤖',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    description: 'Build and deploy ML models',
    icon: '🧠',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'collaboration',
    name: 'Collaboration',
    description: 'Team communication and project management',
    icon: '👥',
    color: 'from-teal-500 to-green-600'
  },
  {
    id: 'development',
    name: 'Development',
    description: 'Code generation and development tools',
    icon: '💻',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'music',
    name: 'Music',
    description: 'AI-powered music creation and composition',
    icon: '🎵',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'seo',
    name: 'SEO',
    description: 'Search engine optimization tools',
    icon: '🔍',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Social media and marketing automation',
    icon: '📈',
    color: 'from-rose-500 to-pink-600'
  },
  {
    id: 'video-editing',
    name: 'Video Editing',
    description: 'AI-powered video creation and editing',
    icon: '🎬',
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 'voice',
    name: 'Voice',
    description: 'Text-to-speech and voice generation',
    icon: '🎤',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'ethics',
    name: 'Ethics',
    description: 'AI ethics and bias detection tools',
    icon: '⚖️',
    color: 'from-gray-500 to-slate-600'
  },
  {
    id: 'cloud',
    name: 'Cloud',
    description: 'Cloud deployment and management',
    icon: '☁️',
    color: 'from-sky-500 to-blue-600'
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    description: 'Smart farming and agricultural AI solutions',
    icon: '🌾',
    color: 'from-green-500 to-lime-600'
  }
];

export const aiTools: AIToolItem[] = [
  // FREEMIUM TIER (9 tools)
  {
    id: '1',
    name: 'AI Image Generator',
    description: 'Generate stunning images from text prompts using advanced AI models',
    category: 'image-generation',
    tier: 'freemium',
    icon: '🎨',
    popularTool: true,
    featured: true,
    function: 'Generate images from text prompts',
    use_cases: ['Marketing visuals', 'Social media content', 'Blog illustrations', 'Creative art'],
    uniqueSellingPoint: 'High-quality image generation with multiple style options',
    usageLimit: 'Free tier: 10 images per day',
    technologies: ['Stability AI Stable Diffusion', 'OpenAI DALL·E', 'React Canvas', 'Cloudinary'],
    integrations: ['Canva', 'Figma', 'Adobe Creative Suite', 'WordPress'],
    demoAvailable: true
  },
  {
    id: '2',
    name: 'AI Text Summarizer',
    description: 'Summarize long documents, articles, and research papers instantly',
    category: 'text-tools',
    tier: 'freemium',
    icon: '📝',
    popularTool: true,
    function: 'Summarize long documents or articles',
    use_cases: ['Research papers', 'News articles', 'Meeting notes', 'Legal documents'],
    uniqueSellingPoint: 'Intelligent summarization with key point extraction',
    usageLimit: 'Free tier: 5 documents per day',
    technologies: ['OpenAI GPT-4', 'Hugging Face Transformers', 'React', 'Supabase Functions'],
    integrations: ['Google Docs', 'Microsoft Word', 'PDF readers', 'Notion'],
    demoAvailable: true
  },
  {
    id: '3',
    name: 'AI Presentation Maker',
    description: 'Generate professional slide decks from topic prompts',
    category: 'productivity',
    tier: 'freemium',
    icon: '📊',
    function: 'Generate slide decks from topic prompts',
    use_cases: ['Business presentations', 'Educational content', 'Pitch decks', 'Training materials'],
    uniqueSellingPoint: 'Complete presentations with visuals and speaker notes',
    usageLimit: 'Free tier: 3 presentations per month',
    technologies: ['GPT-4', 'DALL·E', 'Reveal.js', 'Puppeteer for export'],
    integrations: ['PowerPoint', 'Google Slides', 'Keynote', 'Canva'],
    demoAvailable: true
  },
  {
    id: '4',
    name: 'AI Language Translator',
    description: 'Translate text between 100+ languages with context awareness',
    category: 'text-tools',
    tier: 'freemium',
    icon: '🌐',
    popularTool: true,
    function: 'Translate text between multiple languages',
    use_cases: ['Document translation', 'Website localization', 'Email communication', 'Travel assistance'],
    uniqueSellingPoint: 'Context-aware translation with cultural nuances',
    usageLimit: 'Free tier: 1000 characters per day',
    technologies: ['Google Translate API', 'DeepL API', 'OpenNMT', 'React'],
    integrations: ['Google Chrome', 'Microsoft Office', 'Slack', 'WhatsApp'],
    demoAvailable: true
  },
  {
    id: '5',
    name: 'InsightLite',
    description: 'Analyze CSV/Excel data and generate actionable insights',
    category: 'data-analysis',
    tier: 'freemium',
    icon: '📈',
    function: 'Analyze simple CSV/Excel data and generate insights',
    use_cases: ['Sales analysis', 'Customer insights', 'Financial reports', 'Survey data'],
    uniqueSellingPoint: 'Natural language insights from your data',
    usageLimit: 'Free tier: 5 datasets per month',
    technologies: ['Pandas', 'NumPy', 'Seaborn', 'GPT-4', 'Recharts'],
    integrations: ['Excel', 'Google Sheets', 'CSV files', 'Power BI'],
    demoAvailable: true
  },
  {
    id: '6',
    name: 'TaskBot Mini',
    description: 'Simple task automation for scheduling and notifications',
    category: 'automation',
    tier: 'freemium',
    icon: '🤖',
    function: 'Simple task automation like scheduling and notifications',
    use_cases: ['Meeting reminders', 'Follow-up emails', 'Social media posts', 'Data backups'],
    uniqueSellingPoint: 'Natural language task creation and management',
    usageLimit: 'Free tier: 10 automated tasks per month',
    technologies: ['Node.js', 'Cron jobs', 'GPT-4', 'Zapier API'],
    integrations: ['Google Calendar', 'Slack', 'Gmail', 'Trello'],
    demoAvailable: true
  },
  {
    id: '7',
    name: 'CopyCraft Free',
    description: 'Generate marketing copy, blogs, and product descriptions',
    category: 'text-tools',
    tier: 'freemium',
    icon: '✍️',
    popularTool: true,
    function: 'Generate marketing copy, blogs, and product descriptions',
    use_cases: ['Blog posts', 'Social media captions', 'Product descriptions', 'Email campaigns'],
    uniqueSellingPoint: 'Template-based content generation with brand voice',
    usageLimit: 'Free tier: 5000 words per month',
    technologies: ['GPT-4', 'Claude', 'TipTap editor', 'React'],
    integrations: ['WordPress', 'Shopify', 'Mailchimp', 'HubSpot'],
    demoAvailable: true
  },
  {
    id: '8',
    name: 'AI Basic Simulator',
    description: 'Simulate simple ML models with interactive visualizations',
    category: 'machine-learning',
    tier: 'freemium',
    icon: '⚙️',
    function: 'Simulate simple ML models with dummy data',
    use_cases: ['Learning ML concepts', 'Model prototyping', 'Educational demos', 'Algorithm comparison'],
    uniqueSellingPoint: 'Interactive ML simulations with real-time visualization',
    usageLimit: 'Free tier: 5 simulations per day',
    technologies: ['Scikit-learn', 'TensorFlow.js', 'Plotly', 'React'],
    integrations: ['Jupyter Notebook', 'Google Colab', 'Kaggle', 'GitHub'],
    demoAvailable: true
  },
  {
    id: '9',
    name: 'Forum Assistant',
    description: 'AI-powered forum moderation and discussion assistance',
    category: 'collaboration',
    tier: 'freemium',
    icon: '👥',
    function: 'Moderates and assists in forum discussions',
    use_cases: ['Community moderation', 'Response suggestions', 'Spam detection', 'Topic categorization'],
    uniqueSellingPoint: 'Intelligent moderation with context understanding',
    usageLimit: 'Free tier: 100 moderation actions per month',
    technologies: ['GPT-4', 'Perspective API', 'OpenAI Moderation', 'Firebase'],
    integrations: ['Discord', 'Reddit', 'Discourse', 'Slack'],
    demoAvailable: true
  },

  // BASIC TIER (8 tools)
  {
    id: '10',
    name: 'AI Code Assistant',
    description: 'Advanced code generation, debugging, and explanation tool',
    category: 'development',
    tier: 'basic',
    icon: '💻',
    popularTool: true,
    featured: true,
    function: 'Help with code generation, debugging, and explanations',
    use_cases: ['Code completion', 'Bug fixing', 'Code review', 'Algorithm implementation'],
    uniqueSellingPoint: 'Multi-language support with intelligent debugging',
    technologies: ['OpenAI Codex', 'GPT-4.1', 'StarCoder', 'Monaco Editor'],
    integrations: ['VS Code', 'GitHub', 'GitLab', 'IntelliJ IDEA'],
    rationale: 'Essential for modern development workflows'
  },
  {
    id: '11',
    name: 'AI Email Writer',
    description: 'Compose professional emails with tone and context awareness',
    category: 'productivity',
    tier: 'basic',
    icon: '📧',
    function: 'Compose emails based on prompts or replies',
    use_cases: ['Business emails', 'Customer support', 'Sales outreach', 'Follow-up messages'],
    uniqueSellingPoint: 'Context-aware email composition with tone control',
    technologies: ['GPT-4', 'Claude', 'Gmail API', 'SendGrid'],
    integrations: ['Gmail', 'Outlook', 'Mailchimp', 'Salesforce']
  },
  {
    id: '12',
    name: 'AI Music Composer Basic',
    description: 'Generate melodies and short musical loops',
    category: 'music',
    tier: 'basic',
    icon: '🎵',
    function: 'Generate melodies or short loops',
    use_cases: ['Background music', 'Jingles', 'Podcast intros', 'Video soundtracks'],
    uniqueSellingPoint: 'MIDI-compatible music generation with style control',
    technologies: ['Google MusicLM', 'OpenAI Jukebox', 'Tone.js', 'Magenta.js'],
    integrations: ['Spotify', 'SoundCloud', 'GarageBand', 'Ableton Live']
  },
  {
    id: '13',
    name: 'DataFlow Pro',
    description: 'Analyze complex datasets with AI-powered recommendations',
    category: 'data-analysis',
    tier: 'basic',
    icon: '📊',
    featured: true,
    function: 'Analyze complex datasets and recommend actions',
    use_cases: ['Business intelligence', 'Predictive analytics', 'Data visualization', 'Trend analysis'],
    uniqueSellingPoint: 'AI-powered actionable recommendations from complex data',
    technologies: ['Python Pandas', 'Scikit-learn', 'GPT-4', 'Streamlit'],
    integrations: ['Tableau', 'Power BI', 'Google Analytics', 'Salesforce']
  },
  {
    id: '14',
    name: 'AutoPilot Studio',
    description: 'Build custom automation workflows with visual interface',
    category: 'automation',
    tier: 'basic',
    icon: '⚡',
    function: 'Build custom automation workflows',
    use_cases: ['Business processes', 'Data pipelines', 'API integrations', 'Notification systems'],
    uniqueSellingPoint: 'Visual workflow builder with AI-suggested optimizations',
    technologies: ['n8n', 'Node-RED', 'GPT-4', 'Node.js'],
    integrations: ['Zapier', 'Make', 'Microsoft Flow', 'IFTTT']
  },
  {
    id: '15',
    name: 'ModelMaker Lite',
    description: 'Build and evaluate basic ML models with intuitive UI',
    category: 'machine-learning',
    tier: 'basic',
    icon: '🔧',
    function: 'Build and evaluate basic ML models with UI',
    use_cases: ['Classification models', 'Regression analysis', 'Model comparison', 'Feature selection'],
    uniqueSellingPoint: 'No-code ML model creation with automated evaluation',
    technologies: ['Scikit-learn', 'TensorFlow', 'Flask', 'React drag-and-drop'],
    integrations: ['Jupyter', 'Google Colab', 'MLflow', 'Weights & Biases']
  },
  {
    id: '16',
    name: 'SEO Boost AI',
    description: 'Analyze and optimize content for search engines',
    category: 'seo',
    tier: 'basic',
    icon: '🔍',
    function: 'Analyze and optimize content for SEO',
    use_cases: ['Content optimization', 'Keyword research', 'Competitor analysis', 'SERP tracking'],
    uniqueSellingPoint: 'AI-powered SEO recommendations with real-time scoring',
    technologies: ['GPT-4', 'BERT', 'Screaming Frog API', 'Google Search Console'],
    integrations: ['WordPress', 'Shopify', 'Webflow', 'Squarespace']
  },
  {
    id: '17',
    name: 'TeamSync AI',
    description: 'Sync team tasks, summaries, and collaborative notes',
    category: 'collaboration',
    tier: 'basic',
    icon: '🔗',
    function: 'Sync team tasks, summaries, and notes',
    use_cases: ['Project management', 'Meeting summaries', 'Task automation', 'Team communication'],
    uniqueSellingPoint: 'AI-powered team coordination with smart task prioritization',
    technologies: ['GPT-4', 'Node.js', 'Supabase Realtime', 'Webhooks'],
    integrations: ['Notion', 'Slack', 'Google Docs', 'Trello']
  },

  // PRO TIER (9 tools)
  {
    id: '18',
    name: 'AI Social Media Manager',
    description: 'Complete social media management with content creation and scheduling',
    category: 'marketing',
    tier: 'pro',
    icon: '📱',
    popularTool: true,
    featured: true,
    function: 'Plan, write, schedule, and post social content',
    use_cases: ['Content planning', 'Multi-platform posting', 'Engagement tracking', 'Hashtag optimization'],
    uniqueSellingPoint: 'End-to-end social media automation with AI content creation',
    technologies: ['GPT-4', 'DALL·E', 'Twitter API', 'Instagram API', 'LinkedIn API'],
    integrations: ['Hootsuite', 'Buffer', 'Sprout Social', 'Later']
  },
  {
    id: '19',
    name: 'AI Video Editor',
    description: 'Auto-edit videos with captions, transitions, and effects',
    category: 'video-editing',
    tier: 'pro',
    icon: '🎬',
    featured: true,
    function: 'Auto-edit clips, captions, transitions',
    use_cases: ['Video editing', 'Auto-captioning', 'Scene detection', 'Color correction'],
    uniqueSellingPoint: 'Intelligent video editing with automated post-production',
    technologies: ['RunwayML', 'Pika', 'ffmpeg', 'Whisper', 'React'],
    integrations: ['Adobe Premiere', 'Final Cut Pro', 'DaVinci Resolve', 'YouTube']
  },
  {
    id: '20',
    name: 'AI Voice Generator',
    description: 'Generate realistic speech from text with voice cloning',
    category: 'voice',
    tier: 'pro',
    icon: '🎤',
    popularTool: true,
    function: 'Generate speech from text',
    use_cases: ['Voiceovers', 'Audiobooks', 'Podcasts', 'Voice assistants'],
    uniqueSellingPoint: 'High-quality voice synthesis with emotion control',
    technologies: ['ElevenLabs', 'OpenAI TTS', 'Google Wavenet', 'WebAudio'],
    integrations: ['Audacity', 'Adobe Audition', 'Spotify', 'Apple Podcasts']
  },
  {
    id: '21',
    name: 'Predictirix Enterprise',
    description: 'Predict business KPIs and outcomes from historical data',
    category: 'data-analysis',
    tier: 'pro',
    icon: '📈',
    featured: true,
    function: 'Predict business KPIs from datasets',
    use_cases: ['Sales forecasting', 'Demand planning', 'Risk assessment', 'Market analysis'],
    uniqueSellingPoint: 'Enterprise-grade predictive analytics with narrative insights',
    technologies: ['XGBoost', 'Prophet', 'GPT-4', 'FastAPI', 'PostgreSQL'],
    integrations: ['Salesforce', 'SAP', 'Oracle', 'Microsoft Dynamics']
  },
  {
    id: '22',
    name: 'NeuroForge Pro',
    description: 'Train and deploy custom deep learning models',
    category: 'machine-learning',
    tier: 'pro',
    icon: '🧠',
    featured: true,
    function: 'Train and deploy deep learning models',
    use_cases: ['Custom AI models', 'Computer vision', 'NLP models', 'Model deployment'],
    uniqueSellingPoint: 'End-to-end deep learning pipeline with GPU acceleration',
    technologies: ['PyTorch', 'TensorFlow', 'ONNX', 'NVIDIA CUDA', 'Docker'],
    integrations: ['AWS SageMaker', 'Google AI Platform', 'Azure ML', 'Paperspace']
  },
  {
    id: '23',
    name: 'OmniFlow AI',
    description: 'Enterprise-level workflow automation and orchestration',
    category: 'automation',
    tier: 'pro',
    icon: '🔄',
    function: 'Enterprise-level workflow automation',
    use_cases: ['Complex workflows', 'Business process automation', 'Data orchestration', 'System integration'],
    uniqueSellingPoint: 'Enterprise-grade automation with AI-powered optimization',
    technologies: ['Temporal.io', 'Camunda', 'GPT-4', 'PostgreSQL', 'Grafana'],
    integrations: ['SAP', 'Oracle', 'Salesforce', 'Microsoft Dynamics']
  },
  {
    id: '24',
    name: 'AI Marketplace Publisher',
    description: 'Publish and monetize AI models and APIs',
    category: 'development',
    tier: 'pro',
    icon: '📦',
    function: 'Publish AI models/APIs for others to use',
    use_cases: ['Model marketplace', 'API monetization', 'Developer tools', 'Model sharing'],
    uniqueSellingPoint: 'Complete marketplace solution for AI model monetization',
    technologies: ['Docker', 'FastAPI', 'Stripe', 'OpenAPI', 'React'],
    integrations: ['Hugging Face', 'GitHub', 'Docker Hub', 'AWS Marketplace']
  },
  {
    id: '25',
    name: 'EthicsGuard AI',
    description: 'Analyze AI systems for ethical risks and bias detection',
    category: 'ethics',
    tier: 'pro',
    icon: '🛡️',
    function: 'Analyze AI systems for ethical risks and bias',
    use_cases: ['Bias detection', 'Fairness assessment', 'Ethical compliance', 'Model auditing'],
    uniqueSellingPoint: 'Comprehensive AI ethics and bias analysis platform',
    technologies: ['LIME', 'SHAP', 'GPT-4', 'Python fairness libraries'],
    integrations: ['MLflow', 'Weights & Biases', 'TensorBoard', 'Neptune']
  },
  {
    id: '26',
    name: 'CloudBridge AI',
    description: 'Manage and deploy AI projects across cloud platforms',
    category: 'cloud',
    tier: 'pro',
    icon: '☁️',
    function: 'Manage and deploy AI projects on the cloud',
    use_cases: ['Multi-cloud deployment', 'Resource management', 'Cost optimization', 'Performance monitoring'],
    uniqueSellingPoint: 'Universal cloud management for AI workloads',
    technologies: ['AWS', 'GCP', 'Azure APIs', 'Terraform', 'Kubernetes'],
    integrations: ['AWS', 'Google Cloud', 'Microsoft Azure', 'DigitalOcean']
  },

  // AGRICULTURE TOOLS - FREEMIUM TIER (4 tools)
  {
    id: '27',
    name: 'CropMind AI',
    description: 'Generative Agronomist for Smallholders - Daily crop insights using satellite and soil data',
    category: 'agriculture',
    tier: 'freemium',
    icon: '🌱',
    popularTool: true,
    featured: true,
    function: 'Provide AI-driven daily crop insights for smallholder farmers',
    use_cases: ['Daily crop monitoring', 'Fertilizer recommendations', 'Irrigation alerts', 'Pest management'],
    uniqueSellingPoint: 'Chat interface with voice support in local languages',
    usageLimit: 'Free tier: 3 fields monitoring, 10 daily insights',
    technologies: ['GPT-4', 'Satellite APIs', 'Soil sensors', 'WhatsApp API'],
    integrations: ['WhatsApp', 'CropX API', 'Weather APIs', 'SMS gateways'],
    demoAvailable: true
  },
  {
    id: '28',
    name: 'SmartPest Sentinel',
    description: 'Pest trap + camera + AI network for real-time pest detection and mitigation advice',
    category: 'agriculture',
    tier: 'freemium',
    icon: '🐛',
    function: 'Real-time pest detection and mitigation recommendations',
    use_cases: ['Pest identification', 'Outbreak alerts', 'Treatment advice', 'Pest lifecycle tracking'],
    uniqueSellingPoint: 'Community-shared pest outbreak data with local heatmaps',
    usageLimit: 'Free tier: 20 pest identifications per month',
    technologies: ['Computer Vision', 'IoT cameras', 'GPT-4', 'Geographic mapping'],
    integrations: ['IoT trap devices', 'Weather APIs', 'Pesticide suppliers', 'Community platforms'],
    demoAvailable: true
  },
  {
    id: '29',
    name: 'Livestock Guardian Vision',
    description: 'Vision-based animal health alert system using low-cost cameras',
    category: 'agriculture',
    tier: 'freemium',
    icon: '👁️',
    function: 'Monitor animal health through computer vision analysis',
    use_cases: ['Health monitoring', 'Behavior analysis', 'Alert notifications', 'Activity tracking'],
    uniqueSellingPoint: 'Detect limping, isolation, and abnormal behavior patterns',
    usageLimit: 'Free tier: 5 animals monitoring, basic alerts',
    technologies: ['Computer Vision', 'Mobile cameras', 'CCTV integration', 'Alert systems'],
    integrations: ['CCTV systems', 'Mobile apps', 'RFID tags', 'CattleEye'],
    demoAvailable: true
  },
  {
    id: '30',
    name: 'AgriMesh Network',
    description: 'Hyperlocal Crop Intelligence Network - Peer-powered decentralized farming insights',
    category: 'agriculture',
    tier: 'freemium',
    icon: '🌐',
    function: 'Share and access real-time farming insights from peer network',
    use_cases: ['Peer insights', 'Regional trends', 'Crop reporting', 'Community knowledge'],
    uniqueSellingPoint: 'Decentralized network for real-time farming intelligence',
    usageLimit: 'Free tier: Basic regional dashboard, limited reports',
    technologies: ['Blockchain', 'P2P networking', 'GPT-4', 'Geographic mapping'],
    integrations: ['WhatsApp bot', 'CropMind AI', 'Government portals', 'NGO platforms'],
    demoAvailable: true
  },

  // AGRICULTURE TOOLS - BASIC TIER (4 tools)
  {
    id: '31',
    name: 'AgroBot Commander',
    description: 'Centralized control system for autonomous farm robots with optimization and analytics',
    category: 'agriculture',
    tier: 'basic',
    icon: '🤖',
    featured: true,
    function: 'Control and optimize autonomous farm robot operations',
    use_cases: ['Robot fleet management', 'Route optimization', 'Task scheduling', 'Performance analytics'],
    uniqueSellingPoint: 'AI-optimized route planning with weather-aware scheduling',
    technologies: ['IoT', 'GPS mapping', 'AI optimization', 'Weather APIs'],
    integrations: ['John Deere', 'Solinftec', 'Weather stations', 'Farm management systems']
  },
  {
    id: '32',
    name: 'Aquayield OS',
    description: 'AI irrigation scheduler that integrates weather, crop stage, and soil sensors',
    category: 'agriculture',
    tier: 'basic',
    icon: '💧',
    function: 'Optimize irrigation scheduling using AI and sensor data',
    use_cases: ['Irrigation scheduling', 'Water optimization', 'Crop stage monitoring', 'Soil moisture tracking'],
    uniqueSellingPoint: 'ML models optimize irrigation by crop stage with real-time control',
    technologies: ['ML models', 'Soil sensors', 'Weather APIs', 'IoT controls'],
    integrations: ['Soil moisture sensors', 'Weather stations', 'Pump controllers', 'Farm sensors']
  },
  {
    id: '33',
    name: 'FarmP&L AI',
    description: 'Automated profitability tracking tool for fields, crops, and seasons',
    category: 'agriculture',
    tier: 'basic',
    icon: '💰',
    function: 'Track and analyze farm profitability across fields and seasons',
    use_cases: ['Profit tracking', 'Cost analysis', 'ROI calculation', 'Financial planning'],
    uniqueSellingPoint: 'AI suggestions for profit-maximizing input use with commodity forecasts',
    technologies: ['AI analytics', 'Financial modeling', 'API integrations', 'Reporting'],
    integrations: ['John Deere', 'Climate FieldView', 'Bushel', 'Financial systems']
  },
  {
    id: '34',
    name: 'AgroRisk Navigator',
    description: 'Risk simulator for weather/climate-driven yield and insurance planning',
    category: 'agriculture',
    tier: 'basic',
    icon: '🌦️',
    function: 'Simulate weather risks and optimize insurance planning',
    use_cases: ['Risk assessment', 'Weather simulation', 'Insurance planning', 'Yield prediction'],
    uniqueSellingPoint: 'Climate scenario modeling with insurance product recommendations',
    technologies: ['Weather simulation', 'Risk modeling', 'Insurance APIs', 'Climate data'],
    integrations: ['Weather stations', 'Insurance providers', 'Arable Mark 3', 'Sencrop stations']
  },

  // AGRICULTURE TOOLS - PRO TIER (4 tools)
  {
    id: '35',
    name: 'AgriTrial AI',
    description: 'Field trial management & analytics platform for ag companies and co-ops',
    category: 'agriculture',
    tier: 'pro',
    icon: '🔬',
    featured: true,
    function: 'Manage and analyze agricultural field trials with AI insights',
    use_cases: ['Trial management', 'Statistical analysis', 'Research insights', 'Report generation'],
    uniqueSellingPoint: 'White-label platform with automatic insights from trial results',
    technologies: ['Statistical analysis', 'Drone integration', 'AI insights', 'Report generation'],
    integrations: ['Drone platforms', 'Satellite imagery', 'Research databases', 'Report systems']
  },
  {
    id: '36',
    name: 'RegenCert Hub',
    description: 'Digital tool for managing, verifying, and marketing regenerative agriculture practices',
    category: 'agriculture',
    tier: 'pro',
    icon: '♻️',
    featured: true,
    function: 'Manage regenerative agriculture certification and carbon tracking',
    use_cases: ['Practice logging', 'Carbon tracking', 'Certification management', 'Traceability'],
    uniqueSellingPoint: 'Blockchain-based certification with carbon credit integration',
    technologies: ['Blockchain', 'Carbon tracking', 'IoT sensors', 'QR traceability'],
    integrations: ['CropX', 'Agmatix', 'Carbon exchanges', 'Buyer marketplaces']
  },
  {
    id: '37',
    name: 'AgroAPI Marketplace',
    description: 'Centralized API store for AgriTech developers to access agriculture datasets',
    category: 'agriculture',
    tier: 'pro',
    icon: '🗄️',
    function: 'Provide APIs for weather, soil, satellite, and agricultural data',
    use_cases: ['API integration', 'Data monetization', 'Developer tools', 'Agriculture datasets'],
    uniqueSellingPoint: 'Embedded AI models marketplace with curated data bundles',
    technologies: ['API management', 'Data processing', 'SDKs', 'Analytics'],
    integrations: ['Weather services', 'Satellite providers', 'Soil databases', 'Developer platforms']
  },
  {
    id: '38',
    name: 'Fieldsim Xr',
    description: 'Immersive farm training simulator using real-world data and mixed reality',
    category: 'agriculture',
    tier: 'pro',
    icon: '🎮',
    featured: true,
    function: 'Provide immersive VR/AR training for farming practices',
    use_cases: ['Training simulation', 'Skill development', 'Educational content', 'Certification'],
    uniqueSellingPoint: 'Real farm data integration with multiplayer training modes',
    technologies: ['VR/AR', 'Real-world data', 'Training systems', 'Certification'],
    integrations: ['VR headsets', 'Android apps', 'Farm data systems', 'Training platforms']
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
