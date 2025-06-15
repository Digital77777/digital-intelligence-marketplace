
-- Create enum types for file and discussion management
CREATE TYPE file_type AS ENUM ('document', 'image', 'video', 'archive', 'other');
CREATE TYPE discussion_type AS ENUM ('general', 'announcement', 'question', 'feedback');

-- Create files table for shared file management
CREATE TABLE public.files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_type file_type NOT NULL DEFAULT 'other',
  mime_type TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  storage_path TEXT NOT NULL,
  thumbnail_path TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  is_public BOOLEAN NOT NULL DEFAULT false,
  download_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create discussions table for team communications
CREATE TABLE public.discussions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  content TEXT NOT NULL,
  discussion_type discussion_type NOT NULL DEFAULT 'general',
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.discussions(id) ON DELETE CASCADE,
  mentions JSONB DEFAULT '[]'::jsonb,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  reply_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create file_attachments table to link discussions with files
CREATE TABLE public.file_attachments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  discussion_id UUID REFERENCES public.discussions(id) ON DELETE CASCADE NOT NULL,
  file_id UUID REFERENCES public.files(id) ON DELETE CASCADE NOT NULL,
  attached_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(discussion_id, file_id)
);

-- Create team_activity table for activity tracking
CREATE TABLE public.team_activity (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity_type TEXT NOT NULL,
  activity_data JSONB DEFAULT '{}'::jsonb,
  entity_id UUID,
  entity_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add indexes for performance
CREATE INDEX idx_files_team_id ON public.files(team_id);
CREATE INDEX idx_files_uploaded_by ON public.files(uploaded_by);
CREATE INDEX idx_files_created_at ON public.files(created_at DESC);
CREATE INDEX idx_discussions_team_id ON public.discussions(team_id);
CREATE INDEX idx_discussions_author_id ON public.discussions(author_id);
CREATE INDEX idx_discussions_parent_id ON public.discussions(parent_id);
CREATE INDEX idx_discussions_created_at ON public.discussions(created_at DESC);
CREATE INDEX idx_file_attachments_discussion_id ON public.file_attachments(discussion_id);
CREATE INDEX idx_file_attachments_file_id ON public.file_attachments(file_id);
CREATE INDEX idx_team_activity_team_id ON public.team_activity(team_id);
CREATE INDEX idx_team_activity_created_at ON public.team_activity(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.file_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_activity ENABLE ROW LEVEL SECURITY;

-- RLS Policies for files table
CREATE POLICY "Users can view files from their teams" ON public.files
  FOR SELECT USING (
    team_id IN (SELECT team_id FROM public.team_memberships WHERE user_id = auth.uid())
    OR uploaded_by = auth.uid()
    OR is_public = true
  );

CREATE POLICY "Users can upload files to their teams" ON public.files
  FOR INSERT WITH CHECK (
    team_id IN (SELECT team_id FROM public.team_memberships WHERE user_id = auth.uid())
    AND uploaded_by = auth.uid()
  );

CREATE POLICY "Users can update their own files" ON public.files
  FOR UPDATE USING (uploaded_by = auth.uid());

CREATE POLICY "Users can delete their own files" ON public.files
  FOR DELETE USING (uploaded_by = auth.uid());

-- RLS Policies for discussions table
CREATE POLICY "Users can view discussions from their teams" ON public.discussions
  FOR SELECT USING (
    team_id IN (SELECT team_id FROM public.team_memberships WHERE user_id = auth.uid())
    OR author_id = auth.uid()
  );

CREATE POLICY "Users can create discussions in their teams" ON public.discussions
  FOR INSERT WITH CHECK (
    team_id IN (SELECT team_id FROM public.team_memberships WHERE user_id = auth.uid())
    AND author_id = auth.uid()
  );

CREATE POLICY "Users can update their own discussions" ON public.discussions
  FOR UPDATE USING (author_id = auth.uid());

CREATE POLICY "Users can delete their own discussions" ON public.discussions
  FOR DELETE USING (author_id = auth.uid());

-- RLS Policies for file_attachments table
CREATE POLICY "Users can view file attachments from accessible discussions" ON public.file_attachments
  FOR SELECT USING (
    discussion_id IN (
      SELECT id FROM public.discussions 
      WHERE team_id IN (SELECT team_id FROM public.team_memberships WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can create file attachments for accessible discussions" ON public.file_attachments
  FOR INSERT WITH CHECK (
    discussion_id IN (
      SELECT id FROM public.discussions 
      WHERE team_id IN (SELECT team_id FROM public.team_memberships WHERE user_id = auth.uid())
    )
  );

-- RLS Policies for team_activity table
CREATE POLICY "Users can view activity from their teams" ON public.team_activity
  FOR SELECT USING (
    team_id IN (SELECT team_id FROM public.team_memberships WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can create activity for their teams" ON public.team_activity
  FOR INSERT WITH CHECK (
    team_id IN (SELECT team_id FROM public.team_memberships WHERE user_id = auth.uid())
    AND user_id = auth.uid()
  );

-- Create storage bucket for collaboration files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'collaboration-files',
  'collaboration-files',
  false,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/csv', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/zip', 'application/x-rar-compressed', 'text/plain']
);

-- Storage policies for collaboration files
CREATE POLICY "Team members can upload files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'collaboration-files' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Team members can view files" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'collaboration-files'
  );

CREATE POLICY "Users can update their own files" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'collaboration-files' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'collaboration-files' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Enable realtime for live updates
ALTER TABLE public.files REPLICA IDENTITY FULL;
ALTER TABLE public.discussions REPLICA IDENTITY FULL;
ALTER TABLE public.file_attachments REPLICA IDENTITY FULL;
ALTER TABLE public.team_activity REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.files;
ALTER PUBLICATION supabase_realtime ADD TABLE public.discussions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.file_attachments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.team_activity;

-- Add function to update discussion reply count
CREATE OR REPLACE FUNCTION update_discussion_reply_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.parent_id IS NOT NULL THEN
    UPDATE public.discussions 
    SET reply_count = reply_count + 1,
        updated_at = now()
    WHERE id = NEW.parent_id;
  ELSIF TG_OP = 'DELETE' AND OLD.parent_id IS NOT NULL THEN
    UPDATE public.discussions 
    SET reply_count = reply_count - 1,
        updated_at = now()
    WHERE id = OLD.parent_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger for discussion reply count
CREATE TRIGGER trigger_update_discussion_reply_count
  AFTER INSERT OR DELETE ON public.discussions
  FOR EACH ROW EXECUTE FUNCTION update_discussion_reply_count();

-- Add function to track team activity
CREATE OR REPLACE FUNCTION log_team_activity()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.team_activity (team_id, user_id, activity_type, entity_id, entity_type, activity_data)
    VALUES (
      NEW.team_id,
      NEW.uploaded_by,
      CASE 
        WHEN TG_TABLE_NAME = 'files' THEN 'file_uploaded'
        WHEN TG_TABLE_NAME = 'discussions' THEN 'discussion_created'
        WHEN TG_TABLE_NAME = 'tasks' THEN 'task_created'
        ELSE 'unknown'
      END,
      NEW.id,
      TG_TABLE_NAME,
      jsonb_build_object(
        'name', COALESCE(NEW.name, NEW.title),
        'action', 'created'
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for activity logging
CREATE TRIGGER trigger_log_file_activity
  AFTER INSERT ON public.files
  FOR EACH ROW EXECUTE FUNCTION log_team_activity();

CREATE TRIGGER trigger_log_discussion_activity
  AFTER INSERT ON public.discussions
  FOR EACH ROW EXECUTE FUNCTION log_team_activity();

CREATE TRIGGER trigger_log_task_activity
  AFTER INSERT ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION log_team_activity();
