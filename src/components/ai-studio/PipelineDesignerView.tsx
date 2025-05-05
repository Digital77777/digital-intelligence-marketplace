
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { GitBranch, Plus, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

const PipelineDesignerView = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleCreatePipeline = () => {
    toast({
      title: "Creating new pipeline",
      description: "Setting up your new pipeline project",
    });
    navigate('/pipeline-designer');
  };
  
  return (
    <div 
      className={`bg-gray-900/50 border border-gray-800 rounded-lg p-8 flex items-center justify-center h-[500px] transition-all duration-300 ${isHovered ? 'border-[#6AC8FF]/50' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-center max-w-md">
        <GitBranch className={`h-16 w-16 mx-auto mb-6 transition-all duration-300 ${isHovered ? 'text-[#6AC8FF] scale-110' : 'text-[#6AC8FF]/70'}`} />
        <h3 className="text-2xl font-medium mb-3">Pipeline Designer</h3>
        <p className="text-gray-400 mb-6">
          Create complex data and AI pipelines with our visual workflow builder. Connect data sources, processing steps, and output destinations.
        </p>
        <div className="flex items-center justify-center space-x-2">
          <Button 
            className="bg-[#6AC8FF] hover:bg-[#6AC8FF]/90 text-gray-900"
            onClick={handleCreatePipeline}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Pipeline
          </Button>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="border-gray-700">
                <Info className="h-4 w-4 text-gray-400" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-gray-800 text-white border-gray-700">
              <p className="text-sm max-w-xs">
                Pipelines let you connect data sources to AI models and output destinations
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default PipelineDesignerView;
