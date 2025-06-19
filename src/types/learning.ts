import { Database } from '@/integrations/supabase/types';

type Tables = Database['public']['Tables'];

export type Course = Tables['learning_courses']['Row'] & {
  modules?: { title: string; content: string; }[];
};
export type LearningPathRow = Tables['learning_paths']['Row'];
export type LearningPath = Omit<LearningPathRow, 'courses'> & {
  courses: Course[];
};
export type Certification = Tables['certifications']['Row'];
export type LiveEvent = Tables['live_events']['Row'];
export type LearningProgress = Tables['learning_progress']['Row'];

export interface UserAchievement {
  id: string;
  user_id: string;
  badge_name: string;
  badge_description?: string;
  earned_at: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  description?: string;
  category: string;
  creator_id: string;
  is_public: boolean;
  created_at: string;
}

export interface CourseCategory {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface UserXP {
  user_id: string;
  total_xp: number;
  current_level: string;
  last_updated: string;
}

export interface ForumMember {
  id: string;
  user_id: string;
  forum_id: string;
  role: 'member' | 'moderator' | 'admin';
  joined_at: string;
}

export interface PrivateDiscussion {
  id: string;
  group_id: string;
  title: string;
  content: string;
  user_id: string;
  is_pinned: boolean;
  is_locked: boolean;
  created_at: string;
  updated_at: string;
}

export interface ForumGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  tier_required: 'freemium' | 'basic' | 'pro';
  is_private: boolean;
  created_at: string;
  member_count: number;
  created_by: string;
}

export interface ForumEvent {
  id: string;
  title: string;
  description: string;
  event_type: 'ama' | 'webinar' | 'workshop' | 'networking';
  tier_required: 'basic' | 'pro';
  max_participants: number;
  event_date: string;
  duration: number; // in minutes
  host_name: string;
  host_id: string;
}
