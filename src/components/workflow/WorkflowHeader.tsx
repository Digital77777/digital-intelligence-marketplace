
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Bot } from 'lucide-react';
import CreateWorkflowForm from './CreateWorkflowForm';

interface WorkflowHeaderProps {
  onCreateWorkflow: (workflowData: { name: string; description: string }) => void;
  isCreating: boolean;
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (open: boolean) => void;
  initialData?: { name: string; description: string };
}

const WorkflowHeader: React.FC<WorkflowHeaderProps> = ({
  onCreateWorkflow,
  isCreating,
  isCreateDialogOpen,
  setIsCreateDialogOpen,
  initialData
}) => {
  return (
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
            onClick={() => setIsCreateDialogOpen(true)} 
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
            onSubmit={onCreateWorkflow} 
            isSubmitting={isCreating}
            initialData={initialData}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkflowHeader;
