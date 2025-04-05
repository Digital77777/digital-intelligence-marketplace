
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AIToolItem } from '@/data/ai-tools-tiers';

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
  // Early return if no tool selected
  if (!tool) {
    return null;
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] flex flex-col p-0">
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
          </div>
        </DialogHeader>
        <div className="flex-grow overflow-auto p-6">
          <div className="h-full flex flex-col items-center justify-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4 text-3xl">
              {tool.icon}
            </div>
            <h3 className="text-xl font-medium mb-2">Welcome to {tool.name}</h3>
            <p className="text-center text-muted-foreground max-w-md mb-6">
              {tool.description}
            </p>
            <div className="bg-muted/40 rounded-lg p-6 w-full max-w-2xl">
              <p className="text-center mb-4">Tool interface would appear here</p>
              <p className="text-sm text-muted-foreground text-center">
                This is a placeholder for the {tool.name} interface.
                In a production environment, this would be replaced with the actual tool UI.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ToolInterfaceModal;
