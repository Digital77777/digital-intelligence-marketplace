
import React, { useState, useCallback, useEffect } from 'react';
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
import { Loader2, Rocket, Lock, Info, Package, Grid3X3, Code, ExternalLink } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

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
  const [activeTab, setActiveTab] = useState('overview');
  const isMobile = useIsMobile();
  
  // Reset state when modal closes or tool changes
  useEffect(() => {
    if (!open) {
      setLaunched(false);
      setLoading(false);
      setActiveTab('overview');
    }
  }, [open, tool]);
  
  if (!tool) {
    return null;
  }
  
  // Check if user can access this tool based on tier
  const canAccessTool = useCallback(() => {
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
  }, [tool.tier, currentTier]);
  
  const handleLaunchTool = () => {
    if (!canAccessTool()) {
      upgradePrompt(tool.tier);
      return;
    }
    
    setLoading(true);
    setActiveTab('interface');
    
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

  const renderOverview = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Description</h3>
          <p className="text-foreground/80">{tool.description}</p>
        </div>
        
        {tool.rationale && (
          <div>
            <h3 className="text-lg font-medium mb-2">Why Use This Tool</h3>
            <p className="text-foreground/80">{tool.rationale}</p>
          </div>
        )}
        
        {tool.usageLimit && (
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <Info className="h-5 w-5 text-primary shrink-0" />
            <p className="text-sm">{tool.usageLimit}</p>
          </div>
        )}
        
        {tool.use_cases && tool.use_cases.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2">Use Cases</h3>
            <ul className="space-y-2">
              {tool.use_cases.map((useCase, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-2 mt-1 text-primary">•</div>
                  <p>{useCase}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {tool.uniqueSellingPoint && (
          <div className="p-4 bg-primary/10 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Unique Selling Point</h3>
            <p className="text-foreground/80">{tool.uniqueSellingPoint}</p>
          </div>
        )}
      </div>
    );
  };
  
  const renderIntegrations = () => {
    if (!tool.integrations || tool.integrations.length === 0) {
      return (
        <div className="p-8 text-center text-muted-foreground">
          <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No integrations available for this tool</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Available Integrations</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {tool.integrations.map((integration, index) => (
            <div 
              key={index} 
              className="border rounded-lg p-3 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium">{integration}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-muted/30 p-4 rounded-lg text-sm">
          <h4 className="font-medium mb-1">How integrations work</h4>
          <p className="text-muted-foreground">
            Integrations allow this tool to work with other software and services, expanding its capabilities and improving your workflow.
          </p>
        </div>
      </div>
    );
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'max-w-[95%]' : 'sm:max-w-2xl'}`}>
        <DialogHeader>
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <DialogTitle className="text-xl">{tool?.name}</DialogTitle>
              <DialogDescription className="mt-1.5 text-sm">{tool?.description}</DialogDescription>
            </div>
            <Badge className={`${getTierColor()} ${isMobile ? 'mr-0' : 'ml-2'}`}>
              {getTierLabel()}
            </Badge>
          </div>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="interface">Interface</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            {renderOverview()}
          </TabsContent>
          
          <TabsContent value="integrations">
            {renderIntegrations()}
          </TabsContent>
          
          <TabsContent value="interface">
            {renderToolInterface()}
          </TabsContent>
        </Tabs>
        
        <Separator className="my-1" />
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <div className="text-xs text-muted-foreground sm:mr-auto">
            Category: {tool.category}
          </div>
          {activeTab !== "interface" && canAccessTool() && (
            <Button 
              variant="default" 
              size="sm"
              onClick={handleLaunchTool}
              className="flex items-center gap-1.5"
            >
              <Rocket className="h-4 w-4" /> Launch Tool
            </Button>
          )}
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
