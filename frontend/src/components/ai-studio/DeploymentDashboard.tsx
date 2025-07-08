
import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  Play, 
  Square, 
  BarChart3, 
  Settings, 
  ExternalLink,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { useDeployments } from '@/hooks/useModelState';
import { supabase } from '@/integrations/supabase/client';

const DeploymentDashboard: React.FC = () => {
  const { data: deployments, isLoading } = useDeployments();

  // Set up real-time updates for deployments
  useEffect(() => {
    const channel = supabase
      .channel('deployment-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'deployments'
        },
        (payload) => {
          console.log('Deployment update:', payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deploying':
        return 'secondary';
      case 'deployed':
        return 'default';
      case 'failed':
        return 'destructive';
      case 'stopped':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deploying':
        return <Settings className="h-4 w-4 animate-spin" />;
      case 'deployed':
        return <Play className="h-4 w-4" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4" />;
      case 'stopped':
        return <Square className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Deployment Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Deployment Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {deployments?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No deployed models
              </div>
            ) : (
              deployments?.map((deployment) => (
                <div key={deployment.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(deployment.status)}
                      <div>
                        <h3 className="font-medium">{deployment.ai_models.name}</h3>
                        <p className="text-sm text-gray-500">
                          Version {deployment.ai_models.version}
                        </p>
                      </div>
                      <Badge variant={getStatusColor(deployment.status) as any}>
                        {deployment.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {deployment.endpoint_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={deployment.endpoint_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {deployment.status === 'deployed' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="text-sm text-gray-500">Endpoint</div>
                        <div className="font-mono text-sm truncate">
                          {deployment.endpoint_url}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="text-sm text-gray-500">Requests/min</div>
                        <div className="text-lg font-semibold">
                          {deployment.usage_stats?.requests_per_minute || 0}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="text-sm text-gray-500">Uptime</div>
                        <div className="text-lg font-semibold">
                          {deployment.health_status?.uptime || '99.9%'}
                        </div>
                      </div>
                    </div>
                  )}

                  {deployment.resource_config && (
                    <div className="text-sm text-gray-600">
                      Resources: {deployment.resource_config.cpu} CPU, {deployment.resource_config.memory} RAM
                      {deployment.resource_config.replicas && 
                        ` • ${deployment.resource_config.replicas} replicas`
                      }
                    </div>
                  )}

                  <div className="text-xs text-gray-500">
                    Deployed: {deployment.deployed_at 
                      ? new Date(deployment.deployed_at).toLocaleString()
                      : 'Not deployed'
                    }
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Avg Response Time</span>
                      <span className="font-medium">245ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Success Rate</span>
                      <span className="font-medium">99.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Error Rate</span>
                      <span className="font-medium">0.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Usage Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Requests</span>
                      <span className="font-medium">12,547</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Daily Average</span>
                      <span className="font-medium">423</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Peak RPM</span>
                      <span className="font-medium">89</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Deployment Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600">
                  Configure scaling, resource limits, and other deployment settings.
                </div>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DeploymentDashboard;
