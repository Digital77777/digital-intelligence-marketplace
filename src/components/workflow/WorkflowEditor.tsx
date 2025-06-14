import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Play, Pause, Edit, Trash2, Save, ArrowRight, Zap, Bot } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTier } from '@/context/TierContext';
import AdvancedStepEditor from './AdvancedStepEditor';
import WorkflowTemplates from './WorkflowTemplates';
import SchedulingPanel from './SchedulingPanel';

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  type: string;
  config: any;
  order: number;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  status: string;
  created_at: string;
}

const WorkflowEditor = () => {
  const { canAccess } = useTier();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    steps: [] as WorkflowStep[]
  });
  const [availableModels, setAvailableModels] = useState([
    { id: 'text-generator', name: 'Text Generator Model' },
    { id: 'classifier', name: 'Classification Model' },
    { id: 'intent-classifier', name: 'Intent Classifier' },
    { id: 'response-generator', name: 'Response Generator' }
  ]);
  const [schedulingConfig, setSchedulingConfig] = useState({
    enabled: false,
    type: 'once' as const,
    schedule: '',
    timezone: 'UTC',
    conditions: []
  });
  const [activeTab, setActiveTab] = useState('workflows');
  const { toast } = useToast();

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedWorkflows = data?.map(workflow => ({
        ...workflow,
        steps: Array.isArray(workflow.steps) ? workflow.steps : []
      })) || [];

      setWorkflows(formattedWorkflows);
    } catch (error) {
      console.error('Error fetching workflows:', error);
      toast({
        title: "Error",
        description: "Failed to load workflows",
        variant: "destructive"
      });
    }
  };

  const createWorkflow = async () => {
    try {
      const { data, error } = await supabase
        .from('workflows')
        .insert([{
          name: newWorkflow.name,
          description: newWorkflow.description,
          steps: newWorkflow.steps,
          status: 'draft'
        }])
        .select()
        .single();

      if (error) throw error;

      setWorkflows([data, ...workflows]);
      setIsCreateDialogOpen(false);
      setNewWorkflow({ name: '', description: '', steps: [] });
      
      toast({
        title: "Success",
        description: "Workflow created successfully"
      });
    } catch (error) {
      console.error('Error creating workflow:', error);
      toast({
        title: "Error",
        description: "Failed to create workflow",
        variant: "destructive"
      });
    }
  };

  const updateWorkflow = async (workflow: Workflow) => {
    try {
      const { error } = await supabase
        .from('workflows')
        .update({
          name: workflow.name,
          description: workflow.description,
          steps: workflow.steps,
          status: workflow.status
        })
        .eq('id', workflow.id);

      if (error) throw error;

      setWorkflows(workflows.map(w => w.id === workflow.id ? workflow : w));
      toast({
        title: "Success",
        description: "Workflow updated successfully"
      });
    } catch (error) {
      console.error('Error updating workflow:', error);
      toast({
        title: "Error",
        description: "Failed to update workflow",
        variant: "destructive"
      });
    }
  };

  const addStep = (workflow: Workflow) => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      name: `Step ${workflow.steps.length + 1}`,
      description: '',
      type: 'action',
      config: {},
      order: workflow.steps.length
    };

    const updatedWorkflow = {
      ...workflow,
      steps: [...workflow.steps, newStep]
    };

    setSelectedWorkflow(updatedWorkflow);
    updateWorkflow(updatedWorkflow);
  };

  const removeStep = (workflow: Workflow, stepId: string) => {
    const updatedWorkflow = {
      ...workflow,
      steps: workflow.steps.filter(step => step.id !== stepId)
    };

    setSelectedWorkflow(updatedWorkflow);
    updateWorkflow(updatedWorkflow);
  };

  const addAdvancedStep = (workflow: Workflow) => {
    const newStep = {
      id: Date.now().toString(),
      name: `Advanced Step ${workflow.steps.length + 1}`,
      description: '',
      type: 'action',
      config: {},
      order: workflow.steps.length,
      triggers: [],
      dependencies: []
    };

    const updatedWorkflow = {
      ...workflow,
      steps: [...workflow.steps, newStep]
    };

    setSelectedWorkflow(updatedWorkflow);
    updateWorkflow(updatedWorkflow);
  };

  const updateAdvancedStep = (workflow: Workflow, stepId: string, updatedStep: any) => {
    const updatedWorkflow = {
      ...workflow,
      steps: workflow.steps.map(step => 
        step.id === stepId ? updatedStep : step
      )
    };

    setSelectedWorkflow(updatedWorkflow);
    updateWorkflow(updatedWorkflow);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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

    const newWorkflowFromTemplate = {
      name: template.name,
      description: template.description,
      steps: template.template.steps.map((step: any, index: number) => ({
        ...step,
        id: Date.now().toString() + index,
        order: index
      }))
    };

    setNewWorkflow(newWorkflowFromTemplate);
    setIsCreateDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
            <Button className="bg-[#6AC8FF] hover:bg-[#6AC8FF]/90 text-gray-900">
              <Plus className="w-4 h-4 mr-2" />
              New Workflow
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Workflow</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Workflow name"
                value={newWorkflow.name}
                onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
              />
              <Textarea
                placeholder="Workflow description"
                value={newWorkflow.description}
                onChange={(e) => setNewWorkflow({ ...newWorkflow, description: e.target.value })}
              />
              <Button onClick={createWorkflow} className="w-full">
                Create Workflow
              </Button>
            </div>
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
            {/* Workflows List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Workflows</CardTitle>
                  <CardDescription>Your automated workflows</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {workflows.map((workflow) => (
                      <div
                        key={workflow.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedWorkflow?.id === workflow.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedWorkflow(workflow)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{workflow.name}</h4>
                            <p className="text-sm text-gray-600">{workflow.description}</p>
                            <div className="flex items-center mt-2 space-x-2">
                              <Badge className={getStatusColor(workflow.status)}>
                                {workflow.status}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {workflow.steps.length} steps
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Workflow Editor */}
            <div className="lg:col-span-2">
              {selectedWorkflow ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>{selectedWorkflow.name}</CardTitle>
                        <CardDescription>{selectedWorkflow.description}</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={() => addAdvancedStep(selectedWorkflow)}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Step
                        </Button>
                        {selectedWorkflow.status === 'active' ? (
                          <Button variant="outline">
                            <Pause className="w-4 h-4 mr-2" />
                            Pause
                          </Button>
                        ) : (
                          <Button className="bg-[#6AC8FF] hover:bg-[#6AC8FF]/90 text-gray-900">
                            <Play className="w-4 h-4 mr-2" />
                            Start
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedWorkflow.steps.map((step, index) => (
                        <div key={step.id} className="flex items-center space-x-4">
                          {canAccess('ai-studio') ? (
                            <AdvancedStepEditor
                              step={step}
                              onUpdate={(updatedStep) => updateAdvancedStep(selectedWorkflow, step.id, updatedStep)}
                              onDelete={() => removeStep(selectedWorkflow, step.id)}
                              availableModels={availableModels}
                            />
                          ) : (
                            <div className="flex-1 p-4 border rounded-lg">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="font-medium">{step.name}</h4>
                                  <p className="text-sm text-gray-600">{step.description}</p>
                                  <Badge variant="outline" className="mt-2">
                                    {step.type}
                                  </Badge>
                                </div>
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeStep(selectedWorkflow, step.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                          {index < selectedWorkflow.steps.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      ))}
                      
                      {selectedWorkflow.steps.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <p>No steps added yet.</p>
                          <Button 
                            variant="outline" 
                            onClick={() => addAdvancedStep(selectedWorkflow)}
                            className="mt-2"
                          >
                            Add First Step
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center h-96">
                    <div className="text-center text-gray-500">
                      <p>Select a workflow to edit</p>
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
