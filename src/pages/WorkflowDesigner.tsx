
import React from 'react';
import BasicTierLayout from '@/components/layouts/BasicTierLayout';
import WorkflowEditor from '@/components/workflow/WorkflowEditor';

const WorkflowDesignerPage = () => {
  return (
    <BasicTierLayout pageTitle="Workflow Designer" requiredFeature="workflow-designer">
      <WorkflowEditor />
    </BasicTierLayout>
  );
};

export default WorkflowDesignerPage;
