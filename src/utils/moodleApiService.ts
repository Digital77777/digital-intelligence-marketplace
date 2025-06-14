
import { AIToolTier } from '@/data/ai-tools-tiers';

// This type is designed to be compatible with the existing CourseCard component.
export interface MoodleCourse {
  id: string | number;
  title: string;
  description: string | null;
  category: string;
  difficulty: string;
  duration: number; // in minutes
  image_url?: string | null;
  required_tier?: AIToolTier;
  lesson_count?: number;
  instructor?: string;
  certification_available?: boolean;
}

const mockCourses: MoodleCourse[] = [
  // Freemium Courses
  {
    id: 'moodle-101',
    title: 'Intro to Moodle: Your First Course',
    description: 'A beginner-friendly introduction to the Moodle Learning Management System.',
    category: 'LMS',
    difficulty: 'Beginner',
    duration: 60,
    required_tier: 'freemium',
    lesson_count: 5,
    instructor: 'Moodle Academy',
    image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'moodle-102',
    title: 'Basic Content Creation in Moodle',
    description: 'Learn to create pages, quizzes, and assignments in Moodle.',
    category: 'Content Creation',
    difficulty: 'Beginner',
    duration: 90,
    required_tier: 'freemium',
    lesson_count: 7,
    instructor: 'Moodle Academy',
    image_url: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  // Basic Tier Courses
  {
    id: 'moodle-201',
    title: 'Moodle Administration Essentials',
    description: 'Manage users, courses, and site settings as a Moodle administrator.',
    category: 'Administration',
    difficulty: 'Intermediate',
    duration: 180,
    required_tier: 'basic',
    lesson_count: 12,
    instructor: 'Moodle Experts',
    image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'moodle-202',
    title: 'Advanced Quizzing in Moodle',
    description: 'Explore complex question types and quiz settings for robust assessments.',
    category: 'Assessments',
    difficulty: 'Intermediate',
    duration: 120,
    required_tier: 'basic',
    lesson_count: 8,
    instructor: 'Moodle Experts',
    image_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  // Pro Tier Courses
  {
    id: 'moodle-301',
    title: 'Moodle Plugin Development',
    description: 'Learn to develop custom plugins to extend Moodle functionality.',
    category: 'Development',
    difficulty: 'Advanced',
    duration: 300,
    required_tier: 'pro',
    lesson_count: 20,
    instructor: 'Moodle Core Team',
    image_url: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2106&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'moodle-302',
    title: 'Integrating Moodle with External Systems',
    description: 'Use Moodle Web Services and LTI to connect with other platforms.',
    category: 'Integrations',
    difficulty: 'Advanced',
    duration: 240,
    required_tier: 'pro',
    lesson_count: 15,
    instructor: 'Moodle Core Team',
    image_url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export const fetchMoodleCourses = async (): Promise<MoodleCourse[]> => {
  console.log('Fetching mock Moodle courses...');
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Mock Moodle courses fetched.');
  return mockCourses;
};
