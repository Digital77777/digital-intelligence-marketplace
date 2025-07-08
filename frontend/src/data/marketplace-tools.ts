
import {
  BookOpen,
  Eye,
  Brain,
  BarChart,
  Workflow,
  Code,
  Database,
  Headphones,
  Users,
  MessageSquare,
  Camera,
  LineChart,
  Sparkles,
  Bot,
  Search,
  PanelTop,
  CircuitBoard,
  AreaChart,
  Mic,
  Share2,
  Edit3,
  FileText,
  Video,
  Image,
  Megaphone,
  Zap,
  Target,
  TrendingUp,
  CheckSquare,
  Calendar,
  Award,
  Palette
} from 'lucide-react';
import React from 'react';

export type MarketplaceTool = {
  id: number;
  name: string;
  description: string;
  category: string;
  isPremium: boolean;
  price: number;
  rating: number;
  icon: React.ReactNode;
}

export const marketplaceTools: MarketplaceTool[] = [
  // Content Creation and Writing
  {
    id: 1,
    name: "Jasper",
    description: "AI-powered writing assistant for creating blog posts, marketing copy, and social media content.",
    category: "content-creation",
    isPremium: true,
    price: 29,
    rating: 4.8,
    icon: React.createElement(Edit3, { className: "w-6 h-6" })
  },
  {
    id: 2,
    name: "Writesonic",
    description: "Generates SEO-optimized articles, ads, and product descriptions with minimal input.",
    category: "content-creation",
    isPremium: true,
    price: 19,
    rating: 4.7,
    icon: React.createElement(FileText, { className: "w-6 h-6" })
  },
  {
    id: 3,
    name: "Anyword",
    description: "Uses predictive analytics to craft data-driven copy for marketing campaigns.",
    category: "content-creation",
    isPremium: true,
    price: 39,
    rating: 4.6,
    icon: React.createElement(Target, { className: "w-6 h-6" })
  },
  {
    id: 4,
    name: "Article Forge",
    description: "Automatically produces full-length articles using deep learning algorithms.",
    category: "content-creation",
    isPremium: true,
    price: 57,
    rating: 4.5,
    icon: React.createElement(BookOpen, { className: "w-6 h-6" })
  },
  {
    id: 5,
    name: "Frase",
    description: "Combines content creation with SEO research to optimize content for search engines.",
    category: "content-creation",
    isPremium: true,
    price: 44,
    rating: 4.7,
    icon: React.createElement(Search, { className: "w-6 h-6" })
  },

  // Productivity and Task Management
  {
    id: 6,
    name: "Notion AI",
    description: "Enhances Notion workspaces with AI-driven content suggestions and task automation.",
    category: "productivity",
    isPremium: true,
    price: 10,
    rating: 4.8,
    icon: React.createElement(PanelTop, { className: "w-6 h-6" })
  },
  {
    id: 7,
    name: "Asana",
    description: "Integrates AI to prioritize tasks and optimize project management workflows.",
    category: "productivity",
    isPremium: false,
    price: 0,
    rating: 4.6,
    icon: React.createElement(CheckSquare, { className: "w-6 h-6" })
  },
  {
    id: 8,
    name: "Bit.ai",
    description: "Collaborative document platform with AI assistance for content organization.",
    category: "productivity",
    isPremium: true,
    price: 8,
    rating: 4.5,
    icon: React.createElement(Users, { className: "w-6 h-6" })
  },

  // Natural Language Processing
  {
    id: 9,
    name: "LanguageTool",
    description: "AI-based grammar and style checker for multilingual content.",
    category: "nlp",
    isPremium: false,
    price: 0,
    rating: 4.7,
    icon: React.createElement(MessageSquare, { className: "w-6 h-6" })
  },
  {
    id: 10,
    name: "MonkeyLearn",
    description: "Provides text analysis and sentiment analysis for unstructured data.",
    category: "nlp",
    isPremium: true,
    price: 299,
    rating: 4.6,
    icon: React.createElement(Brain, { className: "w-6 h-6" })
  },
  {
    id: 11,
    name: "MeaningCloud",
    description: "Offers advanced text analytics for sentiment, intent, and topic extraction.",
    category: "nlp",
    isPremium: true,
    price: 150,
    rating: 4.5,
    icon: React.createElement(MessageSquare, { className: "w-6 h-6" })
  },

  // Marketing and Sales
  {
    id: 12,
    name: "HubSpot",
    description: "AI-enhanced CRM for automated marketing, sales tracking, and customer insights.",
    category: "marketing",
    isPremium: true,
    price: 50,
    rating: 4.9,
    icon: React.createElement(TrendingUp, { className: "w-6 h-6" })
  },
  {
    id: 13,
    name: "Semrush",
    description: "SEO and competitor analysis tool with AI-driven keyword and content suggestions.",
    category: "marketing",
    isPremium: true,
    price: 119,
    rating: 4.8,
    icon: React.createElement(Search, { className: "w-6 h-6" })
  },
  {
    id: 14,
    name: "GetResponse",
    description: "AI-powered email marketing and automation for targeted campaigns.",
    category: "marketing",
    isPremium: true,
    price: 15,
    rating: 4.7,
    icon: React.createElement(Megaphone, { className: "w-6 h-6" })
  },
  {
    id: 15,
    name: "Seamless.ai",
    description: "Sales intelligence tool for lead generation and prospecting.",
    category: "marketing",
    isPremium: true,
    price: 79,
    rating: 4.6,
    icon: React.createElement(Target, { className: "w-6 h-6" })
  },

  // Computer Vision
  {
    id: 16,
    name: "Amazon Rekognition",
    description: "Cloud-based service for image and video analysis, including facial recognition and object detection.",
    category: "computer-vision",
    isPremium: true,
    price: 0.001,
    rating: 4.8,
    icon: React.createElement(Eye, { className: "w-6 h-6" })
  },
  {
    id: 17,
    name: "Clarifai",
    description: "AI platform for image and video recognition with customizable models.",
    category: "computer-vision",
    isPremium: true,
    price: 20,
    rating: 4.7,
    icon: React.createElement(Camera, { className: "w-6 h-6" })
  },

  // Video and Audio
  {
    id: 18,
    name: "Zebracat",
    description: "AI-driven content creation tool for generating promotional and social media videos.",
    category: "video-audio",
    isPremium: true,
    price: 29,
    rating: 4.6,
    icon: React.createElement(Video, { className: "w-6 h-6" })
  },
  {
    id: 19,
    name: "VidIQ",
    description: "YouTube optimization tool with AI analytics for audience growth and engagement.",
    category: "video-audio",
    isPremium: true,
    price: 7.5,
    rating: 4.7,
    icon: React.createElement(BarChart, { className: "w-6 h-6" })
  },
  {
    id: 20,
    name: "Descript",
    description: "AI-powered audio and video editing with automatic transcription and overdubbing.",
    category: "video-audio",
    isPremium: true,
    price: 12,
    rating: 4.8,
    icon: React.createElement(Video, { className: "w-6 h-6" })
  },
  {
    id: 21,
    name: "Synthesia",
    description: "Creates AI-generated videos with virtual avatars for presentations and training.",
    category: "video-audio",
    isPremium: true,
    price: 30,
    rating: 4.5,
    icon: React.createElement(Users, { className: "w-6 h-6" })
  },
  {
    id: 22,
    name: "Murf",
    description: "Text-to-speech tool for generating realistic AI voiceovers.",
    category: "video-audio",
    isPremium: true,
    price: 23,
    rating: 4.6,
    icon: React.createElement(Mic, { className: "w-6 h-6" })
  },
  {
    id: 23,
    name: "LANDR",
    description: "AI-based audio mastering for music production and podcasting.",
    category: "video-audio",
    isPremium: true,
    price: 11.99,
    rating: 4.4,
    icon: React.createElement(Headphones, { className: "w-6 h-6" })
  },

  // Graphic Design and Image Editing
  {
    id: 24,
    name: "Pixlr",
    description: "AI-enhanced online photo editor for quick and professional image editing.",
    category: "graphic-design",
    isPremium: true,
    price: 7.99,
    rating: 4.5,
    icon: React.createElement(Image, { className: "w-6 h-6" })
  },
  {
    id: 25,
    name: "Deep Art Effects",
    description: "Transforms images into artistic styles using neural networks.",
    category: "graphic-design",
    isPremium: true,
    price: 9.99,
    rating: 4.3,
    icon: React.createElement(Palette, { className: "w-6 h-6" })
  },
  {
    id: 26,
    name: "Simplified",
    description: "AI-driven design platform for creating graphics, presentations, and videos.",
    category: "graphic-design",
    isPremium: true,
    price: 12,
    rating: 4.6,
    icon: React.createElement(Zap, { className: "w-6 h-6" })
  },

  // Machine Learning and Predictive Analytics
  {
    id: 27,
    name: "RapidMiner",
    description: "No-code platform for data preparation, machine learning, and predictive analytics.",
    category: "ml-frameworks",
    isPremium: true,
    price: 2500,
    rating: 4.7,
    icon: React.createElement(Brain, { className: "w-6 h-6" })
  },
  {
    id: 28,
    name: "DataIku",
    description: "Collaborative data science platform for building and deploying AI models.",
    category: "ml-frameworks",
    isPremium: true,
    price: 4000,
    rating: 4.6,
    icon: React.createElement(Database, { className: "w-6 h-6" })
  },
  {
    id: 29,
    name: "BigML",
    description: "Cloud-based machine learning platform for predictive modeling and automation.",
    category: "ml-frameworks",
    isPremium: true,
    price: 30,
    rating: 4.5,
    icon: React.createElement(CircuitBoard, { className: "w-6 h-6" })
  },
  {
    id: 30,
    name: "Amazon SageMaker",
    description: "Fully managed service for building, training, and deploying machine learning models.",
    category: "ml-frameworks",
    isPremium: true,
    price: 0.065,
    rating: 4.8,
    icon: React.createElement(Brain, { className: "w-6 h-6" })
  },
  {
    id: 31,
    name: "Microsoft Azure Machine Learning",
    description: "Cloud platform for scalable AI model development and deployment.",
    category: "ml-frameworks",
    isPremium: true,
    price: 0.10,
    rating: 4.7,
    icon: React.createElement(CircuitBoard, { className: "w-6 h-6" })
  },

  // Legacy/Free tools from original list
  {
    id: 32,
    name: "Hugging Face Transformers",
    description: "Pre-trained models for text generation/classification.",
    category: "nlp",
    isPremium: false,
    price: 0,
    rating: 4.8,
    icon: React.createElement(MessageSquare, { className: "w-6 h-6" })
  },
  {
    id: 33,
    name: "OpenCV",
    description: "Open-source library for image/video processing.",
    category: "computer-vision",
    isPremium: false,
    price: 0,
    rating: 4.9,
    icon: React.createElement(Camera, { className: "w-6 h-6" })
  },
  {
    id: 34,
    name: "Scikit-learn",
    description: "Tools for classification, regression, and clustering.",
    category: "ml-frameworks",
    isPremium: false,
    price: 0,
    rating: 4.9,
    icon: React.createElement(Brain, { className: "w-6 h-6" })
  },
  {
    id: 35,
    name: "TensorFlow",
    description: "End-to-end platform for ML model building.",
    category: "ml-frameworks",
    isPremium: false,
    price: 0,
    rating: 4.8,
    icon: React.createElement(Brain, { className: "w-6 h-6" })
  },
  {
    id: 36,
    name: "Pandas",
    description: "Data manipulation and analysis toolkit.",
    category: "data-analysis",
    isPremium: false,
    price: 0,
    rating: 4.9,
    icon: React.createElement(BarChart, { className: "w-6 h-6" })
  },
  {
    id: 37,
    name: "Apache Airflow",
    description: "Programmatic workflow orchestration.",
    category: "automation",
    isPremium: false,
    price: 0,
    rating: 4.7,
    icon: React.createElement(Workflow, { className: "w-6 h-6" })
  },
  {
    id: 38,
    name: "GitHub Copilot",
    description: "AI pair programmer for coding.",
    category: "code-assistance",
    isPremium: true,
    price: 10,
    rating: 4.9,
    icon: React.createElement(Code, { className: "w-6 h-6" })
  },
  {
    id: 39,
    name: "Metabase",
    description: "Open-source analytics and dashboards.",
    category: "business-intelligence",
    isPremium: false,
    price: 0,
    rating: 4.8,
    icon: React.createElement(Database, { className: "w-6 h-6" })
  },
  {
    id: 40,
    name: "Librosa",
    description: "Audio analysis and feature extraction.",
    category: "audio-speech",
    isPremium: false,
    price: 0,
    rating: 4.7,
    icon: React.createElement(Headphones, { className: "w-6 h-6" })
  },
  {
    id: 41,
    name: "Slack",
    description: "Team communication and file sharing.",
    category: "collaboration",
    isPremium: false,
    price: 0,
    rating: 4.9,
    icon: React.createElement(Users, { className: "w-6 h-6" })
  }
];
