
import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Play, Pause, Square, AlertCircle, CheckCircle } from 'lucide-react';
import { useTrainingJobs } from '@/hooks/useModelState';
import { supabase } from '@/integrations/supabase/client';

const TrainingQueue: React.FC = () => {
  const { data: trainingJobs, isLoading } = useTrainingJobs();

  // Set up real-time updates for training jobs
  useEffect(() => {
    const channel = supabase
      .channel('training-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'training_jobs'
        },
        (payload) => {
          console.log('Training job update:', payload);
          // The useQuery will automatically refetch due to real-time updates
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'running':
        return <Play className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4" />;
      case 'cancelled':
        return <Square className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'running':
        return 'default';
      case 'completed':
        return 'default';
      case 'failed':
        return 'destructive';
      case 'cancelled':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Training Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded"></div>
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
          <Play className="h-5 w-5" />
          Training Queue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trainingJobs?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No training jobs in queue
            </div>
          ) : (
            trainingJobs?.map((job) => (
              <div key={job.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(job.status)}
                    <span className="font-medium">{job.ai_models.name}</span>
                    <Badge variant={getStatusColor(job.status) as any}>
                      {job.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {job.status === 'running' && (
                      <Button variant="outline" size="sm">
                        <Pause className="h-4 w-4" />
                      </Button>
                    )}
                    {(job.status === 'pending' || job.status === 'running') && (
                      <Button variant="outline" size="sm">
                        <Square className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                {job.status === 'running' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{job.progress_percentage}%</span>
                    </div>
                    <Progress value={job.progress_percentage} />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Epoch {job.current_epoch}/{job.total_epochs}</span>
                      {job.metrics?.accuracy && (
                        <span>Accuracy: {(job.metrics.accuracy * 100).toFixed(1)}%</span>
                      )}
                    </div>
                  </div>
                )}
                
                {job.status === 'completed' && job.metrics && (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {job.metrics.accuracy && (
                      <div>
                        <span className="text-gray-500">Final Accuracy:</span>
                        <span className="ml-2 font-medium">
                          {(job.metrics.accuracy * 100).toFixed(1)}%
                        </span>
                      </div>
                    )}
                    {job.metrics.loss && (
                      <div>
                        <span className="text-gray-500">Final Loss:</span>
                        <span className="ml-2 font-medium">
                          {job.metrics.loss.toFixed(4)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                
                {job.status === 'failed' && job.error_message && (
                  <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                    Error: {job.error_message}
                  </div>
                )}
                
                <div className="text-xs text-gray-500">
                  Created: {new Date(job.created_at).toLocaleString()}
                  {job.completed_at && (
                    <span className="ml-4">
                      Completed: {new Date(job.completed_at).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingQueue;
