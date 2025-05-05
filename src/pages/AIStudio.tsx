
import React, { useState } from 'react';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Save, Play } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import useScrollToTop from '@/hooks/useScrollToTop';

// Import custom components
import ModelDesigner from '@/components/ai-studio/ModelDesigner';
import ComponentsSidebar from '@/components/ai-studio/ComponentsSidebar';
import ModelDetails from '@/components/ai-studio/ModelDetails';
import VersionHistory from '@/components/ai-studio/VersionHistory';
import PipelineDesignerView from '@/components/ai-studio/PipelineDesignerView';
import { ScrollArea } from '@/components/ui/scroll-area';

// Import utilities
import { getSampleVersionHistory, saveModel } from '@/utils/modelService';
import { ModelComponent } from '@/components/ai-studio/ModelDesigner';

// Custom hook to manage model state
import useModelState from '@/hooks/useModelState';

const AIStudio = () => {
  const { toast } = useToast();
  // Use our custom scroll hook
  useScrollToTop();
  
  // Use the extracted model state management
  const {
    modelName,
    setModelName,
    modelVersion,
    setModelVersion,
    modelDescription, 
    setModelDescription,
    modelComponents,
    setModelComponents,
    handleAddComponent,
    handleSave,
    handleRun,
    isSaving,
    isRunning
  } = useModelState();

  return (
    <ProTierLayout pageTitle="AI Studio" requiredFeature="ai-studio">
      <ScrollArea className="text-white space-y-6 h-full">
        <Tabs defaultValue="modelTraining" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="bg-gray-800/50 border border-gray-700">
              <TabsTrigger value="modelTraining" className="data-[state=active]:bg-[#6AC8FF]/20 data-[state=active]:text-[#6AC8FF]">
                Model Training
              </TabsTrigger>
              <TabsTrigger value="pipelineDesign" className="data-[state=active]:bg-[#6AC8FF]/20 data-[state=active]:text-[#6AC8FF]">
                Pipeline Design
              </TabsTrigger>
              <TabsTrigger value="versionHistory" className="data-[state=active]:bg-[#6AC8FF]/20 data-[state=active]:text-[#6AC8FF]">
                Version History
              </TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-white border-gray-700 hover:bg-gray-800"
                disabled={isSaving}
                onClick={handleSave}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-[#6AC8FF] border-[#6AC8FF]/30 hover:bg-[#6AC8FF]/10"
                disabled={isRunning || modelComponents.length === 0}
                onClick={handleRun}
              >
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? 'Running...' : 'Run'}
              </Button>
            </div>
          </div>
          
          <TabsContent value="modelTraining" className="mt-0">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8">
                <ModelDesigner />
              </div>
              
              <div className="col-span-12 lg:col-span-4 space-y-6">
                <ComponentsSidebar onAddComponent={handleAddComponent} />
                
                <ModelDetails 
                  modelName={modelName}
                  setModelName={setModelName}
                  modelVersion={modelVersion}
                  setModelVersion={setModelVersion}
                  modelDescription={modelDescription}
                  setModelDescription={setModelDescription}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="pipelineDesign" className="mt-0">
            <PipelineDesignerView />
          </TabsContent>
          
          <TabsContent value="versionHistory" className="mt-0">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium">Version History</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-white border-gray-700 hover:bg-gray-800"
                >
                  Export History
                </Button>
              </div>
              
              <VersionHistory history={getSampleVersionHistory()} />
            </div>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </ProTierLayout>
  );
};

export default AIStudio;
