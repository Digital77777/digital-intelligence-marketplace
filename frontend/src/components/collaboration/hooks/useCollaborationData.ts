
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { CollaborationHubData } from '../types';
import { toast } from 'sonner';

const fetchCollaborationData = async (): Promise<CollaborationHubData> => {
  console.log('Fetching collaboration data...');
  
  const { data, error } = await supabase.functions.invoke<CollaborationHubData>('collaboration-hub-data', {
    method: 'GET',
  });

  if (error) {
    console.error('Collaboration data fetch error:', error);
    throw new Error(`Failed to fetch collaboration data: ${error.message}`);
  }
  
  console.log('Collaboration data fetched successfully:', data);
  return data || {
    discussions: [],
    files: [],
    teamMembers: [],
    tasks: [],
    activities: [],
    teams: []
  };
};

export const useCollaborationData = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [hasShownError, setHasShownError] = useState(false);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['collaboration-hub', user?.id],
    queryFn: fetchCollaborationData,
    enabled: !!user,
    retry: (failureCount, error) => {
      console.log(`Retry attempt ${failureCount} for collaboration data:`, error);
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      onError: (error) => {
        console.error('Collaboration query error:', error);
        if (!hasShownError) {
          toast.error('Failed to load collaboration data');
          setHasShownError(true);
        }
      }
    }
  });

  // Reset error state when user changes
  useEffect(() => {
    setHasShownError(false);
  }, [user?.id]);

  useEffect(() => {
    if (!user) return;

    console.log('Setting up real-time subscriptions for user:', user.id);

    // Set up real-time subscriptions for live updates
    const discussionsChannel = supabase
      .channel('discussions-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'discussions' }, (payload) => {
        console.log('Discussions changed:', payload);
        queryClient.invalidateQueries({ queryKey: ['collaboration-hub', user.id] });
      })
      .subscribe();

    const filesChannel = supabase
      .channel('files-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'files' }, (payload) => {
        console.log('Files changed:', payload);
        queryClient.invalidateQueries({ queryKey: ['collaboration-hub', user.id] });
      })
      .subscribe();

    const tasksChannel = supabase
      .channel('tasks-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, (payload) => {
        console.log('Tasks changed:', payload);
        queryClient.invalidateQueries({ queryKey: ['collaboration-hub', user.id] });
      })
      .subscribe();

    const activityChannel = supabase
      .channel('activity-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team_activity' }, (payload) => {
        console.log('Activity changed:', payload);
        queryClient.invalidateQueries({ queryKey: ['collaboration-hub', user.id] });
      })
      .subscribe();

    return () => {
      console.log('Cleaning up real-time subscriptions');
      supabase.removeChannel(discussionsChannel);
      supabase.removeChannel(filesChannel);
      supabase.removeChannel(tasksChannel);
      supabase.removeChannel(activityChannel);
    };
  }, [user, queryClient]);

  return {
    data: data || {
      discussions: [],
      files: [],
      teamMembers: [],
      tasks: [],
      activities: [],
      teams: []
    },
    isLoading,
    isError,
    error,
    refetch
  };
};
