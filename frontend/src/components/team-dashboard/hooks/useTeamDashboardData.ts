
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { Task, Team } from '../types';

export const useTeamDashboardData = () => {
  const { user } = useUser();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['teamDashboard', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      // Fetch user's teams
      const { data: teams, error: teamsError } = await supabase
        .from('teams')
        .select(`
          *,
          team_memberships!inner(user_id, role)
        `)
        .eq('team_memberships.user_id', user.id);

      if (teamsError) throw teamsError;

      // Fetch tasks for user's teams
      const teamIds = teams?.map(team => team.id) || [];
      let tasks: Task[] = [];

      if (teamIds.length > 0) {
        const { data: tasksData, error: tasksError } = await supabase
          .from('tasks')
          .select('*')
          .in('team_id', teamIds)
          .order('created_at', { ascending: false });

        if (tasksError) throw tasksError;
        tasks = tasksData || [];
      }

      return {
        teams: teams as Team[],
        tasks: tasks
      };
    },
    enabled: !!user,
  });

  const invalidateQueries = () => {
    refetch();
  };

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
    invalidateQueries
  };
};
