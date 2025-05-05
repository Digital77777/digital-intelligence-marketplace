
import React, { useState } from 'react';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Save, Play } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Import custom components
import ModelDesigner from '@/components/ai-studio/ModelDesigner';
import ComponentsSidebar from '@/components/ai-studio/ComponentsSidebar';
import ModelDetails from '@/components/ai-studio/ModelDetails';
import VersionHistory from '@/components/ai-studio/VersionHistory';
import PipelineDesignerView from '@/components/ai-studio/PipelineDesignerView';

// Import utilities
import { getSampleVersionHistory, saveModel } from '@/utils/modelService';
import { ModelComponent } from '@/components/ai-studio/ModelDesigner';

const AIStudio = () => {
  const { toast } = useToast();
  const [modelName, setModelName] = useState("My Custom Model");
  const [modelVersion, setModelVersion] = useState("1.0.0");
  const [modelDescription, setModelDescription] = useState("");
  const [modelComponents, setModelComponents] = useState<ModelComponent[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleAddComponent = (componentType: string) => {
    const newComponent: ModelComponent = {
      id: `component-${Date.now()}`,
      type: componentType,
      name: `New ${componentType}`,
      position: { x: 200, y: 200 },
      connections: []
    };
    
    setModelComponents([...modelComponents, newComponent]);
    toast({
      title: "Component Added",
      description: `Added ${componentType} component to your model.`,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveModel({
        name: modelName,
        version: modelVersion,
        description: modelDescription,
        components: modelComponents,
      });
      
      toast({
        title: "Model Saved",
        description: "Your model has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "There was an error saving your model.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRun = () => {
    setIsRunning(true);
    
    // Simulate a training process
    setTimeout(() => {
      setIsRunning(false);
      toast({
        title: "Training Complete",
        description: `Model "${modelName}" has been trained successfully.`,
      });
    }, 2000);
  };

  return (
    <ProTierLayout pageTitle="AI Studio" requiredFeature="ai-studio">
      <div className="text-white space-y-6">
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
      </div>
    </ProTierLayout>
  );
};

export default AIStudio;
