
import React from 'react';
import BasicTierLayout from '@/components/layouts/BasicTierLayout';
import WorkflowEditor from '@/components/workflow/WorkflowEditor';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkflowDesignerPage = () => {
  return (
    <BasicTierLayout 
      pageTitle="Workflow Designer" 
      requiredFeature="workflow-designer"
      headerActions={
        <Button asChild variant="outline">
          <Link to="/workflow-history">
            <History className="mr-2 h-4 w-4" />
            View Run History
          </Link>
        </Button>
      }
    >
      <WorkflowEditor />
    </BasicTierLayout>
  );
};

export default WorkflowDesignerPage;
