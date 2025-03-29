
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatContainer, { ChatMessage } from '@/components/chat/ChatContainer';
import ChatInput from '@/components/chat/ChatInput';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTier } from '@/context/TierContext';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { fetchAIResponse, sendChatMessage } from '@/utils/chatUtils';
import {
  Zap,
  Sparkles,
  Settings,
  InfoIcon,
  Book,
  Star,
  Lock,
  BrainCircuit,
  Lightbulb,
  BotMessageSquare
} from 'lucide-react';

const AIAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const { currentTier, upgradePrompt } = useTier();
  const { user } = useUser();
  const [assistantMode, setAssistantMode] = useState<'general' | 'expert'>('general');

  useEffect(() => {
    // Create or get a session ID
    const session = uuidv4();
    setSessionId(session);
    
    // Add welcome message
    const welcomeMessage: ChatMessage = {
      id: uuidv4(),
      role: 'assistant',
      content: getWelcomeMessage(),
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
    
    // Check if user can access advanced features
    if (currentTier !== 'pro' && assistantMode === 'expert') {
      setAssistantMode('general');
    }
  }, []);

  const getWelcomeMessage = (): string => {
    if (currentTier === 'pro') {
      return "Welcome to the Pro AI Assistant! I'm your advanced AI helper with access to deeper insights and specialized knowledge. How can I assist you today?";
    } else {
      return "Welcome to the AI Assistant! I'm here to help answer your questions about AI tools and features. For more advanced capabilities, consider upgrading to our Pro tier!";
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;
    
    if (currentTier === 'freemium' && messages.filter(m => m.role === 'user').length >= 5) {
      upgradePrompt('basic');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Create user message
      const userMessage = await sendChatMessage(inputValue, sessionId);
      
      // Add to UI
      setMessages(prev => [...prev, { ...userMessage, timestamp: new Date() }]);
      setInputValue('');
      
      // Get AI response
      const responseMessage = await fetchAIResponse(
        inputValue, 
        sessionId,
        assistantMode === 'expert' ? 'pro' : 'general'
      );
      
      // Add AI response to UI
      setMessages(prev => [...prev, responseMessage]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      setMessages(prev => [...prev, {
        id: uuidv4(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again later.',
        timestamp: new Date()
      }]);
      
    } finally {
      setIsLoading(false);
    }
  };

  const changeAssistantMode = (mode: 'general' | 'expert') => {
    if (mode === 'expert' && currentTier !== 'pro') {
      upgradePrompt('pro');
      return;
    }
    
    setAssistantMode(mode);
    
    // Add mode switch notification
    setMessages(prev => [...prev, {
      id: uuidv4(),
      role: 'assistant',
      content: mode === 'expert' 
        ? "You've switched to Expert mode. I now have access to more detailed information and can provide more advanced insights."
        : "You've switched to General mode. I'll provide helpful answers to your general AI questions.",
      timestamp: new Date()
    }]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12 bg-gradient-to-b from-indigo-50/30 to-white dark:from-indigo-950/10 dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-9">
              <div className="flex flex-col h-[calc(100vh-200px)] bg-card border rounded-lg overflow-hidden shadow-sm">
                <div className="p-4 border-b flex items-center justify-between bg-muted/50">
                  <div className="flex items-center gap-2">
                    <BotMessageSquare className="h-5 w-5 text-primary" />
                    <h2 className="font-medium">
                      {assistantMode === 'expert' ? 'Pro AI Assistant' : 'AI Assistant'}
                    </h2>
                    <Badge variant={assistantMode === 'expert' ? 'default' : 'outline'} className="capitalize">
                      {assistantMode === 'expert' ? (
                        <>
                          <Sparkles className="h-3 w-3 mr-1" />
                          Expert Mode
                        </>
                      ) : (
                        'General Mode'
                      )}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Tabs 
                      value={assistantMode} 
                      onValueChange={(value) => changeAssistantMode(value as 'general' | 'expert')}
                    >
                      <TabsList className="h-8">
                        <TabsTrigger value="general" className="text-xs px-2">General</TabsTrigger>
                        <TabsTrigger value="expert" className="text-xs px-2">
                          {currentTier !== 'pro' && <Lock className="h-3 w-3 mr-1" />}
                          Expert
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <ChatContainer messages={messages} isLoading={isLoading} />
                
                <div className="p-4 border-t mt-auto">
                  <ChatInput
                    value={inputValue}
                    onChange={setInputValue}
                    onSend={handleSendMessage}
                    isLoading={isLoading}
                    placeholder={
                      currentTier === 'freemium' 
                        ? `Ask a question (${5 - messages.filter(m => m.role === 'user').length}/5 remaining)`
                        : "Ask your question..."
                    }
                  />
                  {currentTier === 'freemium' && (
                    <div className="text-xs text-muted-foreground mt-2 text-center">
                      Freemium users are limited to 5 questions. <Button variant="link" className="h-auto p-0 text-xs" onClick={() => upgradePrompt('basic')}>Upgrade</Button> for unlimited questions.
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3 space-y-6">
              <Card className="p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-primary" />
                  Assistant Capabilities
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <Zap className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Answer questions about AI tools</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Zap className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Explain AI concepts and terms</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Zap className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Recommend relevant learning resources</span>
                  </li>
                  {currentTier === 'pro' ? (
                    <>
                      <li className="flex items-start gap-2 text-sm">
                        <Zap className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Provide custom implementation advice</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Zap className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Advanced AI model customization help</span>
                      </li>
                    </>
                  ) : (
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Lock className="h-4 w-4 mt-0.5" />
                      <span>Pro features locked <Button variant="link" className="h-auto p-0 text-xs" onClick={() => upgradePrompt('pro')}>Upgrade</Button></span>
                    </li>
                  )}
                </ul>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  Suggested Questions
                </h3>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs h-auto py-1.5"
                    onClick={() => {
                      setInputValue("What AI tools are available for beginners?");
                    }}
                  >
                    What AI tools are available for beginners?
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs h-auto py-1.5"
                    onClick={() => {
                      setInputValue("Explain machine learning in simple terms");
                    }}
                  >
                    Explain machine learning in simple terms
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs h-auto py-1.5"
                    onClick={() => {
                      setInputValue("What courses should I take to learn AI?");
                    }}
                  >
                    What courses should I take to learn AI?
                  </Button>
                  {currentTier === 'pro' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start text-xs h-auto py-1.5"
                      onClick={() => {
                        setInputValue("How can I fine-tune a GPT model for my specific use case?");
                      }}
                    >
                      How can I fine-tune a GPT model for my specific use case?
                    </Button>
                  )}
                </div>
              </Card>
              
              {currentTier !== 'pro' && (
                <Card className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/20 border-purple-100 dark:border-purple-900/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <h3 className="font-medium">Upgrade to Pro</h3>
                  </div>
                  <p className="text-sm mb-4">Get access to Expert mode with advanced AI capabilities, unlimited questions, and personalized help.</p>
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={() => upgradePrompt('pro')}
                  >
                    Upgrade Now
                  </Button>
                </Card>
              )}
              
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <InfoIcon className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Need More Help?</h3>
                </div>
                <div className="space-y-2">
                  <Button variant="link" size="sm" className="text-xs h-auto p-0 text-blue-600 dark:text-blue-400">
                    <Book className="h-3.5 w-3.5 mr-1.5" />
                    Visit the Learning Hub
                  </Button>
                  <br />
                  <Button variant="link" size="sm" className="text-xs h-auto p-0 text-blue-600 dark:text-blue-400">
                    <Star className="h-3.5 w-3.5 mr-1.5" />
                    Browse Community Forums
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIAssistant;
