
-- Table to store key performance metrics for the dashboard header
CREATE TABLE public.performance_metrics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL UNIQUE,
  value NUMERIC NOT NULL,
  change_value NUMERIC,
  change_period TEXT,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Table to store daily snapshots of key metrics for trend analysis
CREATE TABLE public.metric_snapshots (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  snapshot_date DATE NOT NULL UNIQUE,
  total_revenue NUMERIC,
  active_users INT,
  conversion_rate NUMERIC,
  customer_satisfaction NUMERIC,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metric_snapshots ENABLE ROW LEVEL SECURITY;

-- Allow public read access to these tables for the dashboard
CREATE POLICY "Allow public read access on performance_metrics" ON public.performance_metrics FOR SELECT USING (true);
CREATE POLICY "Allow public read access on metric_snapshots" ON public.metric_snapshots FOR SELECT USING (true);

-- Allow service roles (like from Edge Functions) to write data
CREATE POLICY "Allow full access for service roles on performance_metrics" ON public.performance_metrics FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Allow full access for service roles on metric_snapshots" ON public.metric_snapshots FOR ALL USING (auth.role() = 'service_role');
