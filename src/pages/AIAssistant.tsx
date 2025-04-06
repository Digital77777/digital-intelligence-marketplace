
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
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

const AIAssistant: React.FC = () => {
  useScrollToTop(); // Add scroll to top on navigation
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { currentTier, upgradePrompt } = useTier();
  const navigate = useNavigate();

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-message',
          role: 'assistant',
          content: "Hello! I'm your Pro AI Assistant for the Digital Intelligence Marketplace. I can help you navigate the platform, answer questions about AI tools, and provide personalized recommendations. What would you like to know?",
          timestamp: new Date()
        }
      ]);
    }
  }, [messages.length]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    if (!user) {
      toast("You need to be logged in to use the Pro AI Assistant");
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
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: "This is a simulated response from the AI Assistant.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (error) {
      console.error("Error sending message:", error);
      toast("Error communicating with AI Assistant");
    } finally {
      setIsLoading(false);
    }
  };

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
              <div>
                <h2 className="text-2xl font-semibold">Pro AI Assistant</h2>
                <p className="text-muted-foreground">
                  Get personalized AI assistance to navigate the platform and discover AI tools.
                </p>
              </div>
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
                isLoading={isLoading}
                placeholder="Ask a question about AI tools, models, or workflows..."
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIAssistant;
