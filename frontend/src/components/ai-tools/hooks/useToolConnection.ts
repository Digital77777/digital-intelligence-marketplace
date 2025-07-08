
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import apiConnectionManager from '@/utils/apiConnectionManager';
import { AIToolItem } from '@/data/ai-tools-tiers';

type ConnectionDetails = {
    apiKey: string;
    modelProvider: 'open-source' | 'api' | 'hybrid' | 'platform';
    useLocalModels: boolean;
};

export function useToolConnection(tool: AIToolItem | null, open: boolean) {
    const [showConnectionForm, setShowConnectionForm] = useState(false);
    const [connectionDetails, setConnectionDetails] = useState<ConnectionDetails | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (open && tool) {
            const connection = apiConnectionManager.getConnection(tool.id);
            setConnectionDetails({
                apiKey: connection.apiKey,
                modelProvider: connection.modelProvider,
                useLocalModels: connection.useLocalModels
            });
        }
    }, [open, tool]);

    const handleQuickStart = () => {
        if (!tool) return;
        apiConnectionManager.storeConnection(
            tool.id,
            apiConnectionManager.getPlatformAPIKey(tool.id),
            undefined,
            'platform',
            false
        );
        const connection = apiConnectionManager.getConnection(tool.id);
        setConnectionDetails({
            apiKey: connection.apiKey,
            modelProvider: connection.modelProvider,
            useLocalModels: connection.useLocalModels
        });
        toast({
            title: "Ready to Use",
            description: `${tool.name} is now set up with our platform API. No configuration needed.`,
        });
    };

    const handleApiConnectionSuccess = () => {
        if (!tool) return;
        setShowConnectionForm(false);
        const connection = apiConnectionManager.getConnection(tool.id);
        if (connection) {
            setConnectionDetails({
                apiKey: connection.apiKey,
                modelProvider: connection.modelProvider,
                useLocalModels: connection.useLocalModels
            });
        }
        toast({
            title: "Connection Successful",
            description: `Successfully connected to ${tool.name}${connection?.modelProvider === 'open-source' ? ' with open-source models' : ''}${connection?.modelProvider === 'platform' ? ' with platform API' : ''}.`,
        });
    };
    
    useEffect(() => {
        if (open && tool && !connectionDetails) {
            handleQuickStart();
        }
    }, [open, tool, connectionDetails]);


    const handleConnectApi = () => setShowConnectionForm(true);
    const handleUpdateConfig = () => setShowConnectionForm(true);

    return {
        showConnectionForm,
        connectionDetails,
        handleConnectApi,
        handleQuickStart,
        handleApiConnectionSuccess,
        handleUpdateConfig,
        setShowConnectionForm
    };
}
