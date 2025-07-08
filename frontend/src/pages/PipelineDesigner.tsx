
import React from 'react';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import PipelineCanvas from '@/components/pipeline/PipelineCanvas';

const PipelineDesignerPage = () => {
  return (
    <ProTierLayout pageTitle="Pipeline Designer" requiredFeature="pipeline-designer">
      <PipelineCanvas />
    </ProTierLayout>
  );
};

export default PipelineDesignerPage;
