
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import TrainingQueue from './TrainingQueue';
import DeploymentDashboard from './DeploymentDashboard';
import DatasetManager from './DatasetManager';
import EnhancedModelDesigner from './EnhancedModelDesigner';
import ModelDetails from './ModelDetails';
import VersionHistory from './VersionHistory';
import { 
  Wand2, 
  Database, 
  Play, 
  Globe, 
  BarChart3, 
  History,
  Plus,
  Settings
} from 'lucide-react';
import { useModels } from '@/hooks/useModelState';

const PipelineDesignerView: React.FC = () => {
  const { data: models, isLoading } = useModels();
  const [activeTab, setActiveTab] = useState('designer');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'secondary';
      case 'training':
        return 'default';
      case 'trained':
        return 'default';
      case 'deployed':
        return 'default';
      case 'failed':
        return 'destructive';
      case 'archived':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'training':
        return <Play className="h-3 w-3 animate-pulse" />;
      case 'deployed':
        return <Globe className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Studio</h1>
          <p className="text-gray-600">Build, train, and deploy AI models</p>
        </div>
        <Button onClick={() => setActiveTab('designer')}>
          <Plus className="h-4 w-4 mr-2" />
          New Model
        </Button>
      </div>

      {/* Model Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Models</p>
                <p className="text-2xl font-bold">{models?.length || 0}</p>
              </div>
              <Wand2 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Training</p>
                <p className="text-2xl font-bold">
                  {models?.filter(m => m.status === 'training').length || 0}
                </p>
              </div>
              <Play className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Deployed</p>
                <p className="text-2xl font-bold">
                  {models?.filter(m => m.status === 'deployed').length || 0}
                </p>
              </div>
              <Globe className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Accuracy</p>
                <p className="text-2xl font-bold">94.2%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Models Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Models</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-16 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : models?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Wand2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No models yet</p>
                  <p className="text-sm">Create your first AI model</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {models?.map((model) => (
                    <div
                      key={model.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedModel === model.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedModel(model.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium truncate">{model.name}</h4>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(model.status)}
                          <Badge variant={getStatusColor(model.status) as any} className="text-xs">
                            {model.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        <div>{model.model_type.replace('_', ' ')}</div>
                        <div>v{model.version}</div>
                      </div>
                      {model.metrics?.accuracy && (
                        <div className="text-xs text-green-600 mt-1">
                          Accuracy: {(model.metrics.accuracy * 100).toFixed(1)}%
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Panel */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="designer" className="text-xs">
                <Wand2 className="h-4 w-4 mr-1" />
                Designer
              </TabsTrigger>
              <TabsTrigger value="training" className="text-xs">
                <Play className="h-4 w-4 mr-1" />
                Training
              </TabsTrigger>
              <TabsTrigger value="deployment" className="text-xs">
                <Globe className="h-4 w-4 mr-1" />
                Deploy
              </TabsTrigger>
              <TabsTrigger value="datasets" className="text-xs">
                <Database className="h-4 w-4 mr-1" />
                Data
              </TabsTrigger>
              <TabsTrigger value="details" className="text-xs" disabled={!selectedModel}>
                <Settings className="h-4 w-4 mr-1" />
                Details
              </TabsTrigger>
              <TabsTrigger value="history" className="text-xs" disabled={!selectedModel}>
                <History className="h-4 w-4 mr-1" />
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="designer" className="mt-4">
              <EnhancedModelDesigner />
            </TabsContent>

            <TabsContent value="training" className="mt-4">
              <TrainingQueue />
            </TabsContent>

            <TabsContent value="deployment" className="mt-4">
              <DeploymentDashboard />
            </TabsContent>

            <TabsContent value="datasets" className="mt-4">
              <DatasetManager />
            </TabsContent>

            <TabsContent value="details" className="mt-4">
              {selectedModel && <ModelDetails modelId={selectedModel} />}
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              {selectedModel && <VersionHistory modelId={selectedModel} />}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PipelineDesignerView;
