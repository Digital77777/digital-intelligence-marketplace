
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, X, Send, MessageCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { saveChatMessage } from '@/utils/chatUtils';
import { v4 as uuidv4 } from 'uuid';
import { useTier } from '@/context/TierContext';
import ChatContainer, { ChatMessage } from '@/components/chat/ChatContainer';
import ProChatAssistant from './ProChatAssistant';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { currentTier, upgradePrompt } = useTier();

  // Check if user has Pro tier to show Pro Chat Assistant instead
  if (currentTier === 'pro') {
    return <ProChatAssistant />;
  }

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: uuidv4(),
        role: 'assistant',
        content: "Hi there! I'm the chat assistant for this platform. How can I help you today?",
        timestamp: new Date()
      }
    ]);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    if (currentTier === 'freemium' && messages.filter(m => m.role === 'user').length >= 5) {
      upgradePrompt('basic');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Create user message
      const userMessage: ChatMessage = {
        id: uuidv4(),
        role: 'user',
        content: inputValue,
        timestamp: new Date()
      };
      
      // Add to UI
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      
      // Get response (simulated for Freemium/Basic tiers)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const responseContent = generateBasicResponse(inputValue);
      
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      // Add AI response to UI
      setMessages(prev => [...prev, assistantMessage]);
      
      // Save to history if user is logged in
      if (user) {
        await saveChatMessage(userMessage.content, responseContent, { type: 'chat_assistant' });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Could not get a response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Simple response generator for basic/freemium tiers
  const generateBasicResponse = (message: string): string => {
    message = message.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi ') || message.includes('hey')) {
      return "Hello! How can I assist you today with our AI platform?";
    }
    
    if (message.includes('account') || message.includes('login') || message.includes('sign up')) {
      return "You can manage your account settings in the Profile page. If you're having trouble logging in, please make sure your credentials are correct or use the 'Forgot Password' option.";
    }
    
    if (message.includes('course') || message.includes('learn') || message.includes('tutorial')) {
      return "We have various AI learning courses available in our Learning Hub. You can filter them by difficulty level and category. Some advanced courses require a Basic or Pro subscription.";
    }
    
    if (message.includes('pricing') || message.includes('subscription') || message.includes('tier')) {
      return "We offer three tiers: Freemium (free), Basic ($10/month), and Pro ($29/month). Each tier unlocks additional features. You can see a detailed comparison on our Pricing page.";
    }
    
    if (message.includes('tool') || message.includes('ai tool')) {
      return "You can explore our collection of AI tools in the AI Tools Directory. We have tools for various AI applications including NLP, computer vision, and machine learning.";
    }
    
    if (message.includes('thank')) {
      return "You're welcome! Feel free to ask if you have any other questions.";
    }
    
    if (message.includes('pro') || message.includes('advance')) {
      return "The Pro tier unlocks advanced features like the AI Studio, custom model training, business insights, and personalized AI assistance. You'll also get priority support and access to all our premium tools. Would you like to upgrade?";
    }
    
    // Default response
    return "I'm here to help you navigate our AI platform. You can ask me about courses, tools, account settings, or pricing plans. For more advanced assistance, consider upgrading to our Pro tier which includes a more powerful AI assistant!";
  };

  return (
    <>
      {/* Chat toggle button */}
      <Button
        onClick={toggleChat}
        variant="default"
        size="icon"
        className="fixed bottom-4 right-4 rounded-full p-3 shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 z-50"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </Button>
      
      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-16 right-4 w-80 sm:w-96 h-96 flex flex-col rounded-lg border shadow-lg z-50 overflow-hidden">
          {/* Chat header */}
          <div className="bg-primary text-primary-foreground p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-primary-foreground/10">
                <MessageCircle className="h-4 w-4 text-primary-foreground" />
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">Chat Assistant</h3>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10" onClick={toggleChat}>
                {isOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10" onClick={toggleChat}>
                <X size={18} />
              </Button>
            </div>
          </div>
          
          {/* Chat messages */}
          <ChatContainer messages={messages} isLoading={isLoading} />
          
          {/* Chat input */}
          <div className="p-3 border-t bg-background">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={
                  currentTier === 'freemium' 
                    ? `Ask a question (${5 - messages.filter(m => m.role === 'user').length}/5 remaining)`
                    : "Type your message..."
                }
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                size="icon" 
                onClick={handleSendMessage} 
                disabled={isLoading || !inputValue.trim()}
              >
                {isLoading ? <Spinner size="sm" /> : <Send size={18} />}
              </Button>
            </div>
            {currentTier === 'freemium' && (
              <div className="text-xs text-muted-foreground mt-2 text-center">
                Freemium users are limited to 5 questions. <Button variant="link" className="h-auto p-0 text-xs" onClick={() => upgradePrompt('basic')}>Upgrade</Button> for unlimited questions.
              </div>
            )}
            {currentTier !== 'pro' && (
              <div className="mt-3 bg-muted/40 rounded-md p-2 text-xs border border-border/50">
                <div className="flex items-center gap-1 font-medium text-primary mb-1">
                  <Sparkles className="h-3 w-3" />
                  <span>Pro Tier Upgrade</span>
                </div>
                <p className="text-muted-foreground">
                  Upgrade to Pro for our advanced AI assistant with context awareness, voice commands, and personalized insights.
                </p>
                <Button size="sm" variant="link" className="text-xs p-0 h-auto mt-1" onClick={() => upgradePrompt('pro')}>
                  Learn more
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatAssistant;
