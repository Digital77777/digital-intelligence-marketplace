
import React from 'react';
import { Button } from '@/components/ui/button';
import { Key, Server } from 'lucide-react';

interface ConnectionSectionProps {
  connectionDetails: {
    apiKey: string;
    modelProvider: 'open-source' | 'api' | 'hybrid';
    useLocalModels: boolean;
  } | null;
  showConnectionForm: boolean;
  handleConnectApi: () => void;
  handleUpdateConfig: () => void;
}

const ConnectionSection: React.FC<ConnectionSectionProps> = ({
  connectionDetails,
  showConnectionForm,
  handleConnectApi,
  handleUpdateConfig
}) => {
  if (connectionDetails) {
    return (
      <div className="flex items-center gap-2">
        {connectionDetails.modelProvider === 'open-source' ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleUpdateConfig}
            className="bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40"
          >
            <Server className="h-3.5 w-3.5 mr-1.5" />
            Open Source
          </Button>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleUpdateConfig}
            className="bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40"
          >
            <Key className="h-3.5 w-3.5 mr-1.5" />
            Update Config
          </Button>
        )}
      </div>
    );
  }
  
  return (
    !showConnectionForm && (
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleConnectApi}
        className="bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40"
      >
        <Key className="h-3.5 w-3.5 mr-1.5" />
        Connect API
      </Button>
    )
  );
};

export default ConnectionSection;
