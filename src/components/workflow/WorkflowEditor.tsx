
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Play, Pause, Edit, Trash2, Save, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    steps: [] as WorkflowStep[]
  });
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Workflow Designer</h1>
          <p className="text-gray-600">Create and manage automated workflows</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Workflow
            </Button>
          </DialogTrigger>
          <DialogContent>
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
                    <Button variant="outline" onClick={() => addStep(selectedWorkflow)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Step
                    </Button>
                    {selectedWorkflow.status === 'active' ? (
                      <Button variant="outline">
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </Button>
                    ) : (
                      <Button>
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
                        onClick={() => addStep(selectedWorkflow)}
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
    </div>
  );
};

export default WorkflowEditor;
