
-- Create learning_courses table
CREATE TABLE public.learning_courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  image_url TEXT,
  required_tier TEXT NOT NULL DEFAULT 'freemium',
  instructor TEXT,
  prerequisites TEXT[],
  tags TEXT[],
  is_featured BOOLEAN DEFAULT FALSE,
  certification_available BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.learning_courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Publicly readable" ON public.learning_courses FOR SELECT USING (true);

-- Create learning_paths table
CREATE TABLE public.learning_paths (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  courses UUID[] NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  required_tier TEXT NOT NULL,
  total_duration INTEGER NOT NULL, -- in minutes
  image_url TEXT,
  badge_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Publicly readable" ON public.learning_paths FOR SELECT USING (true);

-- Create certifications table
CREATE TABLE public.certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL,
  badge_image TEXT NOT NULL,
  required_tier TEXT NOT NULL,
  is_industry_recognized BOOLEAN NOT NULL,
  expiration_period INTEGER, -- in months
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Publicly readable" ON public.certifications FOR SELECT USING (true);

-- Create live_events table
CREATE TABLE public.live_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_type TEXT NOT NULL,
  datetime TIMESTAMPTZ NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  host_name TEXT NOT NULL,
  required_tier TEXT NOT NULL,
  max_participants INTEGER,
  registration_deadline TIMESTAMPTZ,
  image_url TEXT
);
ALTER TABLE public.live_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Publicly readable" ON public.live_events FOR SELECT USING (true);

-- Create learning_progress table for tracking user progress
CREATE TABLE public.learning_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.learning_courses(id) ON DELETE CASCADE,
  completion_percent INTEGER NOT NULL DEFAULT 0,
  last_accessed TIMESTAMPTZ,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own progress" ON public.learning_progress FOR ALL USING (auth.uid() = user_id);

-- Create learning_feedback table for course reviews
CREATE TABLE public.learning_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.learning_courses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.learning_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own feedback" ON public.learning_feedback FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Feedback is public" ON public.learning_feedback FOR SELECT USING (true);

-- Insert sample data into learning_courses
INSERT INTO public.learning_courses (id, title, description, category, difficulty, duration, required_tier, image_url, instructor, is_featured) VALUES
('a15a819e-a9b3-4e6f-b472-368a41a427e4', 'Introduction to AI', 'Learn the basics of artificial intelligence and its applications in today''s world.', 'AI Fundamentals', 'beginner', 60, 'freemium', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop', 'Dr. Ada Lovelace', true),
('b15a819e-a9b3-4e6f-b472-368a41a427e5', 'Machine Learning Fundamentals', 'Understand core machine learning concepts, algorithms, and implementation strategies.', 'Machine Learning', 'intermediate', 120, 'basic', 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop', 'Prof. Alan Turing', true),
('c15a819e-a9b3-4e6f-b472-368a41a427e6', 'Advanced AI Solutions', 'Learn to build and deploy advanced AI systems for complex real-world problems.', 'Advanced AI', 'advanced', 180, 'pro', 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1470&auto=format&fit=crop', 'Dr. Geoffrey Hinton', true),
('d15a819e-a9b3-4e6f-b472-368a41a427e7', 'Prompt Engineering Masterclass', 'Master the art and science of crafting effective prompts for AI models to get optimal results.', 'AI Applications', 'intermediate', 90, 'basic', 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop', 'Sarah Chen', false);

-- Insert sample data into learning_paths
INSERT INTO public.learning_paths (title, description, courses, category, difficulty, required_tier, total_duration, image_url) VALUES
('AI Foundations Path', 'A structured path from beginner to advanced AI concepts.', '{"a15a819e-a9b3-4e6f-b472-368a41a427e4", "b15a819e-a9b3-4e6f-b472-368a41a427e5"}', 'AI Fundamentals', 'intermediate', 'basic', 180, 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1995&auto=format&fit=crop');

-- Insert sample data into certifications
INSERT INTO public.certifications (title, description, requirements, badge_image, required_tier, is_industry_recognized) VALUES
('Certified AI Professional', 'Demonstrate your expertise in advanced AI solutions.', '{"Complete Advanced AI Solutions course", "Pass the final exam"}', '/cert-badge.png', 'pro', true);

-- Insert sample data into live_events
INSERT INTO public.live_events (title, description, event_type, datetime, duration, host_name, required_tier, image_url) VALUES
('Live Q&A with AI Experts', 'Join a live session with leading AI researchers.', 'ama', (now() + interval '10 day'), 60, 'Dr. Eva Core', 'pro', 'https://images.unsplash.com/photo-1587825140708-df876c12b44e?q=80&w=2070&auto=format&fit=crop');
