
import { LearningPath, Certification, LiveEvent } from '@/types/learning';
import { addDays, addHours, addMinutes } from 'date-fns';

// Get current date for use in live events
const now = new Date();

export const sampleLearningPaths: LearningPath[] = [
  {
    id: '1',
    title: 'AI Development Fundamentals',
    description: 'A structured path to master the essentials of AI development with Python and key libraries.',
    courses: ['101', '102', '103', '104'],
    category: 'development',
    difficulty: 'beginner',
    required_tier: 'freemium',
    total_duration: 1080, // 18 hours in minutes
    image_url: '/images/learning/ai-fundamentals.jpg',
    badge_name: 'AI Developer Foundations',
    created_at: '2023-01-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'Computer Vision Specialist',
    description: 'Master image processing, object detection, and advanced computer vision applications.',
    courses: ['201', '202', '203'],
    category: 'computer-vision',
    difficulty: 'intermediate',
    required_tier: 'basic',
    total_duration: 1560, // 26 hours in minutes
    image_url: '/images/learning/computer-vision.jpg',
    badge_name: 'Computer Vision Pro',
    created_at: '2023-02-10T00:00:00Z'
  },
  {
    id: '3',
    title: 'NLP & Text Processing Expert',
    description: 'Become proficient in natural language processing, text analysis, and building language models.',
    courses: ['301', '302', '303', '304', '305'],
    category: 'nlp',
    difficulty: 'advanced',
    required_tier: 'basic',
    total_duration: 1920, // 32 hours in minutes
    image_url: '/images/learning/nlp-expert.jpg',
    badge_name: 'NLP Master',
    created_at: '2023-03-05T00:00:00Z'
  },
  {
    id: '4',
    title: 'Enterprise AI Architect',
    description: 'Learn to design, implement, and scale AI solutions for enterprise environments.',
    courses: ['401', '402', '403', '404'],
    category: 'enterprise',
    difficulty: 'advanced',
    required_tier: 'pro',
    total_duration: 2400, // 40 hours in minutes
    image_url: '/images/learning/enterprise-ai.jpg',
    badge_name: 'Enterprise AI Architect',
    created_at: '2023-04-20T00:00:00Z'
  },
  {
    id: '5',
    title: 'AI Ethics & Governance',
    description: 'Master the principles and practices of responsible AI development and governance.',
    courses: ['501', '502', '503'],
    category: 'ethics',
    difficulty: 'intermediate',
    required_tier: 'pro',
    total_duration: 1200, // 20 hours in minutes
    image_url: '/images/learning/ai-ethics.jpg',
    badge_name: 'AI Ethics Professional',
    created_at: '2023-05-15T00:00:00Z'
  },
  {
    id: '6',
    title: 'Data Science for Business',
    description: 'Apply data science and AI techniques to solve real-world business problems.',
    courses: ['601', '602', '603', '604'],
    category: 'business',
    difficulty: 'intermediate',
    required_tier: 'basic',
    total_duration: 1800, // 30 hours in minutes
    image_url: '/images/learning/data-science-business.jpg',
    badge_name: 'Business Intelligence Expert',
    created_at: '2023-06-10T00:00:00Z'
  }
];

export const sampleCertifications: Certification[] = [
  {
    id: '1',
    title: 'AI Explorer',
    description: 'Demonstrate your understanding of fundamental AI concepts and applications.',
    requirements: [
      'Complete AI 101 course',
      'Pass assessment with 70% or higher',
      'Submit a basic AI project'
    ],
    badge_image: '/images/badges/ai-explorer.png',
    required_tier: 'freemium',
    is_industry_recognized: false,
    created_at: '2023-01-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'Certified AI Developer',
    description: 'Validate your skills in building and deploying AI models for practical applications.',
    requirements: [
      'Complete AI Developer Track',
      'Build and deploy 2 functional AI applications',
      'Pass certification exam with 80% or higher'
    ],
    badge_image: '/images/badges/certified-ai-developer.png',
    required_tier: 'basic',
    is_industry_recognized: false,
    expiration_period: 24, // 2 years
    created_at: '2023-02-20T00:00:00Z'
  },
  {
    id: '3',
    title: 'Computer Vision Professional',
    description: 'Demonstrate expertise in computer vision algorithms, techniques, and applications.',
    requirements: [
      'Complete Computer Vision Specialist track',
      'Develop an advanced CV project',
      'Pass practical assessment'
    ],
    badge_image: '/images/badges/cv-professional.png',
    required_tier: 'basic',
    is_industry_recognized: false,
    expiration_period: 24, // 2 years
    created_at: '2023-03-10T00:00:00Z'
  },
  {
    id: '4',
    title: 'DIM Certified AI Architect',
    description: 'Industry-recognized certification for designing and implementing enterprise-scale AI solutions.',
    requirements: [
      'Complete Enterprise AI Architect track',
      'Minimum 1 year of practical AI experience',
      'Complete capstone project',
      'Pass comprehensive exam with 85% or higher'
    ],
    badge_image: '/images/badges/certified-ai-architect.png',
    required_tier: 'pro',
    is_industry_recognized: true,
    expiration_period: 24, // 2 years
    created_at: '2023-04-15T00:00:00Z'
  },
  {
    id: '5',
    title: 'AI Ethics Specialist',
    description: 'Validate your expertise in implementing ethical AI frameworks and governance.',
    requirements: [
      'Complete AI Ethics & Governance track',
      'Develop an ethics assessment for an AI system',
      'Pass scenario-based assessment'
    ],
    badge_image: '/images/badges/ai-ethics-specialist.png',
    required_tier: 'pro',
    is_industry_recognized: true,
    expiration_period: 24, // 2 years
    created_at: '2023-05-20T00:00:00Z'
  }
];

export const sampleLiveEvents: LiveEvent[] = [
  {
    id: '1',
    title: 'Introduction to AI Tools - Weekly AMA',
    description: 'Join our community experts to ask any questions about getting started with AI tools.',
    event_type: 'ama',
    datetime: addDays(now, 2).toISOString(),
    duration: 60,
    host_name: 'Sarah Johnson',
    required_tier: 'freemium',
    image_url: '/images/events/ama-session.jpg'
  },
  {
    id: '2',
    title: 'AI in Fintech: Trends and Applications',
    description: 'Explore how AI is transforming financial services and investment strategies.',
    event_type: 'webinar',
    datetime: addDays(now, 5).toISOString(),
    duration: 90,
    host_name: 'Michael Chen',
    required_tier: 'basic',
    max_participants: 200,
    registration_deadline: addDays(now, 4).toISOString(),
    image_url: '/images/events/fintech-webinar.jpg'
  },
  {
    id: '3',
    title: 'Hands-on Computer Vision Workshop',
    description: 'Build a real-time object detection system using OpenCV and modern frameworks.',
    event_type: 'workshop',
    datetime: addDays(now, 7).toISOString(),
    duration: 180,
    host_name: 'David Rodriguez',
    required_tier: 'basic',
    max_participants: 50,
    registration_deadline: addDays(now, 6).toISOString(),
    image_url: '/images/events/cv-workshop.jpg'
  },
  {
    id: '4',
    title: 'Advanced NLP with Transformers',
    description: 'Deep dive into transformer architecture and implementing BERT, GPT, and T5 models.',
    event_type: 'masterclass',
    datetime: addDays(now, 10).toISOString(),
    duration: 240,
    host_name: 'Dr. Emily Zhang',
    required_tier: 'pro',
    max_participants: 30,
    registration_deadline: addDays(now, 8).toISOString(),
    image_url: '/images/events/nlp-masterclass.jpg'
  },
  {
    id: '5',
    title: 'AI Leadership Roundtable',
    description: 'Join C-level executives to discuss AI strategy, implementation challenges, and future trends.',
    event_type: 'summit',
    datetime: addDays(now, 15).toISOString(),
    duration: 180,
    host_name: 'James Wilson',
    required_tier: 'pro',
    max_participants: 20,
    registration_deadline: addDays(now, 12).toISOString(),
    image_url: '/images/events/leadership-summit.jpg'
  },
  // Past event example
  {
    id: '6',
    title: 'Getting Started with Python for AI',
    description: 'Learn Python basics geared toward AI and data science applications.',
    event_type: 'webinar',
    datetime: addHours(addMinutes(now, -90), -2).toISOString(), // 2 hours and 90 minutes ago
    duration: 90,
    host_name: 'Alex Thompson',
    required_tier: 'freemium',
    image_url: '/images/events/python-webinar.jpg'
  }
];
