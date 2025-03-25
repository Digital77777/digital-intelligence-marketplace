
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
  Share2
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
  // Category 1: Natural Language Processing (NLP)
  {
    id: 1,
    name: "Hugging Face Transformers",
    description: "Pre-trained models for text generation/classification.",
    category: "nlp",
    isPremium: false,
    price: 0,
    rating: 4.8,
    icon: React.createElement(MessageSquare, { className: "w-6 h-6" })
  },
  {
    id: 2,
    name: "spaCy",
    description: "Industrial-strength NLP for entity recognition and syntax parsing.",
    category: "nlp",
    isPremium: false,
    price: 0,
    rating: 4.7,
    icon: React.createElement(MessageSquare, { className: "w-6 h-6" })
  },
  {
    id: 3,
    name: "NLTK",
    description: "Toolkit for text processing and linguistic data analysis.",
    category: "nlp",
    isPremium: false,
    price: 0,
    rating: 4.6,
    icon: React.createElement(MessageSquare, { className: "w-6 h-6" })
  },
  {
    id: 4,
    name: "TextBlob",
    description: "Simplified text processing and sentiment analysis.",
    category: "nlp",
    isPremium: false,
    price: 0,
    rating: 4.5,
    icon: React.createElement(MessageSquare, { className: "w-6 h-6" })
  },
  {
    id: 5,
    name: "Gensim",
    description: "Topic modeling and document similarity.",
    category: "nlp",
    isPremium: false,
    price: 0,
    rating: 4.4,
    icon: React.createElement(MessageSquare, { className: "w-6 h-6" })
  },

  // Category 2: Computer Vision
  {
    id: 6,
    name: "OpenCV",
    description: "Open-source library for image/video processing.",
    category: "computer-vision",
    isPremium: false,
    price: 0,
    rating: 4.9,
    icon: React.createElement(Camera, { className: "w-6 h-6" })
  },
  {
    id: 7,
    name: "TensorFlow Object Detection API",
    description: "Pre-trained models for object detection.",
    category: "computer-vision",
    isPremium: false,
    price: 0,
    rating: 4.8,
    icon: React.createElement(Eye, { className: "w-6 h-6" })
  },
  {
    id: 8,
    name: "YOLO",
    description: "Real-time object detection framework.",
    category: "computer-vision",
    isPremium: false,
    price: 0,
    rating: 4.9,
    icon: React.createElement(Eye, { className: "w-6 h-6" })
  },
  {
    id: 9,
    name: "Dlib",
    description: "Facial recognition and landmark detection.",
    category: "computer-vision",
    isPremium: false,
    price: 0,
    rating: 4.7,
    icon: React.createElement(Eye, { className: "w-6 h-6" })
  },
  {
    id: 10,
    name: "ImageAI",
    description: "Customizable image prediction and analysis.",
    category: "computer-vision",
    isPremium: false,
    price: 0,
    rating: 4.5,
    icon: React.createElement(Camera, { className: "w-6 h-6" })
  },

  // Category 3: Machine Learning Frameworks
  {
    id: 11,
    name: "Scikit-learn",
    description: "Tools for classification, regression, and clustering.",
    category: "ml-frameworks",
    isPremium: false,
    price: 0,
    rating: 4.9,
    icon: React.createElement(Brain, { className: "w-6 h-6" })
  },
  {
    id: 12,
    name: "TensorFlow",
    description: "End-to-end platform for ML model building.",
    category: "ml-frameworks",
    isPremium: false,
    price: 0,
    rating: 4.8,
    icon: React.createElement(Brain, { className: "w-6 h-6" })
  },
  {
    id: 13,
    name: "Keras",
    description: "High-level neural networks API.",
    category: "ml-frameworks",
    isPremium: false,
    price: 0,
    rating: 4.8,
    icon: React.createElement(CircuitBoard, { className: "w-6 h-6" })
  },
  {
    id: 14,
    name: "PyTorch",
    description: "Flexible deep learning framework.",
    category: "ml-frameworks",
    isPremium: false,
    price: 0,
    rating: 4.9,
    icon: React.createElement(CircuitBoard, { className: "w-6 h-6" })
  },
  {
    id: 15,
    name: "AutoML",
    description: "Automated model training for non-experts.",
    category: "ml-frameworks",
    isPremium: false,
    price: 0,
    rating: 4.7,
    icon: React.createElement(Brain, { className: "w-6 h-6" })
  },

  // Category 4: Data Analysis & Visualization
  {
    id: 16,
    name: "Pandas",
    description: "Data manipulation and analysis toolkit.",
    category: "data-analysis",
    isPremium: false,
    price: 0,
    rating: 4.9,
    icon: React.createElement(BarChart, { className: "w-6 h-6" })
  },
  {
    id: 17,
    name: "NumPy",
    description: "Numerical computing and array processing.",
    category: "data-analysis",
    isPremium: false,
    price: 0,
    rating: 4.9,
    icon: React.createElement(LineChart, { className: "w-6 h-6" })
  },
  {
    id: 18,
    name: "Matplotlib",
    description: "Static/interactive visualizations.",
    category: "data-analysis",
    isPremium: false,
    price: 0,
    rating: 4.8,
    icon: React.createElement(AreaChart, { className: "w-6 h-6" })
  },
  {
    id: 19,
    name: "Seaborn",
    description: "Statistical data visualization.",
    category: "data-analysis",
    isPremium: false,
    price: 0,
    rating: 4.7,
    icon: React.createElement(BarChart, { className: "w-6 h-6" })
  },
  {
    id: 20,
    name: "Jupyter Notebook",
    description: "Collaborative coding and data storytelling.",
    category: "data-analysis",
    isPremium: false,
    price: 0,
    rating: 4.9,
    icon: React.createElement(PanelTop, { className: "w-6 h-6" })
  },

  // Category 5: Automation & Workflow
  {
    id: 21,
    name: "Apache Airflow",
    description: "Programmatic workflow orchestration.",
    category: "automation",
    isPremium: false,
    price: 0,
    rating: 4.7,
    icon: React.createElement(Workflow, { className: "w-6 h-6" })
  },
  {
    id: 22,
    name: "Zapier (Free Tier)",
    description: "Connect apps with limited automations.",
    category: "automation",
    isPremium: false,
    price: 0,
    rating: 4.8,
    icon: React.createElement(Workflow, { className: "w-6 h-6" })
  },
  {
    id: 23,
    name: "Huginn",
    description: "Open-source automation for web tasks.",
    category: "automation",
    isPremium: false,
    price: 0,
    rating: 4.5,
    icon: React.createElement(Bot, { className: "w-6 h-6" })
  },
  {
    id: 24,
    name: "n8n",
    description: "Low-code workflow automation.",
    category: "automation",
    isPremium: false,
    price: 0,
    rating: 4.7,
    icon: React.createElement(Workflow, { className: "w-6 h-6" })
  },
  {
    id: 25,
    name: "Automagica",
    description: "Robotic process automation (RPA).",
    category: "automation",
    isPremium: false,
    price: 0,
    rating: 4.6,
    icon: React.createElement(Bot, { className: "w-6 h-6" })
  },

  // Category 6: Open-Source AI Models
  {
    id: 26,
    name: "GPT-2 (Hugging Face)",
    description: "Text generation model.",
    category: "open-source-ai",
    isPremium: false,
    price: 0,
    rating: 4.8,
    icon: React.createElement(Sparkles, { className: "w-6 h-6" })
  },
  {
    id: 27,
    name: "BERT",
    description: "Language representation model.",
    category: "open-source-ai",
    isPremium: false,
    price: 0,
    rating: 4.9,
    icon: React.createElement(MessageSquare, { className: "w-6 h-6" })
  },
  {
    id: 28,
    name: "FastText",
    description: "Text classification and word embeddings.",
    category: "open-source-ai",
    isPremium: false,
    price: 0,
    rating: 4.7,
    icon: React.createElement(Sparkles, { className: "w-6 h-6" })
  },
  {
    id: 29,
    name: "AllenNLP",
    description: "NLP research library with pre-trained models.",
    category: "open-source-ai",
    isPremium: false,
    price: 0,
    rating: 4.6,
    icon: React.createElement(BookOpen, { className: "w-6 h-6" })
  },
  {
    id: 30,
    name: "Detectron2",
    description: "Object detection and segmentation.",
    category: "open-source-ai",
    isPremium: false,
    price: 0,
    rating: 4.7,
    icon: React.createElement(Eye, { className: "w-6 h-6" })
  },

  // Category 7: Code Assistance & Development
  {
    id: 31,
    name: "GitHub Copilot (Student Tier)",
    description: "AI pair programmer for coding.",
    category: "code-assistance",
    isPremium: false,
    price: 0,
    rating: 4.9,
    icon: React.createElement(Code, { className: "w-6 h-6" })
  },
  {
    id: 32,
    name: "Tabnine",
    description: "AI-powered code completions.",
    category: "code-assistance",
    isPremium: false,
    price: 0,
    rating: 4.7,
    icon: React.createElement(Code, { className: "w-6 h-6" })
  },
  {
    id: 33,
    name: "Kite",
    description: "Code completions for Python.",
    category: "code-assistance",
    isPremium: false,
    price: 0,
    rating: 4.6,
    icon: React.createElement(Code, { className: "w-6 h-6" })
  },
  {
    id: 34,
    name: "DeepCode",
    description: "AI-based code review.",
    category: "code-assistance",
    isPremium: false,
    price: 0,
    rating: 4.5,
    icon: React.createElement(Search, { className: "w-6 h-6" })
  },
  {
    id: 35,
    name: "Codeium",
    description: "Free AI code generator.",
    category: "code-assistance",
    isPremium: false,
    price: 0,
    rating: 4.8,
    icon: React.createElement(Code, { className: "w-6 h-6" })
  },

  // Category 8: Business Intelligence
  {
    id: 36,
    name: "Metabase",
    description: "Open-source analytics and dashboards.",
    category: "business-intelligence",
    isPremium: false,
    price: 0,
    rating: 4.8,
    icon: React.createElement(Database, { className: "w-6 h-6" })
  },
  {
    id: 37,
    name: "Apache Superset",
    description: "Data exploration and visualization.",
    category: "business-intelligence",
    isPremium: false,
    price: 0,
    rating: 4.7,
    icon: React.createElement(BarChart, { className: "w-6 h-6" })
  },
  {
    id: 38,
    name: "Google Data Studio",
    description: "Free BI reporting tool.",
    category: "business-intelligence",
    isPremium: false,
    price: 0,
    rating: 4.9,
    icon: React.createElement(AreaChart, { className: "w-6 h-6" })
  },
  {
    id: 39,
    name: "Microsoft Power BI (Free Tier)",
    description: "Basic dashboards and reports.",
    category: "business-intelligence",
    isPremium: false,
    price: 0,
    rating: 4.8,
    icon: React.createElement(PanelTop, { className: "w-6 h-6" })
  },
  {
    id: 40,
    name: "Tableau Public",
    description: "Create and share visualizations.",
    category: "business-intelligence",
    isPremium: false,
    price: 0,
    rating: 4.6,
    icon: React.createElement(AreaChart, { className: "w-6 h-6" })
  },

  // Category 9: Audio & Speech Processing
  {
    id: 41,
    name: "Librosa",
    description: "Audio analysis and feature extraction.",
    category: "audio-speech",
    isPremium: false,
    price: 0,
    rating: 4.7,
    icon: React.createElement(Headphones, { className: "w-6 h-6" })
  },
  {
    id: 42,
    name: "SpeechRecognition",
    description: "Convert speech to text.",
    category: "audio-speech",
    isPremium: false,
    price: 0,
    rating: 4.8,
    icon: React.createElement(Mic, { className: "w-6 h-6" })
  },
  {
    id: 43,
    name: "Mozilla DeepSpeech",
    description: "Open-source speech-to-text engine.",
    category: "audio-speech",
    isPremium: false,
    price: 0,
    rating: 4.6,
    icon: React.createElement(Mic, { className: "w-6 h-6" })
  },
  {
    id: 44,
    name: "OpenALPR",
    description: "Automatic license plate recognition.",
    category: "audio-speech",
    isPremium: false,
    price: 0,
    rating: 4.5,
    icon: React.createElement(Camera, { className: "w-6 h-6" })
  },
  {
    id: 45,
    name: "Vosk",
    description: "Offline speech recognition toolkit.",
    category: "audio-speech",
    isPremium: false,
    price: 0,
    rating: 4.7,
    icon: React.createElement(Headphones, { className: "w-6 h-6" })
  },

  // Category 10: Collaboration & Project Management
  {
    id: 46,
    name: "Slack (Free Tier)",
    description: "Team communication and file sharing.",
    category: "collaboration",
    isPremium: false,
    price: 0,
    rating: 4.9,
    icon: React.createElement(Users, { className: "w-6 h-6" })
  },
  {
    id: 47,
    name: "Trello",
    description: "Kanban-style task management.",
    category: "collaboration",
    isPremium: false,
    price: 0,
    rating: 4.8,
    icon: React.createElement(PanelTop, { className: "w-6 h-6" })
  },
  {
    id: 48,
    name: "Asana (Free Tier)",
    description: "Basic project tracking.",
    category: "collaboration",
    isPremium: false,
    price: 0,
    rating: 4.7,
    icon: React.createElement(Users, { className: "w-6 h-6" })
  },
  {
    id: 49,
    name: "Notion (Free Tier)",
    description: "All-in-one workspace for docs and tasks.",
    category: "collaboration",
    isPremium: false,
    price: 0,
    rating: 4.9,
    icon: React.createElement(PanelTop, { className: "w-6 h-6" })
  },
  {
    id: 50,
    name: "Discord",
    description: "Community building and real-time chat.",
    category: "collaboration",
    isPremium: false,
    price: 0,
    rating: 4.8,
    icon: React.createElement(Share2, { className: "w-6 h-6" })
  }
];
