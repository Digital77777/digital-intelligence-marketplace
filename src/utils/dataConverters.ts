
import { LearningContent, UserProgress } from '@/types/learning';
import { AIStream } from '@/types/AIStreams';

/**
 * Converts database learning content rows to app LearningContent type
 */
export const convertToLearningContent = (dbCourse: any): LearningContent => {
  return {
    id: String(dbCourse.id),
    title: dbCourse.title,
    description: dbCourse.description || '',
    content: dbCourse.content,
    category: dbCourse.category,
    difficulty: dbCourse.difficulty,
    duration: dbCourse.duration,
    image_url: dbCourse.image_url,
    required_tier: dbCourse.required_tier,
    created_at: dbCourse.created_at,
    updated_at: dbCourse.updated_at
  };
};

/**
 * Converts database user progress rows to app UserProgress type
 */
export const convertToUserProgress = (dbProgress: any): UserProgress => {
  return {
    id: dbProgress.id,
    user_id: dbProgress.user_id,
    course_id: String(dbProgress.course_id),
    completion_percent: dbProgress.completion_percent || 0,
    last_accessed: dbProgress.last_accessed
  };
};

/**
 * Converts string or number to string
 */
export const ensureString = (value: string | number): string => {
  return String(value);
};

/**
 * Converts string or number to number
 */
export const ensureNumber = (value: string | number): number => {
  return typeof value === 'string' ? parseInt(value, 10) : value;
};

/**
 * Converts database AI stream rows to app AIStream type
 */
export const convertToAIStream = (dbStream: any): AIStream => {
  return {
    id: String(dbStream.id),
    user_id: dbStream.user_id,
    title: dbStream.title,
    description: dbStream.description || '',
    category: dbStream.category,
    duration: dbStream.duration,
    views: dbStream.views,
    created_at: dbStream.created_at,
    code_snippets: dbStream.code_snippets,
    image_url: dbStream.image_url,
    is_flagged: dbStream.is_flagged,
    author: dbStream.author || {
      id: dbStream.user_id || 'unknown',
      username: dbStream.username || 'unknown user',
      avatar_url: dbStream.avatar_url
    }
  };
};

/**
 * Safely converts an array of data from the database to the appropriate type
 */
export const convertArrayToType = <T>(dataArray: any[], converter: (item: any) => T): T[] => {
  if (!dataArray || !Array.isArray(dataArray)) return [];
  return dataArray.map(item => converter(item));
};

/**
 * Creates a mock AIStream for the AIStreams page when actual data isn't available
 */
export const createMockAIStream = (id: string, title: string, authorId: string): AIStream => {
  return {
    id,
    user_id: authorId,
    title,
    description: "Mock description for AI stream",
    category: "tutorial",
    duration: "30:00",
    views: 100,
    created_at: new Date().toISOString(),
    is_flagged: false,
    author: {
      id: authorId,
      username: "mock_user"
    }
  };
};
