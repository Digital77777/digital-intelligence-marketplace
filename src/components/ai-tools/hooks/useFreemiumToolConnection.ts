
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AIToolItem } from '@/data/ai-tools-tiers';
import openSourceApiManager from '@/utils/openSourceApiManager';

export function useFreemiumToolConnection(tool: AIToolItem | null, open: boolean) {
    const [showSetupForm, setShowSetupForm] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        if (open && tool && tool.tier === 'freemium') {
            const hasConnection = openSourceApiManager.hasApiKey(tool.id);
            const config = openSourceApiManager.getConfig(tool.id);
            
            // Auto-ready for local tools or tools with API keys
            if (config?.provider === 'local' || hasConnection) {
                setIsReady(true);
                setShowSetupForm(false);
            } else {
                setIsReady(false);
                setShowSetupForm(true);
            }
        }
    }, [open, tool]);

    const handleSetupSuccess = () => {
        setShowSetupForm(false);
        setIsReady(true);
        toast({
            title: "Setup Complete",
            description: `${tool?.name} is now ready to use!`,
        });
    };

    const handleShowSetup = () => {
        setShowSetupForm(true);
    };

    const processInput = async (input: string): Promise<{ success: boolean; result: string; error?: string }> => {
        if (!tool) {
            return { success: false, result: '', error: 'No tool selected' };
        }

        try {
            const result = await openSourceApiManager.callApi(tool.id, input);
            return result;
        } catch (error) {
            console.error('Processing failed:', error);
            return { 
                success: false, 
                result: '', 
                error: error instanceof Error ? error.message : 'Processing failed' 
            };
        }
    };

    return {
        showSetupForm,
        isReady,
        handleSetupSuccess,
        handleShowSetup,
        processInput,
        setShowSetupForm
    };
}
