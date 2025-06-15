
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Wand2, 
  Settings, 
  Database, 
  Play, 
  FileText, 
  Image, 
  BarChart3, 
  Target, 
  Brain 
} from 'lucide-react';
import { useModels, useDatasets, useCreateModel, useStartTraining } from '@/hooks/useModelState';
import { useToast } from '@/hooks/use-toast';

const EnhancedModelDesigner: React.FC = () => {
  const { data: models } = useModels();
  const { data: datasets } = useDatasets();
  const createModel = useCreateModel();
  const startTraining = useStartTraining();
  const { toast } = useToast();

  const [modelForm, setModelForm] = useState({
    name: '',
    description: '',
    model_type: '',
    template_id: '',
    hyperparameters: {
      epochs: 10,
      learning_rate: 0.001,
      batch_size: 32,
      validation_split: 0.2
    }
  });

  const [selectedDataset, setSelectedDataset] = useState('');

  const modelTemplates = [
    {
      id: 'text-basic',
      name: 'Text Classification Basic',
      description: 'BERT-based text classification',
      type: 'text_classification',
      icon: <FileText className="h-4 w-4" />
    },
    {
      id: 'image-cnn',
      name: 'Image Classification CNN',
      description: 'ResNet50 for image classification',
      type: 'image_classification',
      icon: <Image className="h-4 w-4" />
    },
    {
      id: 'object-yolo',
      name: 'Object Detection YOLO',
      description: 'YOLOv8 for object detection',
      type: 'object_detection',
      icon: <Target className="h-4 w-4" />
    },
    {
      id: 'regression-linear',
      name: 'Regression Model',
      description: 'Linear regression for predictions',
      type: 'regression',
      icon: <BarChart3 className="h-4 w-4" />
    }
  ];

  const handleTemplateSelect = (template: any) => {
    setModelForm(prev => ({
      ...prev,
      model_type: template.type,
      template_id: template.id,
      hyperparameters: {
        ...prev.hyperparameters,
        ...(template.type === 'image_classification' && { batch_size: 16, epochs: 20 }),
        ...(template.type === 'object_detection' && { batch_size: 8, epochs: 50 }),
        ...(template.type === 'regression' && { batch_size: 64, epochs: 100 })
      }
    }));
  };

  const handleCreateAndTrain = async () => {
    if (!modelForm.name || !modelForm.model_type) {
      toast({
        title: "Missing Information",
        description: "Please fill in model name and select a template.",
        variant: "destructive"
      });
      return;
    }

    try {
      const model = await createModel.mutateAsync({
        name: modelForm.name,
        description: modelForm.description,
        model_type: modelForm.model_type as any,
        template_id: modelForm.template_id,
        hyperparameters: modelForm.hyperparameters,
        status: 'draft'
      });

      if (selectedDataset) {
        await startTraining.mutateAsync({
          modelId: model.id,
          datasetId: selectedDataset
        });

        toast({
          title: "Training Started",
          description: "Your model has been created and training has begun."
        });
      } else {
        toast({
          title: "Model Created",
          description: "Your model has been created. You can start training when ready."
        });
      }

      // Reset form
      setModelForm({
        name: '',
        description: '',
        model_type: '',
        template_id: '',
        hyperparameters: {
          epochs: 10,
          learning_rate: 0.001,
          batch_size: 32,
          validation_split: 0.2
        }
      });
      setSelectedDataset('');
    } catch (error) {
      console.error('Model creation error:', error);
      toast({
        title: "Creation Failed",
        description: "Failed to create model. Please try again.",
        variant: "destructive"
      });
    }
  };

  const compatibleDatasets = datasets?.filter(d => d.dataset_type === modelForm.model_type);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5" />
          Enhanced Model Designer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="template" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="template">Template</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="dataset">Dataset</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
          </TabsList>

          <TabsContent value="template" className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">
              Choose a pre-configured template to get started quickly
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modelTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    modelForm.template_id === template.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'hover:border-gray-300'
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {template.icon}
                    <h3 className="font-medium">{template.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{template.description}</p>
                  <Badge variant="outline" className="mt-2">
                    {template.type.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="config" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="model-name">Model Name</Label>
                <Input
                  id="model-name"
                  value={modelForm.name}
                  onChange={(e) => setModelForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="My Custom Model"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model-version">Version</Label>
                <Input
                  id="model-version"
                  defaultValue="1.0.0"
                  placeholder="1.0.0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model-description">Description</Label>
              <Textarea
                id="model-description"
                value={modelForm.description}
                onChange={(e) => setModelForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your model..."
              />
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Hyperparameters
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="epochs">Epochs</Label>
                  <Input
                    id="epochs"
                    type="number"
                    value={modelForm.hyperparameters.epochs}
                    onChange={(e) => setModelForm(prev => ({
                      ...prev,
                      hyperparameters: { ...prev.hyperparameters, epochs: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="learning-rate">Learning Rate</Label>
                  <Input
                    id="learning-rate"
                    type="number"
                    step="0.0001"
                    value={modelForm.hyperparameters.learning_rate}
                    onChange={(e) => setModelForm(prev => ({
                      ...prev,
                      hyperparameters: { ...prev.hyperparameters, learning_rate: parseFloat(e.target.value) }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batch-size">Batch Size</Label>
                  <Input
                    id="batch-size"
                    type="number"
                    value={modelForm.hyperparameters.batch_size}
                    onChange={(e) => setModelForm(prev => ({
                      ...prev,
                      hyperparameters: { ...prev.hyperparameters, batch_size: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validation-split">Validation Split</Label>
                  <Input
                    id="validation-split"
                    type="number"
                    step="0.1"
                    value={modelForm.hyperparameters.validation_split}
                    onChange={(e) => setModelForm(prev => ({
                      ...prev,
                      hyperparameters: { ...prev.hyperparameters, validation_split: parseFloat(e.target.value) }
                    }))}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dataset" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-4 w-4" />
              <span className="text-sm text-gray-600">
                Select a dataset for training
                {modelForm.model_type && ` (${modelForm.model_type.replace('_', ' ')} only)`}
              </span>
            </div>
            
            {!modelForm.model_type ? (
              <div className="text-center py-8 text-gray-500">
                Please select a model template first
              </div>
            ) : compatibleDatasets?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No compatible datasets found. Please upload a {modelForm.model_type.replace('_', ' ')} dataset.
              </div>
            ) : (
              <div className="space-y-3">
                {compatibleDatasets?.map((dataset) => (
                  <div
                    key={dataset.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedDataset === dataset.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedDataset(dataset.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{dataset.name}</h4>
                        <p className="text-sm text-gray-500">{dataset.description}</p>
                      </div>
                      <Badge variant="outline">
                        {(dataset.file_size && dataset.file_size / (1024*1024)).toFixed(1)} MB
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="review" className="space-y-4">
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Model Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Name:</span>
                  <span className="ml-2 font-medium">{modelForm.name || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-gray-500">Type:</span>
                  <span className="ml-2 font-medium">
                    {modelForm.model_type.replace('_', ' ') || 'Not selected'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Template:</span>
                  <span className="ml-2 font-medium">
                    {modelTemplates.find(t => t.id === modelForm.template_id)?.name || 'Not selected'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Dataset:</span>
                  <span className="ml-2 font-medium">
                    {compatibleDatasets?.find(d => d.id === selectedDataset)?.name || 'None selected'}
                  </span>
                </div>
              </div>
              
              <div>
                <span className="text-gray-500">Hyperparameters:</span>
                <div className="mt-2 text-sm bg-gray-50 p-2 rounded">
                  {Object.entries(modelForm.hyperparameters).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span>{key.replace('_', ' ')}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button 
              onClick={handleCreateAndTrain}
              disabled={createModel.isPending || startTraining.isPending}
              className="w-full"
            >
              <Play className="h-4 w-4 mr-2" />
              {selectedDataset ? 'Create Model & Start Training' : 'Create Model'}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnhancedModelDesigner;
