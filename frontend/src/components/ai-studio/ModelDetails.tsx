
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Play, 
  Globe, 
  Download, 
  BarChart3, 
  FileText,
  Code,
  Activity
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useDeployModel } from '@/hooks/useModelState';
import { useToast } from '@/hooks/use-toast';

interface ModelDetailsProps {
  modelId: string;
}

const ModelDetails: React.FC<ModelDetailsProps> = ({ modelId }) => {
  const { toast } = useToast();
  const deployModel = useDeployModel();

  const { data: model, isLoading } = useQuery({
    queryKey: ['model', modelId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_models')
        .select('*')
        .eq('id', modelId)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  const { data: metrics } = useQuery({
    queryKey: ['model-metrics', modelId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('model_metrics')
        .select('*')
        .eq('model_id', modelId)
        .order('timestamp', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const handleDeploy = async () => {
    try {
      await deployModel.mutateAsync(modelId);
      toast({
        title: "Deployment Started",
        description: "Your model is being deployed. This may take a few minutes."
      });
    } catch (error) {
      toast({
        title: "Deployment Failed",
        description: "Failed to deploy model. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!model) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">Model not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              {model.name}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">{model.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">v{model.version}</Badge>
            <Badge>{model.status}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Model Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span>{model.model_type.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <Badge variant="outline">{model.status}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Created:</span>
                      <span>{new Date(model.created_at).toLocaleDateString()}</span>
                    </div>
                    {model.trained_at && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Trained:</span>
                        <span>{new Date(model.trained_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {model.metrics && Object.keys(model.metrics).length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Performance Metrics</h3>
                    <div className="space-y-2 text-sm">
                      {Object.entries(model.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-500">{key}:</span>
                          <span className="font-medium">
                            {typeof value === 'number' ? 
                              (key.includes('accuracy') ? `${(value * 100).toFixed(1)}%` : value.toFixed(4))
                              : String(value)
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Actions</h3>
                  <div className="space-y-2">
                    {model.status === 'trained' && (
                      <Button 
                        onClick={handleDeploy} 
                        disabled={deployModel.isPending}
                        className="w-full"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Deploy Model
                      </Button>
                    )}
                    {model.artifact_url && (
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Model
                      </Button>
                    )}
                    <Button variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      View Logs
                    </Button>
                  </div>
                </div>

                {model.hyperparameters && Object.keys(model.hyperparameters).length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Hyperparameters</h3>
                    <div className="space-y-1 text-sm">
                      {Object.entries(model.hyperparameters).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-500">{key.replace('_', ' ')}:</span>
                          <span className="font-mono">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-4 w-4" />
              <span className="font-medium">Training Metrics</span>
            </div>
            
            {metrics && metrics.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['accuracy', 'loss', 'val_accuracy'].map((metricType) => {
                    const metricData = metrics.filter(m => m.metric_type === metricType);
                    const latestValue = metricData[0]?.metric_value;
                    
                    return (
                      <Card key={metricType}>
                        <CardContent className="p-4">
                          <div className="text-sm text-gray-500 mb-1">
                            {metricType.replace('_', ' ').replace('val', 'validation')}
                          </div>
                          <div className="text-2xl font-bold">
                            {latestValue ? 
                              (metricType.includes('accuracy') ? 
                                `${(latestValue * 100).toFixed(1)}%` : 
                                latestValue.toFixed(4)
                              ) : 
                              'N/A'
                            }
                          </div>
                          <div className="text-xs text-gray-500">
                            {metricData.length} data points
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                
                <div className="text-center py-8 text-gray-500">
                  <Activity className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>Metrics visualization would be displayed here</p>
                  <p className="text-sm">Charts showing training progress over time</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No training metrics available
              </div>
            )}
          </TabsContent>

          <TabsContent value="config" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Model Configuration</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    {JSON.stringify(model.config, null, 2)}
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Hyperparameters</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    {JSON.stringify(model.hyperparameters, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Code className="h-4 w-4" />
              <span className="font-medium">API Integration</span>
            </div>
            
            {model.status === 'deployed' ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Endpoint URL</h3>
                  <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm">
                    https://api.aistudio.com/models/{model.id}/predict
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Example Request</h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
{`curl -X POST https://api.aistudio.com/models/${model.id}/predict \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "input": "your input data here"
  }'`}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Globe className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>Model needs to be deployed to access API</p>
                <p className="text-sm">Deploy your model to get API access</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ModelDetails;
