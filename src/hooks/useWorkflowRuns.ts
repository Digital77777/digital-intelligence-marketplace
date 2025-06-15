
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export const useWorkflowRuns = () => {
  const queryClient = useQueryClient();

  const fetchWorkflowRuns = async () => {
    const { data, error } = await supabase.rpc('get_workflow_runs_with_details');

    if (error) {
      console.error('Error fetching workflow runs:', error);
      throw new Error(error.message);
    }
    return data;
  };

  useEffect(() => {
    const channel = supabase
      .channel('workflow-execution-logs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workflow_execution_logs',
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['workflowRuns'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ['workflowRuns'],
    queryFn: fetchWorkflowRuns,
    // Setting staleTime to 1 minute to avoid refetching too often on window focus
    staleTime: 60 * 1000, 
  });
};
