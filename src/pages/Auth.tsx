
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import SignInForm from '@/components/SignInForm';
import SignUpForm from '@/components/SignUpForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Auth = () => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is logged in, redirect to home page
    if (user && !isLoading) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-lg animate-fade-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">
              {activeTab === 'signin' ? 'Sign in to your account' : 'Create an account'}
            </CardTitle>
            <CardDescription>
              {activeTab === 'signin' 
                ? 'Enter your credentials to access your account' 
                : 'Fill in the information below to create your account'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4 bg-blue-50 text-blue-800 border-blue-100">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                For testing purposes, email verification is not required.
              </AlertDescription>
            </Alert>
            
            <Tabs 
              defaultValue={activeTab} 
              onValueChange={(value) => setActiveTab(value as 'signin' | 'signup')}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <SignInForm onSuccess={() => navigate('/')} />
              </TabsContent>
              
              <TabsContent value="signup">
                <SignUpForm onSuccess={() => navigate('/')} />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center space-y-2">
            <div className="text-sm text-muted-foreground">
              {activeTab === 'signin' 
                ? "Don't have an account? " 
                : "Already have an account? "}
              <button 
                onClick={() => setActiveTab(activeTab === 'signin' ? 'signup' : 'signin')}
                className="text-primary hover:underline focus:outline-none"
              >
                {activeTab === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
