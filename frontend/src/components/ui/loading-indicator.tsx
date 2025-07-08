
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  size = 'md', 
  className,
  text
}) => {
  const sizeClass = {
    'sm': 'h-4 w-4',
    'md': 'h-6 w-6',
    'lg': 'h-8 w-8'
  }[size];
  
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeClass)} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};

export default LoadingIndicator;
