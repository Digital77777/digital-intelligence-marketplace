
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { AIToolItem } from '@/data/ai-tools-tiers';
import { ExternalLink, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTier } from '@/context/TierContext';

interface ToolActionButtonProps extends ButtonProps {
  tool: AIToolItem;
  compact?: boolean;
  action: 'view' | 'launch';
  onSelect?: (tool: AIToolItem) => void;
}

export const ToolActionButton: React.FC<ToolActionButtonProps> = ({ 
  tool, 
  compact = false, 
  action,
  onSelect,
  ...props
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
    if (action === 'view') {
      // Always navigate to tool details regardless of access
      navigate(`/tool/${tool.id}`);
    } else if (action === 'launch') {
      if (hasAccess) {
        if (onSelect) {
          onSelect(tool);
        } else {
          navigate(`/tool/${tool.id}`);
        }
      } else {
        upgradePrompt(tool.tier);
      }
    }
  };

  // View button should always be accessible
  const isViewButton = action === 'view';
  const buttonVariant = isViewButton ? "outline" : (hasAccess ? "default" : "outline");

  const getLabelText = () => {
    if (isViewButton) return "View Tool";
    return hasAccess ? "Launch Tool" : `Upgrade to ${tool.tier.charAt(0).toUpperCase() + tool.tier.slice(1)}`;
  };

  return (
    <Button
      variant={buttonVariant}
      size={compact ? "sm" : props.size || "default"}
      className={`${props.className || ''} ${compact ? 'w-full' : ''}`}
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
