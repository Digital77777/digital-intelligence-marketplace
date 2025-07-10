
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AIToolItem } from '@/data/ai-tools-tiers';
import { useTier } from '@/context/TierContext';
import { useToolConnection } from './hooks/useToolConnection';
import { CUSTOM_INTERFACES } from './customInterfaces';
import CustomInterfaceRenderer from './CustomInterfaceRenderer';
import StandardToolInterface from './StandardToolInterface';

interface ToolInterfaceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tool: AIToolItem | null;
}

const ToolInterfaceModal: React.FC<ToolInterfaceModalProps> = ({
  open,
  onOpenChange,
  tool
}) => {
  const { currentTier, upgradePrompt } = useTier();

  if (!tool) {
    return null;
  }

  // Fixed tier access logic - hierarchical access
  const hasAccess = (
    !!tool.externalUrl || // External tools are always accessible
    (tool.tier === 'freemium') || // Freemium tools available to all
    (tool.tier === 'basic' && (currentTier === 'basic' || currentTier === 'pro')) || // Basic tools for basic+ users
    (tool.tier === 'pro' && currentTier === 'pro') // Pro tools only for pro users
  );

  // If user doesn't have access, trigger upgrade prompt and close modal
  React.useEffect(() => {
    if (open && !hasAccess) {
      upgradePrompt(tool.tier);
      onOpenChange(false);
    }
  }, [open, hasAccess, tool.tier, upgradePrompt, onOpenChange]);

  // Don't render if user doesn't have access
  if (!hasAccess) {
    return null;
  }

  const {
    showConnectionForm,
    connectionDetails,
    handleConnectApi,
    handleQuickStart,
    handleApiConnectionSuccess,
    handleUpdateConfig,
    setShowConnectionForm
  } = useToolConnection(tool, open);

  const hasCustomInterface = CUSTOM_INTERFACES.includes(tool.name);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] flex flex-col p-0">
        {hasCustomInterface ? (
          <div className="flex-grow overflow-auto">
            <CustomInterfaceRenderer tool={tool} onOpenChange={onOpenChange} />
          </div>
        ) : (
          <StandardToolInterface
            tool={tool}
            onOpenChange={onOpenChange}
            connectionDetails={connectionDetails}
            showConnectionForm={showConnectionForm}
            handleConnectApi={handleConnectApi}
            handleUpdateConfig={handleUpdateConfig}
            onApiConnectionSuccess={handleApiConnectionSuccess}
            onCancelConnectionForm={() => setShowConnectionForm(false)}
            handleQuickStart={handleQuickStart}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ToolInterfaceModal;
