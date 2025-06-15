
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { CollaborationHubData } from '../types';

const fetchCollaborationData = async (): Promise<CollaborationHubData> => {
  const { data, error } = await supabase.functions.invoke<CollaborationHubData>('collaboration-hub-data', {
    method: 'GET',
  });

  if (error) {
    throw new Error(`Failed to fetch collaboration data: ${error.message}`);
  }
  return data;
};

export const useCollaborationData = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['collaboration-hub', user?.id],
    queryFn: fetchCollaborationData,
    enabled: !!user,
  });

  useEffect(() => {
    if (!user) return;

    // Set up real-time subscriptions for live updates
    const discussionsChannel = supabase
      .channel('discussions-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'discussions' }, () => {
        queryClient.invalidateQueries({ queryKey: ['collaboration-hub', user.id] });
      })
      .subscribe();

    const filesChannel = supabase
      .channel('files-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'files' }, () => {
        queryClient.invalidateQueries({ queryKey: ['collaboration-hub', user.id] });
      })
      .subscribe();

    const tasksChannel = supabase
      .channel('tasks-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
        queryClient.invalidateQueries({ queryKey: ['collaboration-hub', user.id] });
      })
      .subscribe();

    const activityChannel = supabase
      .channel('activity-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team_activity' }, () => {
        queryClient.invalidateQueries({ queryKey: ['collaboration-hub', user.id] });
      })
      .subscribe();

    return () => {
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
    error
  };
};
