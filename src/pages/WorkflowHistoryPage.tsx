
import React from 'react';
import BasicTierLayout from '@/components/layouts/BasicTierLayout';
import WorkflowHistory from '@/components/workflow/WorkflowHistory';

const WorkflowHistoryPage = () => {
  return (
    <BasicTierLayout pageTitle="Workflow Run History" requiredFeature="workflow-designer">
      <div className="w-full">
        <WorkflowHistory />
      </div>
    </BasicTierLayout>
  );
};

export default WorkflowHistoryPage;
