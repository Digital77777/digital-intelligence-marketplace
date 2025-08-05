import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Workflow } from '@/components/workflow/types';
import { v4 as uuidv4 } from 'uuid';

export const useWorkflows = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Mock data for frontend-only version
  const mockWorkflows: Workflow[] = [
    {
      id: '1',
      name: 'Customer Onboarding',
      description: 'Automated workflow for new customer onboarding process',
      steps: [
        {
          id: '1',
          name: 'Welcome Email',
          description: 'Send welcome email to new customer',
          type: 'notification',
          config: { template: 'welcome', delay: 0 },
          order: 0
        },
        {
          id: '2',
          name: 'Account Setup',
          description: 'Create customer account and profile',
          type: 'action',
          config: { action: 'create_account' },
          order: 1
        }
      ],
      status: 'active',
      created_at: new Date().toISOString(),
      created_by: 'demo-user',
      team_id: null
    },
    {
      id: '2',
      name: 'Data Processing Pipeline',
      description: 'AI-powered data analysis and classification workflow',
      steps: [
        {
          id: '3',
          name: 'Data Validation',
          description: 'Validate incoming data format',
          type: 'condition',
          config: { rules: ['format', 'completeness'] },
          order: 0
        },
        {
          id: '4',
          name: 'AI Classification',
          description: 'Classify data using machine learning model',
          type: 'ai-model',
          config: { model: 'classifier', confidence: 0.8 },
          order: 1
        }
      ],
      status: 'draft',
      created_at: new Date().toISOString(),
      created_by: 'demo-user',
      team_id: null
    }
  ];

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setWorkflows(mockWorkflows);
      setIsLoading(false);
    }, 1000);
  }, []);

  const createWorkflow = {
    mutateAsync: async (workflowData: { name: string; description: string }) => {
      const newWorkflow: Workflow = {
        id: uuidv4(),
        name: workflowData.name,
        description: workflowData.description,
        steps: [],
        status: 'draft',
        created_at: new Date().toISOString(),
        created_by: 'demo-user',
        team_id: null
      };

      setWorkflows(prev => [...prev, newWorkflow]);
      toast({
        title: "Success",
        description: "Workflow created successfully"
      });
      
      return newWorkflow;
    },
    isPending: false
  };

  const updateWorkflow = {
    mutateAsync: async (workflowData: Partial<Workflow> & { id: string }) => {
      setWorkflows(prev => 
        prev.map(w => w.id === workflowData.id ? { ...w, ...workflowData } : w)
      );
      
      toast({
        title: "Success",
        description: "Workflow updated successfully"
      });
      
      return workflowData;
    },
    isPending: false
  };

  return {
    workflows,
    isLoading,
    createWorkflow,
    updateWorkflow
  };
};
