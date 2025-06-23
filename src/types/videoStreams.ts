
import { Database } from "@/integrations/supabase/types";

// This represents a single row from our new video_streams table
export type VideoStream = Database['public']['Tables']['video_streams']['Row'] & {
  url: string;
  thumbnail_url: string;
  likes: number;
  // We'll join user_profiles data to get author details
  author: {
    id: string;
    username: string;
    avatar_url?: string | null;
  } | null;
};

// This type can be used for features like liking or sharing streams later.
export interface StreamInteraction {
  user_id: string;
  stream_id: string;
  liked: boolean;
  shared: boolean;
  forked_code: boolean;
}
