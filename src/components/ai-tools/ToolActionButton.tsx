import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AIToolItem, AIToolTier } from '@/data/ai-tools-tiers';
import { useTier } from '@/context/TierContext';
import { useToast } from '@/hooks/use-toast';
import { Lock, ExternalLink, Eye, Settings } from 'lucide-react';
import ToolDetailView from './ToolDetailView';
import ToolInterfaceModal from './ToolInterfaceModal';

interface ToolActionButtonProps {
  tool: AIToolItem;
  action: 'view' | 'launch' | 'connect-api' | 'configure';
  size?: 'sm' | 'lg' | 'default';
  variant?: 'default' | 'outline' | 'secondary';
  className?: string;
  compact?: boolean;
  children?: React.ReactNode;
  onSelect?: (tool: AIToolItem) => void;
}

const ToolActionButton: React.FC<ToolActionButtonProps> = ({
  tool,
  action,
  size = 'default',
  variant = 'default',
  className = '',
  compact = false,
  children,
  onSelect
}) => {
  const { currentTier, upgradePrompt } = useTier();
  const { toast } = useToast();
  const [showDetailView, setShowDetailView] = useState(false);
  const [showToolInterface, setShowToolInterface] = useState(false);

  // Fixed tier access logic - hierarchical access
  const hasAccess = (
    !!tool.externalUrl || // External tools are always accessible
    (tool.tier === 'freemium') || // Freemium tools available to all
    (tool.tier === 'basic' && (currentTier === 'basic' || currentTier === 'pro')) || // Basic tools for basic+ users
    (tool.tier === 'pro' && currentTier === 'pro') // Pro tools only for pro users
  );

  const handleAction = () => {
    switch (action) {
      case 'view':
        setShowDetailView(true);
        break;
        
      case 'launch':
        if (hasAccess) {
          setShowToolInterface(true);
          if (onSelect) onSelect(tool);
        } else {
          upgradePrompt(tool.tier);
        }
        break;
        
      case 'connect-api':
        if (hasAccess) {
          toast({
            title: "API Connection",
            description: `Setting up API connection for ${tool.name}...`,
          });
        } else {
          upgradePrompt(tool.tier);
        }
        break;
        
      case 'configure':
        if (hasAccess) {
          toast({
            title: "Configuration",
            description: `Opening configuration for ${tool.name}...`,
          });
        } else {
          upgradePrompt(tool.tier);
        }
        break;
    }
  };

  const getButtonContent = () => {
    if (children) return children;
    
    switch (action) {
      case 'view':
        return (
          <>
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </>
        );
      case 'launch':
        return hasAccess ? (
          <>
            <ExternalLink className="h-4 w-4 mr-1" />
            Launch
          </>
        ) : (
          <>
            <Lock className="h-4 w-4 mr-1" />
            Upgrade Required
          </>
        );
      case 'connect-api':
        return 'Connect API';
      case 'configure':
        return (
          <>
            <Settings className="h-4 w-4 mr-1" />
            Configure
          </>
        );
      default:
        return 'Action';
    }
  };

  return (
    <>
      <Button
        size={size}
        variant={hasAccess ? variant : 'outline'}
        className={`${className} ${!hasAccess && action !== 'view' ? 'border-dashed text-gray-500' : ''}`}
        onClick={handleAction}
        disabled={!hasAccess && action !== 'view'}
      >
        {getButtonContent()}
      </Button>

      {showDetailView && (
        <div className="fixed inset-0 z-50 bg-white">
          <ToolDetailView
            tool={tool}
            onBack={() => setShowDetailView(false)}
            onLaunch={() => {
              setShowDetailView(false);
              if (hasAccess) {
                setShowToolInterface(true);
              } else {
                upgradePrompt(tool.tier);
              }
            }}
          />
        </div>
      )}

      <ToolInterfaceModal
        open={showToolInterface}
        onOpenChange={setShowToolInterface}
        tool={tool}
      />
    </>
  );
};

export default ToolActionButton;
