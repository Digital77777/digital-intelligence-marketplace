
-- Phase 1 (Corrected): Database Schema Migration for User-Specific Business Insights

-- Clear existing sample data from all relevant tables to apply schema changes.
-- This now includes 'business_insights' to prevent the previous error.
TRUNCATE TABLE public.performance_metrics, public.metric_snapshots, public.business_insights RESTART IDENTITY;

-- Step 1: Modify 'performance_metrics' table
-- Add user_id column
ALTER TABLE public.performance_metrics ADD COLUMN user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE;

-- Remove old unique constraint and add a new one for user-specific metrics
ALTER TABLE public.performance_metrics DROP CONSTRAINT IF EXISTS performance_metrics_metric_name_key;
ALTER TABLE public.performance_metrics ADD CONSTRAINT performance_metrics_user_id_metric_name_key UNIQUE (user_id, metric_name);

-- Add an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_performance_metrics_user_id ON public.performance_metrics(user_id);

-- Enable RLS and set policies
ALTER TABLE public.performance_metrics ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage their own performance metrics" ON public.performance_metrics;
CREATE POLICY "Users can manage their own performance metrics"
ON public.performance_metrics
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Step 2: Modify 'metric_snapshots' table
-- Add user_id column
ALTER TABLE public.metric_snapshots ADD COLUMN user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE;

-- Remove old unique constraint and add a new one for user-specific snapshots
ALTER TABLE public.metric_snapshots DROP CONSTRAINT IF EXISTS metric_snapshots_snapshot_date_key;
ALTER TABLE public.metric_snapshots ADD CONSTRAINT metric_snapshots_user_id_snapshot_date_key UNIQUE (user_id, snapshot_date);

-- Add an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_metric_snapshots_user_id ON public.metric_snapshots(user_id);

-- Enable RLS and set policies
ALTER TABLE public.metric_snapshots ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage their own metric snapshots" ON public.metric_snapshots;
CREATE POLICY "Users can manage their own metric snapshots"
ON public.metric_snapshots
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Step 3: Modify 'business_insights' table
-- Add user_id column
ALTER TABLE public.business_insights ADD COLUMN user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_business_insights_user_id ON public.business_insights(user_id);

-- Enable RLS and set policies
ALTER TABLE public.business_insights ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own business insights" ON public.business_insights;
CREATE POLICY "Users can view their own business insights"
ON public.business_insights
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service roles have full access to business insights" ON public.business_insights;
CREATE POLICY "Service roles have full access to business insights"
ON public.business_insights
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');
