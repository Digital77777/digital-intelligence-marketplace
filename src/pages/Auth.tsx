
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import AuthContainer from '@/components/auth/AuthContainer';
import AuthTabs from '@/components/auth/AuthTabs';
import { useAuthActions } from '@/hooks/useAuthActions';

const Auth = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const { handleSignIn, handleSignUp, error } = useAuthActions();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (user) {
    return null;
  }

  return (
    <AuthContainer>
      <AuthTabs
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        isLoading={isLoading}
        error={error}
      />
    </AuthContainer>
  );
};

export default Auth;
