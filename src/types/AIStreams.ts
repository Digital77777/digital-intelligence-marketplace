
export interface AIStream {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: 'tutorial' | 'research' | 'demo' | 'live';
  duration?: string;
  views: number;
  created_at: string;
  code_snippets?: any;
  image_url?: string;
  is_flagged: boolean;
  author?: {
    id: string;
    username: string;
    avatar_url?: string;
  };
}

export interface StreamInteraction {
  user_id: string;
  stream_id: string;
  liked: boolean;
  shared: boolean;
  forked_code: boolean;
}
