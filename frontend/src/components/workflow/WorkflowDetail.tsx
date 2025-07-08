
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Play, Pause, ArrowRight } from 'lucide-react';
import { Workflow, WorkflowStep } from './types';
import WorkflowStepEditor from './WorkflowStepEditor';
import { useTier } from '@/context/TierContext';

interface WorkflowDetailProps {
  workflow: Workflow;
  onUpdateWorkflow: (workflow: Partial<Workflow> & { id: string }) => Promise<any>;
  availableModels: { id: string; name: string }[];
}

const WorkflowDetail: React.FC<WorkflowDetailProps> = ({ workflow, onUpdateWorkflow, availableModels }) => {
  const { canAccess } = useTier();

  const addStep = () => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      name: `Step ${workflow.steps.length + 1}`,
      description: '',
      type: 'action',
      config: {},
      order: workflow.steps.length,
      triggers: [],
      dependencies: []
    };

    onUpdateWorkflow({
      ...workflow,
      steps: [...workflow.steps, newStep]
    });
  };

  const removeStep = (stepId: string) => {
    onUpdateWorkflow({
      ...workflow,
      steps: workflow.steps.filter(step => step.id !== stepId)
    });
  };
  
  const updateStep = (stepId: string, updatedStep: WorkflowStep) => {
    onUpdateWorkflow({
      ...workflow,
      steps: workflow.steps.map(step => 
        step.id === stepId ? updatedStep : step
      )
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{workflow.name}</CardTitle>
            <CardDescription>{workflow.description}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={addStep}>
              <Plus className="w-4 h-4 mr-2" />
              Add Step
            </Button>
            {workflow.status === 'active' ? (
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
          {workflow.steps.map((step, index) => (
            <div key={step.id} className="flex items-center space-x-4">
              <WorkflowStepEditor
                step={step}
                onUpdate={(updatedStep) => updateStep(step.id, updatedStep)}
                onDelete={() => removeStep(step.id)}
                availableModels={availableModels}
                isAdvanced={canAccess('ai-studio')}
              />
              {index < workflow.steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-gray-400" />
              )}
            </div>
          ))}
          
          {workflow.steps.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No steps added yet.</p>
              <Button 
                variant="outline" 
                onClick={addStep}
                className="mt-2"
              >
                Add First Step
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowDetail;
