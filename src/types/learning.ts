
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
