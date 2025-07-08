
import { toast } from 'sonner';

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
    case 'PGRST116':
      return {
        title: "Connection Error",
        description: "Unable to connect to the database. Please check your connection.",
        fallbackData: true
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
  const handleError = (error: any, context: string, showToast: boolean = true) => {
    const errorInfo = handleDatabaseError(error, context);
    
    if (showToast) {
      toast.error(errorInfo.title, {
        description: errorInfo.description,
      });
    }
    
    return errorInfo;
  };

  return { handleError };
};
