
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  title = 'Something went wrong',
  message, 
  onRetry,
  className = ''
}) => {
  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="space-y-2">
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-sm">{message}</div>
        </div>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm" className="mt-2">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorMessage;
