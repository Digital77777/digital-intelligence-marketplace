
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import AuthContainer from '@/components/auth/AuthContainer';
import AuthTabs from '@/components/auth/AuthTabs';
import EmailConfirmation from '@/components/auth/EmailConfirmation';
import { useAuthActions } from '@/hooks/useAuthActions';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Auth = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const [signupEmail, setSignupEmail] = useState('');
  const { handleSignIn, handleSignUp, error, clearError } = useAuthActions();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onSignUp = async (email: string, password: string, fullName?: string) => {
    const success = await handleSignUp(email, password, fullName);
    if (success) {
      setSignupEmail(email);
    }
  };

  const resendConfirmation = async () => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: signupEmail,
      });
      if (error) throw error;
      toast.success('Confirmation email resent successfully.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to resend confirmation email.');
    }
  };

  const handleContinue = () => {
    navigate('/');
  };

  if (user) {
    return null;
  }

  if (signupEmail) {
    return (
      <AuthContainer>
        <EmailConfirmation
          email={signupEmail}
          onResend={resendConfirmation}
          onContinue={handleContinue}
        />
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <AuthTabs
        onSignIn={handleSignIn}
        onSignUp={onSignUp}
        isLoading={isLoading}
        error={error}
      />
    </AuthContainer>
  );
};

export default Auth;
