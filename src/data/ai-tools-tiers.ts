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
    rationale: 'Quickly create visuals without needing design skills.'
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
    rationale: 'Save time by quickly understanding key information.'
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
    rationale: 'Improve coding efficiency and accuracy.'
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
    rationale: 'Streamline email communication and save time.'
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
    rationale: 'Enhance social media presence and engagement.'
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
    rationale: 'Simplify video editing and create high-quality videos.'
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
    rationale: 'Design professional presentations quickly and easily.'
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
    rationale: 'Create unique music tracks without needing musical skills.'
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
    rationale: 'Communicate effectively across different languages.'
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
    rationale: 'Create professional voiceovers without hiring voice actors.'
  },
];
