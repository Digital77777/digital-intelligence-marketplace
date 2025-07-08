import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

export const useAuthActions = () => {
  const navigate = useNavigate();
  const { login, register } = useUser();
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (email: string, password: string) => {
    setError(null);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    }
  };

  const handleSignUp = async (email: string, password: string, fullName?: string): Promise<boolean> => {
    setError(null);
    try {
      await register(email, password, fullName);
      return true;
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      return false;
    }
  };

  const clearError = () => setError(null);

  return {
    handleSignIn,
    handleSignUp,
    error,
    clearError
  };
};
