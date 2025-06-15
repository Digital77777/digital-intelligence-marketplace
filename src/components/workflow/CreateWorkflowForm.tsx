
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CreateWorkflowFormProps {
  onSubmit: (workflowData: { name: string; description: string; }) => void;
  isSubmitting?: boolean;
  initialData?: { name: string; description: string };
}

const CreateWorkflowForm: React.FC<CreateWorkflowFormProps> = ({ onSubmit, isSubmitting, initialData }) => {
  const [workflowData, setWorkflowData] = useState({ name: '', description: '' });

  useEffect(() => {
    setWorkflowData(initialData || { name: '', description: '' });
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(workflowData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Workflow name"
        value={workflowData.name}
        onChange={(e) => setWorkflowData({ ...workflowData, name: e.target.value })}
        disabled={isSubmitting}
      />
      <Textarea
        placeholder="Workflow description"
        value={workflowData.description}
        onChange={(e) => setWorkflowData({ ...workflowData, description: e.target.value })}
        disabled={isSubmitting}
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Workflow'}
      </Button>
    </form>
  );
};

export default CreateWorkflowForm;
