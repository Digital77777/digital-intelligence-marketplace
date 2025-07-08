import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface AuthErrorHandlerProps {
  error: string | null;
}

const AuthErrorHandler: React.FC<AuthErrorHandlerProps> = ({ error }) => {
  if (!error) return null;

  const getErrorMessage = (error: string) => {
    if (error.includes('Invalid login credentials')) {
      return 'Invalid email or password. Please check your credentials and try again.';
    }
    if (error.includes('User already registered')) {
      return 'An account with this email already exists. Please sign in instead.';
    }
    if (error.includes('Password should be at least 6 characters')) {
      return 'Password must be at least 6 characters long.';
    }
    if (error.includes('Unable to validate email address')) {
      return 'Please enter a valid email address.';
    }
    if (error.includes('Database error')) {
      return 'Unable to create account. Please try again in a few moments.';
    }
    return error || 'An unexpected error occurred. Please try again.';
  };

  return (
    <Alert variant="destructive" className="mt-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        {getErrorMessage(error)}
      </AlertDescription>
    </Alert>
  );
};

export default AuthErrorHandler;