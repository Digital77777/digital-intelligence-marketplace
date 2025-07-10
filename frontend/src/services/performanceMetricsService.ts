import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';

// A mock function to simulate checking performance metrics.
// In a real application, this would involve more complex checks.
export const checkPerformanceMetrics = async (): Promise<{ success: boolean; message: string }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      // Simulate a 50% chance of success
      if (Math.random() > 0.5) {
        resolve({ success: true, message: 'Performance metrics are within acceptable limits.' });
      } else {
        resolve({ success: false, message: 'Performance metrics are below threshold.' });
      }
    }, 1000);
  });
};

export const usePerformanceMetrics = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: ['performanceMetrics', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('performance_metrics')
        .select('*')
        .eq('user_id', user?.id);
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!user,
  });
};

export const useMetricSnapshots = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: ['metricSnapshots', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('metric_snapshots')
        .select('*')
        .eq('user_id', user?.id);
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!user,
  });
};
