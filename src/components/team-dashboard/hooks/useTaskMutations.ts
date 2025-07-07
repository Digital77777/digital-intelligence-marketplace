
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Task } from '../types';

export const useTaskMutations = (onSuccess?: () => void) => {
  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      const { error } = await supabase.from('tasks').delete().eq('id', taskId);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast.success('Task deleted successfully!');
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(`Failed to delete task: ${error.message}`);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Task> }) => {
      const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast.success('Task updated successfully!');
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(`Failed to update task: ${error.message}`);
    },
  });

  return {
    deleteTask: deleteTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    isDeleting: deleteTaskMutation.isPending,
    isUpdating: updateTaskMutation.isPending,
  };
};
