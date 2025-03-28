
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, X, Send, MessageCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { toast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import { saveChatMessage } from '@/utils/chatUtils';
import ChatBubble from '@/components/chat/ChatBubble';

interface ChatAssistantProps {}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatAssistant: React.FC<ChatAssistantProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: '1',
        content: "Hi there! I'm the chat assistant for this platform. How can I help you today?",
        isUser: false,
        timestamp: new Date()
      }
    ]);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Get response from assistant (simulated)
      const response = await getAssistantResponse(inputValue);
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Save to history if user is logged in
      if (user) {
        await saveChatMessage(userMessage.content, response, { type: 'chat_assistant' });
      }
    } catch (error) {
      console.error("Error getting response:", error);
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

  // Simulated assistant response - replace with real API in production
  const getAssistantResponse = async (message: string): Promise<string> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
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
    
    // Default response
    return "I'm here to help you navigate our AI platform. You can ask me about courses, tools, account settings, or pricing plans. What would you like to know more about?";
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
                <Sparkles className="h-4 w-4 text-primary-foreground" />
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
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900/50">
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input */}
          <div className="p-3 border-t bg-background">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
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
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatAssistant;
