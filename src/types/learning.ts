export interface LearningContent {
  id: string;
  title: string;
  description?: string;
  content: string;
  category: string;
  difficulty: string;
  duration: number;
  image_url?: string;
  required_tier: string;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  course_id: string;
  completion_percent: number;
  last_accessed: string;
}

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

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: string[];
  category: string;
  difficulty: string;
  required_tier: string;
  total_duration: number;
  image_url?: string;
  badge_name?: string;
  created_at: string;
}

export interface Certification {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  badge_image: string;
  required_tier: string;
  is_industry_recognized: boolean;
  expiration_period?: number; // in months
  created_at: string;
}

export interface LiveEvent {
  id: string;
  title: string;
  description: string;
  event_type: 'webinar' | 'workshop' | 'masterclass' | 'ama' | 'summit';
  datetime: string;
  duration: number; // in minutes
  host_name: string;
  required_tier: string;
  max_participants?: number;
  registration_deadline?: string;
  image_url?: string;
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
