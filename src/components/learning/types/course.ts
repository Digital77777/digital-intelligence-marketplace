
export interface CuratedCourse {
  id: string;
  title: string;
  instructor: string;
  institution?: string;
  channelName: string;
  channelUrl: string;
  videoUrl: string;
  playlistUrl?: string;
  embedId: string;
  description: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  category: string;
  tags: string[];
  duration: string;
  thumbnail: string;
  requiredTier: 'freemium' | 'basic' | 'pro';
}
