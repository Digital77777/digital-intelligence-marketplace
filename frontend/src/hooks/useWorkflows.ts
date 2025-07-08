import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Workflow } from '@/components/workflow/types';
import { useUser } from '@/context/UserContext';
import { useEffect } from 'react';

const fetchWorkflows = async (): Promise<Workflow[]> => {
    const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;

    return data?.map(workflow => ({
        ...workflow,
        steps: Array.isArray(workflow.steps) ? workflow.steps : []
    })) || [];
};

export const useWorkflows = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { user } = useUser();

    const { data: workflows = [], isLoading, isError, error } = useQuery<Workflow[], Error>({
        queryKey: ['workflows'],
        queryFn: fetchWorkflows,
    });
    
    useEffect(() => {
        if (isError) {
            console.error('Error fetching workflows:', error);
            toast({
                title: "Error",
                description: error?.message || "Failed to load workflows",
                variant: "destructive"
            });
        }
    }, [isError, error, toast]);

    const createWorkflowMutation = useMutation({
        mutationFn: async (newWorkflow: { name: string, description: string }) => {
            if (!user) throw new Error("You must be logged in to create a workflow.");
            
            const { data, error } = await supabase
                .from('workflows')
                .insert([{
                    name: newWorkflow.name,
                    description: newWorkflow.description,
                    steps: [],
                    status: 'draft',
                    created_by: user.id,
                }])
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workflows'] });
            toast({
                title: "Success",
                description: "Workflow created successfully"
            });
        },
        onError: (error: any) => {
            console.error('Error creating workflow:', error);
            toast({
                title: "Error",
                description: `Failed to create workflow: ${error.message}`,
                variant: "destructive"
            });
        }
    });

    const updateWorkflowMutation = useMutation({
        mutationFn: async (workflowToUpdate: Partial<Workflow> & { id: string }) => {
            const { error } = await supabase
                .from('workflows')
                .update({
                    name: workflowToUpdate.name,
                    description: workflowToUpdate.description,
                    steps: workflowToUpdate.steps,
                    status: workflowToUpdate.status
                })
                .eq('id', workflowToUpdate.id)
                .select()
                .single();

            if (error) throw error;
            return workflowToUpdate;
        },
        onSuccess: (updatedWorkflow) => {
             queryClient.invalidateQueries({ queryKey: ['workflows'] });
            toast({
                title: "Success",
                description: "Workflow updated successfully"
            });
        },
        onError: (error: any) => {
            console.error('Error updating workflow:', error);
            toast({
                title: "Error",
                description: "Failed to update workflow",
                variant: "destructive"
            });
        }
    });

    return {
        workflows,
        isLoading,
        createWorkflow: createWorkflowMutation,
        updateWorkflow: updateWorkflowMutation,
    };
};
