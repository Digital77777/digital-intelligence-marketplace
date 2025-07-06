
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import AuthContainer from '@/components/auth/AuthContainer';
import AuthTabs from '@/components/auth/AuthTabs';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const Auth = () => {
  const navigate = useNavigate();
  const { user, signIn, signUp, loading } = useAuth();
  const { handleAsyncError } = useErrorHandler();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignIn = async (email: string, password: string) => {
    setError(null);
    setIsSubmitting(true);

    const result = await handleAsyncError(
      () => signIn(email, password),
      'Sign in failed'
    );

    if (result && !result.error) {
      navigate('/');
    } else if (result?.error) {
      setError(result.error.message);
    }

    setIsSubmitting(false);
  };

  const handleSignUp = async (email: string, password: string, fullName?: string) => {
    setError(null);
    setIsSubmitting(true);

    const result = await handleAsyncError(
      () => signUp(email, password, fullName),
      'Sign up failed'
    );

    if (result?.error) {
      setError(result.error.message);
    }

    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <AuthContainer>
      <AuthTabs
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        isLoading={isSubmitting}
        error={error}
      />
    </AuthContainer>
  );
};

export default Auth;
