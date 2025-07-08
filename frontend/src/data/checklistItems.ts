import { AIToolItem } from './ai-tools-tiers';

export interface ChecklistItem {
  id: string;
  title: string;
  status: 'pending' | 'checking' | 'success' | 'error';
  message?: string;
  details?: string;
}

export interface ToolChecklistItem extends ChecklistItem {
  toolId: string;
}

export const imageGeneratorChecklist: ToolChecklistItem[] = [
  {
    id: 'img-gen-api',
    toolId: '1',
    title: 'API Connectivity',
    status: 'pending',
    details: 'Check connection to Stability AI, DALL·E, and Cloudinary APIs.',
  },
  {
    id: 'img-gen-styles',
    toolId: '1',
    title: 'Style Options',
    status: 'pending',
    details: 'Verify that all style options are available and functional.',
  },
  {
    id: 'img-gen-usage',
    toolId: '1',
    title: 'Usage Limits',
    status: 'pending',
    details: 'Ensure free tier usage limits (10 images/day) are enforced.',
  },
  {
    id: 'img-gen-integrations',
    toolId: '1',
    title: 'Integrations',
    status: 'pending',
    details: 'Test integrations with Canva, Figma, and Adobe Creative Suite.',
  },
];

export const textSummarizerChecklist: ToolChecklistItem[] = [
  {
    id: 'text-summ-api',
    toolId: '2',
    title: 'API Connectivity',
    status: 'pending',
    details: 'Check connection to OpenAI GPT-4 and Hugging Face Transformers.',
  },
  {
    id: 'text-summ-usage',
    toolId: '2',
    title: 'Usage Limits',
    status: 'pending',
    details: 'Ensure free tier usage limits (5 documents/day) are enforced.',
  },
  {
    id: 'text-summ-integrations',
    toolId: '2',
    title: 'Integrations',
    status: 'pending',
    details: 'Test integrations with Google Docs, Microsoft Word, and Notion.',
  },
];

export const presentationMakerChecklist: ToolChecklistItem[] = [
  {
    id: 'pres-maker-api',
    toolId: '3',
    title: 'API Connectivity',
    status: 'pending',
    details: 'Check connection to GPT-4 and DALL·E for content generation.',
  },
  {
    id: 'pres-maker-export',
    toolId: '3',
    title: 'Export Functionality',
    status: 'pending',
    details: 'Verify that Puppeteer export to PDF/PPTX is working.',
  },
  {
    id: 'pres-maker-usage',
    toolId: '3',
    title: 'Usage Limits',
    status: 'pending',
    details: 'Ensure free tier usage limits (3 presentations/month) are enforced.',
  },
  {
    id: 'pres-maker-integrations',
    toolId: '3',
    title: 'Integrations',
    status: 'pending',
    details: 'Test integrations with PowerPoint, Google Slides, and Keynote.',
  },
];

export const languageTranslatorChecklist: ToolChecklistItem[] = [
  {
    id: 'lang-trans-api',
    toolId: '4',
    title: 'API Connectivity',
    status: 'pending',
    details: 'Check connection to Google Translate API and DeepL API.',
  },
  {
    id: 'lang-trans-languages',
    toolId: '4',
    title: 'Language Support',
    status: 'pending',
    details: 'Verify that all 100+ languages are supported.',
  },
  {
    id: 'lang-trans-usage',
    toolId: '4',
    title: 'Usage Limits',
    status: 'pending',
    details: 'Ensure free tier usage limits (1000 characters/day) are enforced.',
  },
  {
    id: 'lang-trans-integrations',
    toolId: '4',
    title: 'Integrations',
    status: 'pending',
    details: 'Test integrations with Google Chrome, Microsoft Office, and Slack.',
  },
];

export const insightLiteChecklist: ToolChecklistItem[] = [
  {
    id: 'insight-lite-api',
    toolId: '5',
    title: 'API Connectivity',
    status: 'pending',
    details: 'Check connection to GPT-4 for generating insights.',
  },
  {
    id: 'insight-lite-data-processing',
    toolId: '5',
    title: 'Data Processing',
    status: 'pending',
    details: 'Verify CSV/Excel parsing with Pandas and NumPy.',
  },
  {
    id: 'insight-lite-usage',
    toolId: '5',
    title: 'Usage Limits',
    status: 'pending',
    details: 'Ensure free tier usage limits (5 datasets/month) are enforced.',
  },
  {
    id: 'insight-lite-integrations',
    toolId: '5',
    title: 'Integrations',
    status: 'pending',
    details: 'Test integrations with Excel, Google Sheets, and Power BI.',
  },
];

export const taskBotMiniChecklist: ToolChecklistItem[] = [
  {
    id: 'taskbot-api',
    toolId: '6',
    title: 'API Connectivity',
    status: 'pending',
    details: 'Check connection to GPT-4 and Zapier API.',
  },
  {
    id: 'taskbot-scheduler',
    toolId: '6',
    title: 'Scheduling Engine',
    status: 'pending',
    details: 'Verify that cron jobs for scheduling are running correctly.',
  },
  {
    id: 'taskbot-usage',
    toolId: '6',
    title: 'Usage Limits',
    status: 'pending',
    details: 'Ensure free tier usage limits (10 automated tasks/month) are enforced.',
  },
  {
    id: 'taskbot-integrations',
    toolId: '6',
    title: 'Integrations',
    status: 'pending',
    details: 'Test integrations with Google Calendar, Slack, and Gmail.',
  },
];

export const copyCraftFreeChecklist: ToolChecklistItem[] = [
  {
    id: 'copycraft-api',
    toolId: '7',
    title: 'API Connectivity',
    status: 'pending',
    details: 'Check connection to GPT-4 and Claude for content generation.',
  },
  {
    id: 'copycraft-editor',
    toolId: '7',
    title: 'Editor Functionality',
    status: 'pending',
    details: 'Verify that the TipTap editor is fully functional.',
  },
  {
    id: 'copycraft-usage',
    toolId: '7',
    title: 'Usage Limits',
    status: 'pending',
    details: 'Ensure free tier usage limits (5000 words/month) are enforced.',
  },
  {
    id: 'copycraft-integrations',
    toolId: '7',
    title: 'Integrations',
    status: 'pending',
    details: 'Test integrations with WordPress, Shopify, and Mailchimp.',
  },
];

export const aiBasicSimulatorChecklist: ToolChecklistItem[] = [
  {
    id: 'ai-sim-api',
    toolId: '8',
    title: 'Simulation Libraries',
    status: 'pending',
    details: 'Check connection to Scikit-learn and TensorFlow.js.',
  },
  {
    id: 'ai-sim-viz',
    toolId: '8',
    title: 'Visualization',
    status: 'pending',
    details: 'Verify that Plotly visualizations are rendering correctly.',
  },
  {
    id: 'ai-sim-usage',
    toolId: '8',
    title: 'Usage Limits',
    status: 'pending',
    details: 'Ensure free tier usage limits (5 simulations/day) are enforced.',
  },
  {
    id: 'ai-sim-integrations',
    toolId: '8',
    title: 'Integrations',
    status: 'pending',
    details: 'Test integrations with Jupyter Notebook and Google Colab.',
  },
];

export const forumAssistantChecklist: ToolChecklistItem[] = [
  {
    id: 'forum-assist-api',
    toolId: '9',
    title: 'API Connectivity',
    status: 'pending',
    details: 'Check connection to GPT-4, Perspective API, and OpenAI Moderation.',
  },
  {
    id: 'forum-assist-db',
    toolId: '9',
    title: 'Database',
    status: 'pending',
    details: 'Verify Firebase connection for storing moderation logs.',
  },
  {
    id: 'forum-assist-usage',
    toolId: '9',
    title: 'Usage Limits',
    status: 'pending',
    details: 'Ensure free tier usage limits (100 moderation actions/month) are enforced.',
  },
  {
    id: 'forum-assist-integrations',
    toolId: '9',
    title: 'Integrations',
    status: 'pending',
    details: 'Test integrations with Discord, Reddit, and Discourse.',
  },
];

export const aiCodeAssistantChecklist: ToolChecklistItem[] = [
  {
    id: 'code-assist-api',
    toolId: '10',
    title: 'API Connectivity',
    status: 'pending',
    details: 'Check connection to OpenAI Codex, GPT-4.1, and StarCoder.',
  },
  {
    id: 'code-assist-editor',
    toolId: '10',
    title: 'Editor Functionality',
    status: 'pending',
    details: 'Verify that the Monaco Editor is working correctly.',
  },
  {
    id: 'code-assist-languages',
    toolId: '10',
    title: 'Language Support',
    status: 'pending',
    details: 'Check multi-language support for code generation and debugging.',
  },
  {
    id: 'code-assist-integrations',
    toolId: '10',
    title: 'Integrations',
    status: 'pending',
    details: 'Test integrations with VS Code, GitHub, and GitLab.',
  },
];

export const aiEmailWriterChecklist: ToolChecklistItem[] = [
  {
    id: 'email-writer-api',
    toolId: '11',
    title: 'API Connectivity',
    status: 'pending',
    details: 'Check connection to GPT-4, Claude, and SendGrid.',
  },
  {
    id: 'email-writer-tone',
    toolId: '11',
    title: 'Tone Control',
    status: 'pending',
    details: 'Verify that tone and context awareness are functional.',
  },
  {
    id: 'email-writer-integrations',
    toolId: '11',
    title: 'Integrations',
    status: 'pending',
    details: 'Test integrations with Gmail, Outlook, and Salesforce.',
  },
];

export const aiMusicComposerChecklist: ToolChecklistItem[] = [
  {
    id: 'music-composer-api',
    toolId: '12',
    title: 'API Connectivity',
    status: 'pending',
    details: 'Check connection to Google MusicLM and OpenAI Jukebox.',
  },
  {
    id: 'music-composer-midi',
    toolId: '12',
    title: 'MIDI Compatibility',
    status: 'pending',
    details: 'Verify that MIDI export is working correctly.',
  },
  {
    id: 'music-composer-style',
    toolId: '12',
    title: 'Style Control',
    status: 'pending',
    details: 'Ensure that style control options are functional.',
  },
  {
    id: 'music-composer-integrations',
    toolId: '12',
    title: 'Integrations',
    status: 'pending',
    details: 'Test integrations with Spotify, SoundCloud, and GarageBand.',
  },
];

export const dataFlowProChecklist: ToolChecklistItem[] = [
  {
    id: 'data-flow-api',
    toolId: '13',
    title: 'API Connectivity',
    status: 'pending',
    details: 'Check connection to Python Pandas, Scikit-learn, and GPT-4.',
  },
  {
    id: 'data-flow-viz',
    toolId: '13',
    title: 'Data Visualization',
    status: 'pending',
    details: 'Verify that Streamlit components are rendering correctly.',
  },
  {
    id: 'data-flow-recommendations',
    toolId: '13',
    title: 'Actionable Recommendations',
    status: 'pending',
    details: 'Ensure the AI-powered recommendations are being generated.',
  },
  {
    id: 'data-flow-integrations',
    toolId: '13',
    title: 'Integrations',
    status: 'pending',
    details: 'Test integrations with Tableau, Power BI, and Salesforce.',
  },
];

export const autoPilotStudioChecklist: ToolChecklistItem[] = [
  {
    id: 'autopilot-api',
    toolId: '14',
    title: 'API Connectivity',
    status: 'pending',
    details: 'Check connection to n8n, Node-RED, and GPT-4.',
  },
  {
    id: 'autopilot-builder',
    toolId: '14',
    title: 'Visual Workflow Builder',
    status: 'pending',
    details: 'Verify that the visual workflow builder is functional.',
  },
  {
    id: 'autopilot-optimizations',
    toolId: '14',
    title: 'AI-Suggested Optimizations',
    status: 'pending',
    details: 'Ensure that AI-suggested optimizations are being generated.',
  },
  {
    id: 'autopilot-integrations',
    toolId: '14',
    title: 'Integrations',
    status: 'pending',
    details: 'Test integrations with Zapier, Make, and Microsoft Flow.',
  },
];

export const aiStreamsChecklist: ToolChecklistItem[] = [
  {
    id: 'ai-streams-api',
    toolId: '15',
    title: 'API Connectivity',
    status: 'pending',
    details: 'Check connection to video streaming and processing APIs.',
  },
  {
    id: 'ai-streams-upload',
    toolId: '15',
    title: 'Upload Functionality',
    status: 'pending',
    details: 'Verify that video upload and processing are working correctly.',
  },
  {
    id: 'ai-streams-search',
    toolId: '15',
    title: 'Search and Filtering',
    status: 'pending',
    details: 'Ensure that search and filtering options are functional.',
  },
  {
    id: 'ai-streams-access',
    toolId: '15',
    title: 'Tier-Based Access',
    status: 'pending',
    details: 'Verify that tier-based access controls are enforced.',
  },
];

export const getChecklistForTool = (tool: AIToolItem): ToolChecklistItem[] => {
  switch (tool.id) {
    case '1':
      return imageGeneratorChecklist;
    case '2':
      return textSummarizerChecklist;
    case '3':
      return presentationMakerChecklist;
    case '4':
      return languageTranslatorChecklist;
    case '5':
      return insightLiteChecklist;
    case '6':
      return taskBotMiniChecklist;
    case '7':
      return copyCraftFreeChecklist;
    case '8':
      return aiBasicSimulatorChecklist;
    case '9':
      return forumAssistantChecklist;
    case '10':
      return aiCodeAssistantChecklist;
    case '11':
      return aiEmailWriterChecklist;
    case '12':
      return aiMusicComposerChecklist;
    case '13':
      return dataFlowProChecklist;
    case '14':
      return autoPilotStudioChecklist;
    case '15':
      return aiStreamsChecklist;
    default:
      return [];
  }
};
