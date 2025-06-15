
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';

type ProjectProposal = Database['public']['Tables']['project_proposals']['Row'];
type ProjectProposalInsert = Database['public']['Tables']['project_proposals']['Insert'];

export const useProjectProposals = (projectId: string) => {
  return useQuery({
    queryKey: ['project-proposals', projectId],
    queryFn: async (): Promise<ProjectProposal[]> => {
      const { data, error } = await supabase
        .from('project_proposals')
        .select('*')
        .eq('project_id', projectId)
        .order('submitted_at', { ascending: false });

      if (error) {
        console.error('Error fetching project proposals:', error);
        throw new Error(error.message);
      }

      return data || [];
    },
    enabled: !!projectId,
  });
};

export const useCreateProposal = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async (proposal: Omit<ProjectProposalInsert, 'freelancer_id'>) => {
      if (!user) {
        throw new Error('You must be logged in to submit a proposal');
      }

      const { data, error } = await supabase
        .from('project_proposals')
        .insert({
          ...proposal,
          freelancer_id: user.id,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating proposal:', error);
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: (data) => {
      toast.success('Proposal submitted successfully!');
      queryClient.invalidateQueries({ queryKey: ['project-proposals', data.project_id] });
    },
    onError: (error: any) => {
      console.error('Error creating proposal:', error);
      toast.error(error.message || 'Failed to submit proposal');
    },
  });
};
