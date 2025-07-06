
import { useCallback } from 'react';
import { toast } from 'sonner';

export const useErrorHandler = () => {
  const handleError = useCallback((error: Error | string, context?: string) => {
    const message = typeof error === 'string' ? error : error.message;
    const errorMessage = context ? `${context}: ${message}` : message;
    
    console.error('Error handled:', { error, context });
    toast.error(errorMessage);
  }, []);

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    context?: string
  ): Promise<T | null> => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error as Error, context);
      return null;
    }
  }, [handleError]);

  return { handleError, handleAsyncError };
};
