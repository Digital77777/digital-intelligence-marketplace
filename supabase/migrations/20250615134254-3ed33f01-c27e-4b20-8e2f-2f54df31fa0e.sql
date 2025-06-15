
-- Clear existing sample data to ensure a clean slate
TRUNCATE TABLE public.performance_metrics, public.metric_snapshots RESTART IDENTITY;

-- Insert sample summary metrics for the header cards
INSERT INTO public.performance_metrics (metric_name, value, change_value, change_period) VALUES
('Total Revenue', 58340, 12.5, '30d'),
('Active Users', 1250, -2.1, '30d'),
('Conversion Rate', 4.8, 0.5, '30d'),
('Customer Satisfaction', 92, 1.2, '30d');

-- Insert sample daily metric snapshots for the last 90 days for the charts
INSERT INTO public.metric_snapshots (snapshot_date, total_revenue, active_users, conversion_rate, customer_satisfaction)
SELECT
  gs.snapshot_date,
  floor(random() * (1500 - 1000 + 1) + 1000), -- Random revenue between 1000 and 1500
  floor(random() * (500 - 400 + 1) + 400),   -- Random active users between 400 and 500
  round((random() * 2 + 3)::numeric, 1),      -- Random conversion rate between 3.0 and 5.0
  floor(random() * (95 - 85 + 1) + 85)        -- Random satisfaction between 85 and 95
FROM generate_series(
  (CURRENT_DATE - interval '90 days')::date,
  CURRENT_DATE,
  '1 day'::interval
) AS gs(snapshot_date);
