
export interface Course {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  required_tier?: string;
}

export const Course: Course[] = [
  {
    id: 'sustainable-farming',
    title: 'Sustainable Farming Practices',
    description: 'Learn modern sustainable farming techniques and crop rotation methods',
    tags: ['farming', 'sustainability', 'agriculture'],
    required_tier: 'freemium'
  },
  {
    id: 'precision-agriculture',
    title: 'Precision Agriculture with AI',
    description: 'Master the use of AI and satellite data for precision farming',
    tags: ['ai', 'farming', 'precision', 'technology'],
    required_tier: 'basic'
  },
  {
    id: 'data-analytics-101',
    title: 'Data Analytics Fundamentals',
    description: 'Introduction to data analysis and visualization techniques',
    tags: ['data', 'analytics', 'fundamentals'],
    required_tier: 'freemium'
  },
  {
    id: 'machine-learning-intro',
    title: 'Introduction to Machine Learning',
    description: 'Get started with machine learning concepts and applications',
    tags: ['machine learning', 'ai', 'fundamentals'],
    required_tier: 'basic'
  },
  {
    id: 'computer-vision-basics',
    title: 'Computer Vision Fundamentals',
    description: 'Learn the basics of computer vision and image processing',
    tags: ['computer vision', 'image', 'ai'],
    required_tier: 'pro'
  }
];
