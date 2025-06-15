
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, GitBranch, Tag, Clock, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface VersionHistoryProps {
  modelId: string;
}

const VersionHistory: React.FC<VersionHistoryProps> = ({ modelId }) => {
  const { data: versions, isLoading } = useQuery({
    queryKey: ['model-versions', modelId],
    queryFn: async () => {
      // For now, we'll simulate version history since we have one model table
      // In a real implementation, you might have a separate versions table
      const { data, error } = await supabase
        .from('ai_models')
        .select('*')
        .eq('id', modelId)
        .single();
      
      if (error) throw error;
      
      // Simulate version history
      return [
        {
          id: `${data.id}-v3`,
          version: '1.2.0',
          name: `${data.name} v1.2.0`,
          status: 'deployed',
          accuracy: 0.94,
          created_at: new Date().toISOString(),
          changes: ['Improved accuracy by 2%', 'Added dropout layers', 'Optimized inference speed'],
          is_current: true
        },
        {
          id: `${data.id}-v2`,
          version: '1.1.0',
          name: `${data.name} v1.1.0`,
          status: 'archived',
          accuracy: 0.92,
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          changes: ['Fixed overfitting issues', 'Updated training data', 'Reduced model size'],
          is_current: false
        },
        {
          id: `${data.id}-v1`,
          version: '1.0.0',
          name: `${data.name} v1.0.0`,
          status: 'archived',
          accuracy: 0.89,
          created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          changes: ['Initial model release', 'Base architecture implemented'],
          is_current: false
        }
      ];
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed':
        return 'default';
      case 'trained':
        return 'secondary';
      case 'archived':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Version History
          </CardTitle>
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
          <History className="h-5 w-5" />
          Version History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {versions?.map((version, index) => (
            <div key={version.id} className="relative">
              {/* Timeline line */}
              {index < versions.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
              )}
              
              <div className="flex gap-4">
                {/* Timeline dot */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                  version.is_current 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 bg-gray-50'
                }`}>
                  {version.is_current ? (
                    <Tag className="h-5 w-5 text-blue-500" />
                  ) : (
                    <GitBranch className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                
                {/* Version content */}
                <div className="flex-1 min-w-0">
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{version.name}</h3>
                        <Badge variant={getStatusColor(version.status) as any}>
                          {version.status}
                        </Badge>
                        {version.is_current && (
                          <Badge variant="default">Current</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {!version.is_current && (
                          <Button variant="outline" size="sm">
                            Restore
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Version:</span>
                        <span className="ml-2 font-medium">{version.version}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Accuracy:</span>
                        <span className="ml-2 font-medium">
                          {(version.accuracy * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-500">
                          {new Date(version.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Changes:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {version.changes.map((change, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <ArrowRight className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <Button variant="outline" className="w-full">
            <GitBranch className="h-4 w-4 mr-2" />
            Create New Version
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VersionHistory;
