
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AIToolItem } from '@/data/ai-tools-tiers';
import { useToolConnection } from './hooks/useToolConnection';
import CustomInterfaceRenderer, { CUSTOM_INTERFACES } from './CustomInterfaceRenderer';
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
  if (!tool) {
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
