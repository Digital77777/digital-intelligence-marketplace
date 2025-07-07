
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTier } from '@/context/TierContext';
import { useUser } from '@/context/UserContext';
import { useWorkflows } from '@/hooks/useWorkflows';
import { Workflow, WorkflowStep, SchedulingConfig } from '../types';

export const useWorkflowManager = () => {
  const { canAccess } = useTier();
  const { user } = useUser();
  const { workflows, isLoading, createWorkflow, updateWorkflow } = useWorkflows();
  const { toast } = useToast();

  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newWorkflowFromTemplate, setNewWorkflowFromTemplate] = useState<any | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('workflows');

  const [availableModels] = useState([
    { id: 'text-generator', name: 'Text Generator Model' },
    { id: 'classifier', name: 'Classification Model' },
    { id: 'intent-classifier', name: 'Intent Classifier' },
    { id: 'response-generator', name: 'Response Generator' }
  ]);

  const [schedulingConfig, setSchedulingConfig] = useState<SchedulingConfig>({
    enabled: false,
    type: 'once',
    schedule: '',
    timezone: 'UTC',
    conditions: [],
  });

  useEffect(() => {
    if (selectedWorkflow) {
      const updatedWorkflow = workflows.find(w => w.id === selectedWorkflow.id);
      if (updatedWorkflow) {
        setSelectedWorkflow(updatedWorkflow);
      } else {
        setSelectedWorkflow(null);
      }
    } else if (!isLoading && workflows.length > 0) {
      setSelectedWorkflow(workflows[0]);
    }
  }, [workflows, isLoading, selectedWorkflow]);

  const handleUpdateWorkflow = async (workflow: Partial<Workflow> & { id: string }) => {
    try {
      await updateWorkflow.mutateAsync(workflow);
    } catch (e) {
      // Error is handled by the mutation's onError hook
    }
  };

  const handleCreateWorkflow = async (workflowData: { name: string; description: string; }) => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to create a workflow.",
        variant: "destructive"
      });
      return;
    }

    try {
      const newWorkflow = await createWorkflow.mutateAsync(workflowData);
      if (newWorkflow && newWorkflowFromTemplate?.template?.steps) {
        const workflowWithSteps = {
          ...newWorkflow,
          steps: newWorkflowFromTemplate.template.steps.map((step: any, index: number): WorkflowStep => ({
            ...step,
            id: Date.now().toString() + index,
            order: index
          }))
        };
        await handleUpdateWorkflow(workflowWithSteps);
        setSelectedWorkflow(workflowWithSteps);
      } else if (newWorkflow) {
        setSelectedWorkflow(newWorkflow);
      }
      setIsCreateDialogOpen(false);
      setNewWorkflowFromTemplate(undefined);
    } catch (e) {
      // Error is handled by the mutation's onError hook
    }
  };

  const handleTemplateSelect = (template: any) => {
    if (template.isPro && !canAccess('ai-studio')) {
      toast({
        title: "Pro Feature",
        description: "This template requires a Pro subscription",
        variant: "destructive"
      });
      return;
    }
    
    setNewWorkflowFromTemplate(template);
    setIsCreateDialogOpen(true);
  };

  return {
    workflows,
    isLoading,
    selectedWorkflow,
    setSelectedWorkflow,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    newWorkflowFromTemplate,
    activeTab,
    setActiveTab,
    availableModels,
    schedulingConfig,
    setSchedulingConfig,
    handleUpdateWorkflow,
    handleCreateWorkflow,
    handleTemplateSelect,
    canAccessProFeatures: canAccess('ai-studio'),
    isCreating: createWorkflow.isPending || updateWorkflow.isPending
  };
};
