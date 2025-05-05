
import React from 'react';
import { Button } from "@/components/ui/button";
import { GitBranch, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PipelineDesignerView = () => {
  const navigate = useNavigate();
  
  const handleCreatePipeline = () => {
    navigate('/pipeline-designer');
  };
  
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 flex items-center justify-center h-[500px]">
      <div className="text-center max-w-md">
        <GitBranch className="h-16 w-16 text-[#6AC8FF] mx-auto mb-6" />
        <h3 className="text-2xl font-medium mb-3">Pipeline Designer</h3>
        <p className="text-gray-400 mb-6">
          Create complex data and AI pipelines with our visual workflow builder. Connect data sources, processing steps, and output destinations.
        </p>
        <Button 
          className="bg-[#6AC8FF] hover:bg-[#6AC8FF]/90 text-gray-900"
          onClick={handleCreatePipeline}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Pipeline
        </Button>
      </div>
    </div>
  );
};

export default PipelineDesignerView;
