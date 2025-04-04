
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AIToolItem } from '@/data/ai-tools-tiers';
import ToolInterface from './ToolInterface';

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
  const handleBack = () => {
    onOpenChange(false);
  };

  if (!tool) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-xl w-[95%] max-h-[95vh] overflow-auto p-0 bg-black border border-[#00FFFF]/30">
        <ToolInterface tool={tool} onBack={handleBack} />
      </DialogContent>
    </Dialog>
  );
};

export default ToolInterfaceModal;
