
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { subDays } from 'date-fns';

export interface PerformanceMetric {
  id: string;
  user_id: string;
  metric_name: string;
  value: number;
  change_value: number | null;
  change_period: string | null;
  updated_at: string;
}

export interface MetricSnapshot {
  id: string;
  user_id: string;
  snapshot_date: string;
  total_revenue: number | null;
  active_users: number | null;
  conversion_rate: number | null;
  customer_satisfaction: number | null;
  created_at: string;
}

const fetchPerformanceMetrics = async (): Promise<PerformanceMetric[]> => {
  const { data, error } = await supabase
    .from('performance_metrics')
    .select('*');
  
  if (error) throw error;
  return data || [];
};

export const usePerformanceMetrics = () => {
  return useQuery<PerformanceMetric[], Error>({
    queryKey: ['performance_metrics'],
    queryFn: fetchPerformanceMetrics,
  });
};

const fetchMetricSnapshots = async (period: '7d' | '30d' | '90d'): Promise<MetricSnapshot[]> => {
    const daysBack = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const startDate = subDays(new Date(), daysBack);

    const { data, error } = await supabase
        .from('metric_snapshots')
        .select('*')
        .gte('snapshot_date', startDate.toISOString().split('T')[0])
        .order('snapshot_date', { ascending: true });

    if (error) throw error;
    return data || [];
};

export const useMetricSnapshots = (period: '7d' | '30d' | '90d') => {
    return useQuery<MetricSnapshot[], Error>({
        queryKey: ['metric_snapshots', period],
        queryFn: () => fetchMetricSnapshots(period),
        enabled: !!period,
    });
};
