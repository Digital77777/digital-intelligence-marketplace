
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Bot, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTier } from '@/context/TierContext';
import WorkflowTemplates from './WorkflowTemplates';
import SchedulingPanel from './SchedulingPanel';
import { Workflow, SchedulingConfig, WorkflowStep } from './types';
import { useWorkflows } from '@/hooks/useWorkflows';
import WorkflowList from './WorkflowList';
import WorkflowDetail from './WorkflowDetail';
import CreateWorkflowForm from './CreateWorkflowForm';
import { Button } from '../ui/button';

const WorkflowEditor = () => {
  const { canAccess } = useTier();
  const { workflows, isLoading, createWorkflow, updateWorkflow } = useWorkflows();
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newWorkflowFromTemplate, setNewWorkflowFromTemplate] = useState<any | undefined>(undefined);

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
  const [activeTab, setActiveTab] = useState('workflows');
  const { toast } = useToast();

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
    } catch(e) {
      // Error is handled by the mutation's onError hook
    }
  };

  const handleCreateWorkflow = async (workflowData: { name: string; description: string; }) => {
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
      }
      setIsCreateDialogOpen(false);
      setNewWorkflowFromTemplate(undefined);
    } catch(e) {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bot className="h-8 w-8 text-[#6AC8FF]" />
            Workflow Designer
          </h1>
          <p className="text-gray-600">Create and manage automated workflows with AI integration</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => { setNewWorkflowFromTemplate(undefined); setIsCreateDialogOpen(true); }} 
              className="bg-[#6AC8FF] hover:bg-[#6AC8FF]/90 text-gray-900"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Workflow
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Workflow</DialogTitle>
            </DialogHeader>
            <CreateWorkflowForm 
              onSubmit={handleCreateWorkflow} 
              isSubmitting={createWorkflow.isLoading || updateWorkflow.isLoading}
              initialData={newWorkflowFromTemplate ? { name: newWorkflowFromTemplate.name, description: newWorkflowFromTemplate.description } : undefined}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="workflows">My Workflows</TabsTrigger>
          <TabsTrigger value="templates">
            Templates
            {canAccess('ai-studio') && <Badge className="ml-2 bg-purple-100 text-purple-800">PRO</Badge>}
          </TabsTrigger>
          <TabsTrigger value="scheduling">
            Automation
            {canAccess('ai-studio') && <Badge className="ml-2 bg-purple-100 text-purple-800">PRO</Badge>}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="workflows">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <WorkflowList
                workflows={workflows}
                selectedWorkflow={selectedWorkflow}
                onSelectWorkflow={setSelectedWorkflow}
                isLoading={isLoading}
              />
            </div>

            <div className="lg:col-span-2">
              {selectedWorkflow ? (
                <WorkflowDetail
                  workflow={selectedWorkflow}
                  onUpdateWorkflow={handleUpdateWorkflow}
                  availableModels={availableModels}
                />
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center h-96">
                    <div className="text-center text-gray-500">
                      {isLoading ? 'Loading workflows...' : 'Select a workflow to edit or create a new one.'}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          {canAccess('ai-studio') ? (
            <WorkflowTemplates onSelectTemplate={handleTemplateSelect} />
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Pro Feature Required</h3>
                  <p className="text-gray-600">Upgrade to Pro to access advanced workflow templates</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="scheduling">
          {canAccess('ai-studio') ? (
            <SchedulingPanel
              config={schedulingConfig}
              onChange={setSchedulingConfig}
            />
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Pro Feature Required</h3>
                  <p className="text-gray-600">Upgrade to Pro to access advanced scheduling and automation</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowEditor;
