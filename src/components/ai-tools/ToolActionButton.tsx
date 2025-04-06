
import React from 'react';
import { Button } from '@/components/ui/button';
import { AIToolItem } from '@/data/ai-tools-tiers';
import { ExternalLink, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTier } from '@/context/TierContext';

// Define our own props interface without extending ButtonProps
interface ToolActionButtonProps {
  tool: AIToolItem;
  compact?: boolean;
  action: 'view' | 'launch';
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
    }
  };

  // View button should always be accessible
  const isViewButton = action === 'view';
  const buttonVariant = variant || (isViewButton ? "outline" : (hasAccess ? "default" : "outline"));

  const getLabelText = () => {
    if (isViewButton) return "View Tool";
    return hasAccess ? "Launch Tool" : `Upgrade to ${tool.tier.charAt(0).toUpperCase() + tool.tier.slice(1)}`;
  };

  return (
    <Button
      variant={buttonVariant}
      size={compact ? "sm" : size || "default"}
      className={`${className || ''} ${compact ? 'w-full' : ''}`}
      onClick={handleAction}
    >
      {isViewButton ? 
        <>View Tool <ExternalLink className="h-3.5 w-3.5 ml-1.5" /></> : 
        (hasAccess ? 
          <>Launch Tool <ExternalLink className="h-3.5 w-3.5 ml-1.5" /></> : 
          <>Upgrade <Lock className="h-3.5 w-3.5 ml-1.5" /></>
        )
      }
    </Button>
  );
};

export default ToolActionButton;
