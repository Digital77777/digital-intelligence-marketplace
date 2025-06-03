
import { useToast } from '@/hooks/use-toast';

export interface DatabaseError {
  code?: string;
  message?: string;
  details?: string;
  hint?: string;
}

export const isDatabaseError = (error: any): error is DatabaseError => {
  return error && (error.code || error.message);
};

export const handleDatabaseError = (error: DatabaseError, context: string) => {
  console.error(`Database error in ${context}:`, error);
  
  // Return user-friendly error messages
  switch (error.code) {
    case 'PGRST200':
      return {
        title: "Service Temporarily Unavailable",
        description: "We're setting up this feature. Please try again later.",
        fallbackData: true
      };
    case 'PGRST301':
      return {
        title: "Access Denied",
        description: "You don't have permission to access this resource.",
        fallbackData: false
      };
    default:
      return {
        title: "Something went wrong",
        description: "Please try refreshing the page or contact support if the issue persists.",
        fallbackData: true
      };
  }
};

export const useDatabaseErrorHandler = () => {
  const { toast } = useToast();

  const handleError = (error: any, context: string, showToast: boolean = true) => {
    const errorInfo = handleDatabaseError(error, context);
    
    if (showToast) {
      toast({
        title: errorInfo.title,
        description: errorInfo.description,
        variant: "destructive"
      });
    }
    
    return errorInfo;
  };

  return { handleError };
};
