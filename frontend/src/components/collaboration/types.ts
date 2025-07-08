
export interface Discussion {
  id: string;
  title?: string;
  content: string;
  discussion_type: 'general' | 'announcement' | 'question' | 'feedback';
  author_id: string;
  team_id?: string;
  parent_id?: string;
  mentions: string[];
  is_pinned: boolean;
  reply_count: number;
  created_at: string;
  updated_at: string;
  user_profiles?: {
    username: string;
    full_name?: string;
    avatar_url?: string;
  };
  file_attachments?: Array<{
    files: {
      id: string;
      name: string;
      original_name: string;
      file_type: string;
      size_bytes: number;
    };
  }>;
}

export interface CollaborationFile {
  id: string;
  name: string;
  original_name: string;
  file_type: 'document' | 'image' | 'video' | 'archive' | 'other';
  mime_type: string;
  size_bytes: number;
  storage_path: string;
  thumbnail_path?: string;
  uploaded_by: string;
  team_id?: string;
  is_public: boolean;
  download_count: number;
  created_at: string;
  updated_at: string;
  user_profiles?: {
    username: string;
    full_name?: string;
  };
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: string;
  joined_at: string;
  user_profiles?: {
    id: string;
    username: string;
    full_name?: string;
    avatar_url?: string;
  };
}

export interface CollaborationTask {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority?: string;
  team_id?: string;
  assigned_to?: string;
  created_by?: string;
  due_date?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  assignee_profile?: {
    username: string;
    full_name?: string;
  };
}

export interface TeamActivity {
  id: string;
  team_id: string;
  user_id: string;
  activity_type: string;
  activity_data: Record<string, any>;
  entity_id?: string;
  entity_type?: string;
  created_at: string;
  user_profiles?: {
    username: string;
    full_name?: string;
    avatar_url?: string;
  };
}

export interface CollaborationHubData {
  discussions: Discussion[];
  files: CollaborationFile[];
  teamMembers: TeamMember[];
  tasks: CollaborationTask[];
  activities: TeamActivity[];
  teams: Array<{ id: string; name: string; description?: string }>;
}
