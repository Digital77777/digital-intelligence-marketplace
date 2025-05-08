
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, X, Send, MessageCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { saveChatMessage } from '@/utils/chatUtils';
import { v4 as uuidv4 } from 'uuid';
import { useTier } from '@/context/TierContext';
import ChatContainer, { ChatMessage } from '@/components/chat/ChatContainer';
import ProChatAssistant from './ProChatAssistant';
import ChatInput from './chat/ChatInput';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { currentTier, upgradePrompt } = useTier();

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: uuidv4(),
          role: 'assistant',
          content: "Hi there! I'm the chat assistant for the Digital Intelligence Marketplace. How can I help you today?",
          timestamp: new Date()
        }
      ]);
    }
  }, [messages.length]);

  // Separate rendering logic for Pro tier
  if (currentTier === 'pro') {
    return <ProChatAssistant />;
  }

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
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
      
      const responseContent = generateBetterResponse(inputValue);
      
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
      toast.error("Could not get a response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced response generator for more contextual and helpful replies
  const generateBetterResponse = (message: string): string => {
    message = message.toLowerCase();
    
    // More comprehensive message handling patterns
    if (message.includes('hello') || message.includes('hi ') || message.includes('hey') || message.includes('greetings')) {
      return "Hello! I'm your Digital Intelligence Assistant. I can help you discover AI tools, answer questions about our platform, or guide you through our learning resources. What would you like to know today?";
    }
    
    if (message.includes('account') || message.includes('login') || message.includes('sign up') || message.includes('password')) {
      return "You can manage your account settings in the Profile section. If you need help with login issues, our authentication system supports email/password, social logins, and passwordless options. For security concerns, we recommend enabling two-factor authentication in your profile settings.";
    }
    
    if (message.includes('course') || message.includes('learn') || message.includes('tutorial') || message.includes('training')) {
      return "Our Learning Hub offers a variety of AI courses ranging from beginner to advanced levels. Popular topics include prompt engineering, machine learning fundamentals, AI ethics, and practical implementations. Each course includes interactive elements, quizzes, and completion certificates. Would you like me to recommend a specific learning path based on your interests?";
    }
    
    if (message.includes('pricing') || message.includes('subscription') || message.includes('tier') || message.includes('payment')) {
      return "We offer three subscription tiers designed to match different needs:\n\n• Freemium: Free access to basic tools and limited learning content\n• Basic ($10/month): Includes most tools, full course access, and standard support\n• Pro ($29/month): Unlocks all premium features, advanced AI assistant capabilities, unlimited API access, and priority support\n\nAll plans include a 14-day satisfaction guarantee. Would you like to know more about specific features in each tier?";
    }
    
    if (message.includes('tool') || message.includes('ai tool') || message.includes('model') || message.includes('technology')) {
      return "Our AI Tools Directory features various categories including natural language processing, computer vision, code generation, data analysis, and creative tools. Each tool is rated for quality and performance, with usage examples and integration guides. Pro tier members get priority API access and higher usage limits. Which specific AI capability are you interested in exploring?";
    }
    
    if (message.includes('marketplace') || message.includes('buy') || message.includes('sell') || message.includes('purchase')) {
      return "The Marketplace is our ecosystem where developers, businesses, and AI enthusiasts can discover, buy, sell, or exchange AI tools and models. You can find everything from pre-trained models to custom solutions for specific industries. All offerings are verified for quality and security. Would you like to browse popular categories or learn how to list your own AI solutions?";
    }
    
    if (message.includes('thank')) {
      return "You're welcome! I'm glad I could be of assistance. If you have any other questions about our platform's features, AI tools, or learning resources, feel free to ask anytime. Is there anything else I can help with today?";
    }
    
    if (message.includes('pro') || message.includes('advance') || message.includes('upgrade') || message.includes('premium')) {
      return "The Pro tier gives you access to our complete ecosystem of AI tools and features, including:\n\n• Advanced AI Studio for custom model training\n• Unlimited API calls to all tools\n• Priority processing for AI requests\n• Exclusive webinars and expert sessions\n• Early access to new features\n• Dedicated support with 24-hour response time\n• Full access to all courses and certifications\n\nWould you like to upgrade your account to experience the full potential of our platform?";
    }
    
    if (message.includes('help') || message.includes('support') || message.includes('assistance') || message.includes('contact')) {
      return "I'm here to help! For technical support, you can contact our team at support@digitalintelligence.com or use the Help Center accessible from your dashboard. Pro members receive priority support with faster response times. You can also browse our extensive documentation and community forums for immediate answers to common questions. What specific issue can I assist you with?";
    }
    
    if (message.includes('api') || message.includes('integration') || message.includes('connect') || message.includes('plugin')) {
      return "Our platform offers comprehensive API access for integrating our AI tools into your applications. Documentation includes authentication guides, endpoint references, and code examples in popular languages. Basic tier members receive 500 API calls monthly, while Pro users get unlimited access. Would you like information on a specific API or integration scenario?";
    }
    
    // Default response with more context and helpful guidance
    return `I understand you're asking about "${message.substring(0, 30)}${message.length > 30 ? '...' : ''}". 

Our Digital Intelligence Marketplace provides comprehensive AI solutions, learning resources, and community features to help you leverage artificial intelligence effectively.

You might be interested in:
• Exploring our AI Tools directory for practical applications
• Checking out the Learning Hub for structured courses on AI topics
• Visiting the Marketplace to discover new solutions from our community

How can I better assist you with your specific interests in AI and digital intelligence?`;
  };

  return (
    <>
      {/* Chat toggle button */}
      <Button
        onClick={toggleChat}
        variant="default"
        size="icon"
        className="fixed bottom-4 right-4 rounded-full p-3 shadow-lg bg-[#0071c2] text-primary-foreground hover:bg-[#00487a] z-50"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </Button>
      
      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-16 right-4 w-80 sm:w-96 h-96 flex flex-col rounded-lg border shadow-lg z-50 overflow-hidden">
          {/* Chat header */}
          <div className="bg-[#003580] text-primary-foreground p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-[#0071c2]">
                <MessageCircle className="h-4 w-4 text-primary-foreground" />
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">Digital Intelligence Assistant</h3>
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
            <ChatInput
              value={inputValue}
              onChange={handleInputChange}
              onSubmit={handleSendMessage}
              isLoading={isLoading}
              placeholder={
                currentTier === 'freemium' 
                  ? `Ask a question (${5 - messages.filter(m => m.role === 'user').length}/5 remaining)`
                  : "Type your message..."
              }
            />
            {currentTier === 'freemium' && (
              <div className="text-xs text-muted-foreground mt-2 text-center">
                Freemium users are limited to 5 questions. <Button variant="link" className="h-auto p-0 text-xs" onClick={() => upgradePrompt('basic')}>Upgrade</Button> for unlimited questions.
              </div>
            )}
            {(currentTier === 'freemium' || currentTier === 'basic') && (
              <div className="mt-3 bg-muted/40 rounded-md p-2 text-xs border border-border/50">
                <div className="flex items-center gap-1 font-medium text-[#0071c2] mb-1">
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
