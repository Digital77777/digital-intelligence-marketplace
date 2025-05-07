
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2, Server } from 'lucide-react';

interface ModelStatusAlertsProps {
  modelLoading: boolean;
  error: string | null;
  isOpenSourceModel: boolean;
  modelLoaded: boolean;
}

const ModelStatusAlerts: React.FC<ModelStatusAlertsProps> = ({
  modelLoading,
  error,
  isOpenSourceModel,
  modelLoaded
}) => {
  return (
    <>
      {modelLoading && (
        <Alert className="mb-4 bg-blue-50/50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
          <Loader2 className="h-4 w-4 text-blue-600 dark:text-blue-400 animate-spin" />
          <AlertDescription className="text-blue-800 dark:text-blue-300">
            Loading AI model... This may take a few moments.
          </AlertDescription>
        </Alert>
      )}
      
      {error && (
        <Alert className="mb-4" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {isOpenSourceModel && modelLoaded && (
        <Alert className="mb-4 bg-green-50/50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
          <Server className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-800 dark:text-green-300">
            Using open-source model running in your browser
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default ModelStatusAlerts;
