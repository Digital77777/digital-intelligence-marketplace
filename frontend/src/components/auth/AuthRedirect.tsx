import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { Loader2 } from 'lucide-react';

interface AuthRedirectProps {
  children: React.ReactNode;
  fallbackPath?: string;
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({ 
  children, 
  fallbackPath = '/auth' 
}) => {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate(fallbackPath);
    }
  }, [user, loading, navigate, fallbackPath]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default AuthRedirect;