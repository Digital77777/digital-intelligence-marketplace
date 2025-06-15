
-- Create comprehensive AI Studio database schema

-- Create enum types for model lifecycle
CREATE TYPE model_status AS ENUM ('draft', 'training', 'trained', 'deployed', 'failed', 'archived');
CREATE TYPE training_status AS ENUM ('pending', 'running', 'completed', 'failed', 'cancelled');
CREATE TYPE deployment_status AS ENUM ('deploying', 'deployed', 'failed', 'stopped');
CREATE TYPE dataset_type AS ENUM ('text_classification', 'image_classification', 'regression', 'object_detection', 'nlp');

-- AI Models table for comprehensive model metadata
CREATE TABLE public.ai_models (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  model_type dataset_type NOT NULL,
  version TEXT NOT NULL DEFAULT '1.0.0',
  status model_status NOT NULL DEFAULT 'draft',
  template_id TEXT,
  hyperparameters JSONB DEFAULT '{}',
  metrics JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  trained_at TIMESTAMP WITH TIME ZONE,
  artifact_url TEXT,
  config JSONB DEFAULT '{}'
);

-- Datasets table for managing training data
CREATE TABLE public.datasets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  dataset_type dataset_type NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT,
  file_format TEXT,
  metadata JSONB DEFAULT '{}',
  validation_results JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Training Jobs table for tracking training progress
CREATE TABLE public.training_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  model_id UUID REFERENCES public.ai_models(id) ON DELETE CASCADE NOT NULL,
  dataset_id UUID REFERENCES public.datasets(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status training_status NOT NULL DEFAULT 'pending',
  progress_percentage INTEGER DEFAULT 0,
  current_epoch INTEGER DEFAULT 0,
  total_epochs INTEGER DEFAULT 10,
  logs JSONB DEFAULT '[]',
  metrics JSONB DEFAULT '{}',
  error_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Deployments table for managing deployed models
CREATE TABLE public.deployments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  model_id UUID REFERENCES public.ai_models(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status deployment_status NOT NULL DEFAULT 'deploying',
  endpoint_url TEXT,
  api_key TEXT,
  resource_config JSONB DEFAULT '{}',
  health_status JSONB DEFAULT '{}',
  usage_stats JSONB DEFAULT '{}',
  deployed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Model Metrics table for storing performance data
CREATE TABLE public.model_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  model_id UUID REFERENCES public.ai_models(id) ON DELETE CASCADE NOT NULL,
  training_job_id UUID REFERENCES public.training_jobs(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  epoch INTEGER,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'
);

-- Model Templates table for predefined configurations
CREATE TABLE public.model_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  model_type dataset_type NOT NULL,
  default_config JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default model templates
INSERT INTO public.model_templates (name, description, model_type, default_config) VALUES
('Text Classification Basic', 'Basic text classification with BERT', 'text_classification', '{"architecture": "bert-base", "epochs": 10, "learning_rate": 0.001, "batch_size": 32}'),
('Image Classification CNN', 'Convolutional Neural Network for image classification', 'image_classification', '{"architecture": "resnet50", "epochs": 20, "learning_rate": 0.0001, "batch_size": 16}'),
('Object Detection YOLO', 'YOLO-based object detection model', 'object_detection', '{"architecture": "yolov8", "epochs": 50, "learning_rate": 0.001, "batch_size": 8}'),
('Regression Model', 'Linear regression for numerical prediction', 'regression', '{"architecture": "linear", "epochs": 100, "learning_rate": 0.01, "batch_size": 64}');

-- Enable Row Level Security
ALTER TABLE public.ai_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ai_models
CREATE POLICY "Users can view their own models" ON public.ai_models FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own models" ON public.ai_models FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own models" ON public.ai_models FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own models" ON public.ai_models FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for datasets
CREATE POLICY "Users can view their own datasets" ON public.datasets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own datasets" ON public.datasets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own datasets" ON public.datasets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own datasets" ON public.datasets FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for training_jobs
CREATE POLICY "Users can view their own training jobs" ON public.training_jobs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own training jobs" ON public.training_jobs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own training jobs" ON public.training_jobs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own training jobs" ON public.training_jobs FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for deployments
CREATE POLICY "Users can view their own deployments" ON public.deployments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own deployments" ON public.deployments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own deployments" ON public.deployments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own deployments" ON public.deployments FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for model_metrics
CREATE POLICY "Users can view metrics for their own models" ON public.model_metrics FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.ai_models WHERE id = model_metrics.model_id AND user_id = auth.uid()));
CREATE POLICY "Users can create metrics for their own models" ON public.model_metrics FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM public.ai_models WHERE id = model_metrics.model_id AND user_id = auth.uid()));

-- Create indexes for performance
CREATE INDEX idx_ai_models_user_id ON public.ai_models(user_id);
CREATE INDEX idx_ai_models_status ON public.ai_models(status);
CREATE INDEX idx_training_jobs_model_id ON public.training_jobs(model_id);
CREATE INDEX idx_training_jobs_status ON public.training_jobs(status);
CREATE INDEX idx_deployments_model_id ON public.deployments(model_id);
CREATE INDEX idx_model_metrics_model_id ON public.model_metrics(model_id);

-- Enable realtime for live updates
ALTER TABLE public.training_jobs REPLICA IDENTITY FULL;
ALTER TABLE public.deployments REPLICA IDENTITY FULL;
ALTER TABLE public.model_metrics REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.training_jobs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.deployments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.model_metrics;
