
import React from 'react';
import { Button } from '@/components/ui/button';
import { AIToolItem } from '@/data/ai-tools-tiers';
import { ExternalLink, Key, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTier } from '@/context/TierContext';
import apiConnectionManager from '@/utils/apiConnectionManager';

// Define our own props interface without extending ButtonProps
interface ToolActionButtonProps {
  tool: AIToolItem;
  compact?: boolean;
  action: 'view' | 'launch' | 'connect-api';
  onSelect?: (tool: AIToolItem) => void;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
}

export const ToolActionButton: React.FC<ToolActionButtonProps> = ({ 
  tool, 
  compact = false, 
  action,
  onSelect,
  className,
  size,
  variant,
}) => {
  const navigate = useNavigate();
  const { currentTier, upgradePrompt } = useTier();
  
  // Access logic to ensure proper tier access
  const hasAccess = (
    (tool.tier === 'freemium') || 
    (tool.tier === 'basic' && (currentTier === 'basic' || currentTier === 'pro')) ||
    (tool.tier === 'pro' && currentTier === 'pro')
  );

  // Check API connection status
  const isApiConnected = apiConnectionManager.hasConnection(tool.id);
  
  const handleAction = () => {
    // Always scroll to top before any action
    window.scrollTo(0, 0);
    
    if (action === 'view') {
      // Always navigate to tool details regardless of access
      navigate(`/tool/${tool.id}`);
    } else if (action === 'launch') {
      if (hasAccess) {
        if (onSelect) {
          onSelect(tool);
        } else {
          navigate(`/tool/${tool.id}/interface`);
        }
      } else {
        upgradePrompt(tool.tier);
      }
    } else if (action === 'connect-api') {
      if (onSelect) {
        onSelect(tool);
      }
    }
  };

  // View button should always be accessible
  const isViewButton = action === 'view';
  const isConnectApiButton = action === 'connect-api';
  
  let buttonVariant = variant;
  
  if (!buttonVariant) {
    if (isViewButton) {
      buttonVariant = "outline";
    } else if (isConnectApiButton) {
      buttonVariant = "outline";
    } else {
      buttonVariant = hasAccess ? "default" : "outline";
    }
  }

  const getLabelText = () => {
    if (isViewButton) return "View Tool";
    if (isConnectApiButton) return isApiConnected ? "Update API" : "Connect API";
    return hasAccess ? "Launch Tool" : `Upgrade to ${tool.tier.charAt(0).toUpperCase() + tool.tier.slice(1)}`;
  };

  return (
    <Button
      variant={buttonVariant}
      size={compact ? "sm" : size || "default"}
      className={`${className || ''} ${compact ? 'w-full' : ''} ${isConnectApiButton ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 dark:hover:text-blue-300' : ''}`}
      onClick={handleAction}
    >
      {isViewButton ? (
        <>View Tool <ExternalLink className="h-3.5 w-3.5 ml-1.5" /></>
      ) : isConnectApiButton ? (
        <><Key className="h-3.5 w-3.5 mr-1.5" /> {isApiConnected ? "Update API" : "Connect API"}</>
      ) : (
        hasAccess ? (
          <>Launch Tool <ExternalLink className="h-3.5 w-3.5 ml-1.5" /></>
        ) : (
          <>Upgrade <Lock className="h-3.5 w-3.5 ml-1.5" /></>
        )
      )}
    </Button>
  );
};

export default ToolActionButton;
