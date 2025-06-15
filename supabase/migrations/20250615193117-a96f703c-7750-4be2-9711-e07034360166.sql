
-- Create a new enum type for stream status
CREATE TYPE stream_status AS ENUM ('pending', 'processing', 'published', 'error');

-- Function to check user tier, required for security policies.
-- This is consistent with the client-side TierContext, including the superuser override.
CREATE OR REPLACE FUNCTION get_user_tier(p_user_id UUID)
RETURNS TEXT AS $$
DECLARE
  v_tier TEXT;
  v_email TEXT;
BEGIN
  -- Check for superuser email
  SELECT email INTO v_email FROM auth.users WHERE id = p_user_id;
  IF v_email = 'bbadibanga55@gmail.com' THEN
    RETURN 'pro';
  END IF;

  -- Check for subscription tier
  SELECT subscription_tier INTO v_tier FROM public.subscribers WHERE user_id = p_user_id;
  RETURN COALESCE(v_tier, 'freemium');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the video_streams table to store metadata about uploaded videos.
-- This new table is designed to properly handle video streams, unlike the existing 'ai_streams' table.
CREATE TABLE public.video_streams (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    duration TEXT,
    views BIGINT NOT NULL DEFAULT 0,
    video_storage_path TEXT,
    thumbnail_storage_path TEXT,
    code_snippets JSONB,
    status stream_status NOT NULL DEFAULT 'pending',
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    is_flagged BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add indexes for performance
CREATE INDEX idx_video_streams_user_id ON public.video_streams(user_id);
CREATE INDEX idx_video_streams_category ON public.video_streams(category);
CREATE INDEX idx_video_streams_status ON public.video_streams(status);
CREATE INDEX idx_video_streams_created_at ON public.video_streams(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.video_streams ENABLE ROW LEVEL SECURITY;

-- RLS Policies for video_streams table
CREATE POLICY "Public can view published streams" ON public.video_streams
  FOR SELECT USING (is_public = true AND status = 'published');

CREATE POLICY "Users can view their own streams" ON public.video_streams
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Basic and Pro users can upload streams" ON public.video_streams
  FOR INSERT WITH CHECK (auth.uid() = user_id AND get_user_tier(auth.uid()) IN ('basic', 'pro'));

CREATE POLICY "Users can update their own streams" ON public.video_streams
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own streams" ON public.video_streams
  FOR DELETE USING (auth.uid() = user_id);

-- Create storage bucket for video streams
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('video-streams', 'video-streams', true, 104857600, ARRAY['video/mp4', 'video/webm', 'video/quicktime'])
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for stream thumbnails
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('stream-thumbnails', 'stream-thumbnails', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- RLS policies for video-streams bucket
CREATE POLICY "Allow public read access to videos" ON storage.objects
  FOR SELECT USING ( bucket_id = 'video-streams' );

CREATE POLICY "Allow basic/pro to upload videos" ON storage.objects
  FOR INSERT WITH CHECK ( bucket_id = 'video-streams' AND get_user_tier(auth.uid()) IN ('basic', 'pro') );

CREATE POLICY "Allow users to update their own videos" ON storage.objects
  FOR UPDATE USING ( bucket_id = 'video-streams' AND auth.uid() = owner );

CREATE POLICY "Allow users to delete their own videos" ON storage.objects
  FOR DELETE USING ( bucket_id = 'video-streams' AND auth.uid() = owner );

-- RLS policies for stream-thumbnails bucket
CREATE POLICY "Allow public read access to thumbnails" ON storage.objects
  FOR SELECT USING ( bucket_id = 'stream-thumbnails' );

CREATE POLICY "Allow basic/pro to upload thumbnails" ON storage.objects
  FOR INSERT WITH CHECK ( bucket_id = 'stream-thumbnails' AND get_user_tier(auth.uid()) IN ('basic', 'pro') );

CREATE POLICY "Allow users to update their own thumbnails" ON storage.objects
  FOR UPDATE USING ( bucket_id = 'stream-thumbnails' AND auth.uid() = owner );

CREATE POLICY "Allow users to delete their own thumbnails" ON storage.objects
  FOR DELETE USING ( bucket_id = 'stream-thumbnails' AND auth.uid() = owner );

-- Enable realtime for video_streams table
ALTER TABLE public.video_streams REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.video_streams;

