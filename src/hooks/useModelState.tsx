
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { saveModel } from '@/utils/modelService';
import { ModelComponent } from '@/components/ai-studio/ModelDesigner';

const useModelState = () => {
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

  return {
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
  };
};

export default useModelState;
