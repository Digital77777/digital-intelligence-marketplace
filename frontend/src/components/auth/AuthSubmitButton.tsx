import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface AuthSubmitButtonProps {
  isSignUp: boolean;
  isLoading: boolean;
}

const AuthSubmitButton: React.FC<AuthSubmitButtonProps> = ({ isSignUp, isLoading }) => {
  return (
    <Button 
      type="submit" 
      className="w-full transition-all duration-200 hover:scale-[1.02]" 
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          {isSignUp ? 'Creating account...' : 'Signing in...'}
        </>
      ) : (
        isSignUp ? 'Create Account' : 'Sign In'
      )}
    </Button>
  );
};

export default AuthSubmitButton;