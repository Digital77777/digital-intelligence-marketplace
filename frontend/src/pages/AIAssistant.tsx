
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatContainer, { ChatMessage } from '@/components/chat/ChatContainer';
import ChatInput from '@/components/chat/ChatInput';
import useScrollToTop from '@/hooks/useScrollToTop';
import { supabase } from '@/integrations/supabase/client';

const AIAssistant: React.FC = () => {
  useScrollToTop();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  const [retryCount, setRetryCount] = useState(0);
  const { user } = useUser();
  const { currentTier } = useTier();
  const navigate = useNavigate();

  // Check connection status
  useEffect(() => {
    const checkConnection = async () => {
      try {
        setConnectionStatus('checking');
        // Simple ping to check if the edge function is available
        const { error } = await supabase.functions.invoke('ai-assistant-chat', {
          body: { messages: [{ role: 'user', content: 'ping' }] }
        });
        
        if (error) {
          console.error('Connection check failed:', error);
          setConnectionStatus('disconnected');
        } else {
          setConnectionStatus('connected');
        }
      } catch (error) {
        console.error('Connection error:', error);
        setConnectionStatus('disconnected');
      }
    };

    checkConnection();
  }, [retryCount]);

  useEffect(() => {
    if (messages.length === 0 && connectionStatus === 'connected') {
      setMessages([
        {
          id: 'welcome-message',
          role: 'assistant',
          content: `Hello${user ? ` ${user.email?.split('@')[0]}` : ''}! I'm your Pro AI Assistant for the Digital Intelligence Marketplace. I can help you navigate the platform, answer questions about AI tools, and provide personalized recommendations based on your ${currentTier} tier. What would you like to know?`,
          timestamp: new Date()
        }
      ]);
    }
  }, [messages.length, connectionStatus, user, currentTier]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    if (!user) {
      toast.error("You need to be logged in to use the Pro AI Assistant");
      navigate('/auth');
      return;
    }

    if (connectionStatus === 'disconnected') {
      toast.error("Unable to connect to AI Assistant. Please try again.");
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Create context with user tier information
      const contextMessages = [
        {
          role: "system",
          content: `You are a helpful AI assistant specialized in digital intelligence and AI tools for the Digital Intelligence Marketplace. The user has a ${currentTier} tier subscription. Provide concise, friendly, and helpful responses. If asked about navigation, provide specific guidance about platform features available to their tier.`
        },
        ...messages.map(m => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content
        })),
        {
          role: "user",
          content: inputValue
        }
      ];

      const { data, error } = await supabase.functions.invoke('ai-assistant-chat', {
        body: { messages: contextMessages }
      });

      if (error) {
        throw new Error(error.message || "Failed to get response from AI Assistant");
      }

      if (!data?.content) {
        throw new Error("No response received from AI Assistant");
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error("Error sending message:", error);
      
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "I apologize, but I'm experiencing technical difficulties right now. Please try again in a moment or contact support if the issue persists.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetryConnection = () => {
    setRetryCount(prev => prev + 1);
    toast.info("Reconnecting to AI Assistant...");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 px-4 md:px-6 pb-12 bg-gray-100 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <Card className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Authentication Required</h2>
              <p className="text-muted-foreground mb-4">
                Please sign in to access the Pro AI Assistant
              </p>
              <Button onClick={() => navigate('/auth')}>
                Sign In
              </Button>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow rounded-md p-6 mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <Sparkles className="h-5 w-5" />
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-semibold">Pro AI Assistant</h2>
                  {connectionStatus === 'connected' && (
                    <Wifi className="h-4 w-4 text-green-500" />
                  )}
                  {connectionStatus === 'disconnected' && (
                    <WifiOff className="h-4 w-4 text-red-500" />
                  )}
                  {connectionStatus === 'checking' && (
                    <div className="h-4 w-4 bg-yellow-500 rounded-full animate-pulse" />
                  )}
                </div>
                <p className="text-muted-foreground">
                  Get personalized AI assistance to navigate the platform and discover AI tools.
                  {currentTier !== 'freemium' && ` You have ${currentTier} tier access.`}
                </p>
              </div>
              {connectionStatus === 'disconnected' && (
                <Button variant="outline" onClick={handleRetryConnection}>
                  Reconnect
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="hidden xl:block bg-card border rounded-md p-6 xl:basis-1/3">
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">AI Assistant Features</h4>
                <p className="text-muted-foreground">
                  Explore the capabilities of the Pro AI Assistant.
                </p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="font-medium">Personalized Recommendations</span>
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="font-medium">Platform Navigation</span>
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="font-medium">AI Tool Insights</span>
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="font-medium">Workflow Optimization</span>
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="font-medium">Tier-Specific Guidance</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border rounded-md p-6 w-full xl:basis-2/3">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Chat with Pro AI Assistant</h3>
                <p className="text-muted-foreground">
                  Ask questions about AI tools, platform navigation, or get personalized recommendations.
                </p>
              </div>

              <div className="border rounded-md h-[400px] mb-4 bg-background overflow-hidden flex flex-col">
                <ChatContainer
                  messages={messages}
                  isLoading={isLoading}
                />
              </div>

              <ChatInput
                value={inputValue}
                onChange={handleInputChange}
                onSubmit={handleSendMessage}
                isLoading={isLoading || connectionStatus !== 'connected'}
                placeholder={
                  connectionStatus === 'connected' 
                    ? "Ask a question about AI tools, models, or workflows..."
                    : connectionStatus === 'checking'
                    ? "Connecting to AI Assistant..."
                    : "Reconnecting to AI Assistant..."
                }
              />
              
              {connectionStatus === 'disconnected' && (
                <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                  Connection lost. Click Reconnect to try again.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIAssistant;
