
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { AIToolItem } from '@/data/ai-tools-tiers';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTier } from '@/context/TierContext';
import { toast } from 'sonner';
import { Loader2, Rocket, Lock } from 'lucide-react';

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
  const [loading, setLoading] = useState(false);
  const [launched, setLaunched] = useState(false);
  
  if (!tool) {
    return null;
  }
  
  // Check if user can access this tool based on tier
  // Updated access logic to match AIToolCard component
  const canAccessTool = () => {
    switch (tool.tier) {
      case 'freemium': 
        return true; // All users can access freemium tools
      case 'basic': 
        return currentTier === 'basic' || currentTier === 'pro';
      case 'pro': 
        return currentTier === 'pro';
      default:
        return false;
    }
  };
  
  const handleLaunchTool = () => {
    if (!canAccessTool()) {
      upgradePrompt(tool.tier);
      return;
    }
    
    setLoading(true);
    
    // Simulate launching the tool
    setTimeout(() => {
      setLaunched(true);
      setLoading(false);
      toast.success(`${tool.name} launched successfully`, {
        description: "You can now use this tool's functionality"
      });
    }, 1500);
  };
  
  const getTierLabel = () => {
    switch (tool.tier) {
      case 'freemium': return 'Freemium';
      case 'basic': return 'Basic Tier';
      case 'pro': return 'Pro Tier';
      default: return 'Unknown Tier';
    }
  };
  
  const getTierColor = () => {
    switch (tool.tier) {
      case 'freemium': return 'bg-amber-50 text-amber-800 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800';
      case 'basic': return 'bg-blue-50 text-blue-800 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800';
      case 'pro': return 'bg-purple-50 text-purple-800 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800';
      default: return '';
    }
  };
  
  const renderToolInterface = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p>Launching {tool.name}...</p>
        </div>
      );
    }
    
    if (launched) {
      return (
        <div className="p-4 border rounded-lg bg-muted/30 min-h-[300px]">
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <Rocket className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{tool.name} is running</h3>
            <p className="text-muted-foreground mb-4">
              This is a placeholder for the tool's actual interface. In a real implementation, 
              tool-specific functionality would be rendered here.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full max-w-md">
              {tool.use_cases?.map((useCase, index) => (
                <Badge key={index} variant="outline" className="justify-center">
                  {useCase}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="p-4 border rounded-lg bg-muted/30 flex flex-col items-center justify-center min-h-[250px]">
        <div className="text-center max-w-md">
          {!canAccessTool() ? (
            <>
              <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tool Requires {getTierLabel()}</h3>
              <p className="text-muted-foreground mb-4">
                This tool requires a higher subscription tier. Please upgrade to access this tool.
              </p>
              <Button 
                onClick={() => upgradePrompt(tool.tier)}
                className="mx-auto"
              >
                Upgrade Now
              </Button>
            </>
          ) : (
            <>
              <Rocket className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ready to Launch</h3>
              <p className="text-muted-foreground mb-4">
                Click the button below to launch {tool.name} and start using its features.
              </p>
              <Button onClick={handleLaunchTool} className="mx-auto">
                Launch Tool
              </Button>
            </>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{tool?.name}</DialogTitle>
              <DialogDescription className="mt-1.5 text-sm">{tool?.description}</DialogDescription>
            </div>
            <Badge className={`${getTierColor()} ml-2`}>
              {getTierLabel()}
            </Badge>
          </div>
        </DialogHeader>
        
        {renderToolInterface()}
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <div className="text-xs text-muted-foreground sm:mr-auto">
            Category: {tool.category}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ToolInterfaceModal;
