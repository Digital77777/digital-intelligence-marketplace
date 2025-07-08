
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Workflow } from './types';
import { Skeleton } from '@/components/ui/skeleton';

interface WorkflowListProps {
  workflows: Workflow[];
  selectedWorkflow: Workflow | null;
  onSelectWorkflow: (workflow: Workflow) => void;
  isLoading: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'paused': return 'bg-yellow-100 text-yellow-800';
    case 'draft': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const WorkflowList: React.FC<WorkflowListProps> = ({ workflows, selectedWorkflow, onSelectWorkflow, isLoading }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workflows</CardTitle>
        <CardDescription>Your automated workflows</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {isLoading ? (
            [...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 w-full" />)
          ) : (
            workflows.map((workflow) => (
              <div
                key={workflow.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedWorkflow?.id === workflow.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => onSelectWorkflow(workflow)}
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
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowList;
