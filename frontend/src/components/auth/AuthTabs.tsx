import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthForm from './AuthForm';

interface AuthTabsProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, fullName?: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ onSignIn, onSignUp, isLoading, error }) => {
  return (
    <Tabs defaultValue="signin" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      
      <TabsContent value="signin" className="mt-6">
        <AuthForm
          isSignUp={false}
          onSubmit={onSignIn}
          isLoading={isLoading}
          error={error}
        />
      </TabsContent>

      <TabsContent value="signup" className="mt-6">
        <AuthForm
          isSignUp={true}
          onSubmit={onSignUp}
          isLoading={isLoading}
          error={error}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AuthTabs;