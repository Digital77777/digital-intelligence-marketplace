
import React from 'react';
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AIToolItem } from '@/data/ai-tools-tiers';
import APIConnectionForm from './APIConnectionForm';
import AIToolInterface from './AIToolInterface';
import ConnectionSection from './components/ConnectionSection';

type ConnectionDetails = {
    apiKey: string;
    modelProvider: 'open-source' | 'api' | 'hybrid' | 'platform';
    useLocalModels: boolean;
};

interface StandardToolInterfaceProps {
    tool: AIToolItem;
    onOpenChange: (open: boolean) => void;
    connectionDetails: ConnectionDetails | null;
    showConnectionForm: boolean;
    handleConnectApi: () => void;
    handleUpdateConfig: () => void;
    onApiConnectionSuccess: () => void;
    onCancelConnectionForm: () => void;
    handleQuickStart: () => void;
}

const StandardToolInterface: React.FC<StandardToolInterfaceProps> = ({
    tool,
    onOpenChange,
    connectionDetails,
    showConnectionForm,
    handleConnectApi,
    handleUpdateConfig,
    onApiConnectionSuccess,
    onCancelConnectionForm,
    handleQuickStart
}) => {
    return (
        <>
            <DialogHeader className="p-6 border-b">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <DialogTitle className="text-lg font-medium">
                            {tool.name}
                        </DialogTitle>
                    </div>
                    
                    <ConnectionSection 
                        connectionDetails={connectionDetails}
                        showConnectionForm={showConnectionForm}
                        handleConnectApi={handleConnectApi}
                        handleUpdateConfig={handleUpdateConfig}
                    />
                </div>
            </DialogHeader>
            
            <div className="flex-grow overflow-auto p-6">
                {showConnectionForm ? (
                    <APIConnectionForm 
                        tool={tool}
                        onSuccess={onApiConnectionSuccess}
                        onCancel={onCancelConnectionForm}
                    />
                ) : (
                    connectionDetails ? (
                        <AIToolInterface 
                            tool={tool} 
                            connectionDetails={connectionDetails}
                        />
                    ) : (
                        <div className="text-center py-4">
                            <p>Initializing tool...</p>
                            <Button 
                                variant="default" 
                                className="mt-2"
                                onClick={handleQuickStart}
                            >
                                Quick Start
                            </Button>
                        </div>
                    )
                )}
            </div>
        </>
    );
};

export default StandardToolInterface;
