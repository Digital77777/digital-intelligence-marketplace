
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { TeamDashboardData } from '../types';
import { toast } from 'sonner';

const fetchTeamDashboardData = async (): Promise<TeamDashboardData> => {
  const { data, error } = await supabase.functions.invoke<TeamDashboardData>('team-dashboard-data', {
    method: 'GET',
  });

  if (error) {
    throw new Error(`Failed to fetch team dashboard data: ${error.message}`);
  }
  return data;
};

export const useTeamDashboard = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['team-dashboard', user?.id],
    queryFn: fetchTeamDashboardData,
    enabled: !!user,
    retry: (failureCount, error) => {
      if (error.message.includes('Authentication required')) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: ['team-dashboard', user?.id] });
  };

  return {
    data: data || { tasks: [], teams: [] },
    isLoading,
    isError,
    error,
    refetch,
    invalidateQueries
  };
};
