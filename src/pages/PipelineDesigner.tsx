
import React from 'react';
import BasicTierLayout from '@/components/layouts/BasicTierLayout';
import PipelineCanvas from '@/components/pipeline/PipelineCanvas';

const PipelineDesignerPage = () => {
  return (
    <BasicTierLayout pageTitle="Pipeline Designer" requiredFeature="pipeline-designer">
      <PipelineCanvas />
    </BasicTierLayout>
  );
};

export default PipelineDesignerPage;
