
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, X, MessageCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { v4 as uuidv4 } from 'uuid';
import { useTier } from '@/context/TierContext';
import ChatContainer, { ChatMessage } from '@/components/chat/ChatContainer';
import ProChatAssistant from './ProChatAssistant';
import ChatInput from './chat/ChatInput';
import { checkNavigationIntent, handleNavigationIntent } from '@/utils/navigationUtils';

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
      
      const responseContent = generateEnhancedResponse(inputValue, userMessage.content);
      
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      // Add AI response to UI
      setMessages(prev => [...prev, assistantMessage]);
      
      // Check if this is a navigation intent and handle it
      handleNavigationIntent(inputValue);
      
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Could not get a response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced response generator for more contextual and helpful replies
  const generateEnhancedResponse = (message: string, originalMessage: string): string => {
    const lowerMessage = message.toLowerCase();

    const responseMap: { [key: string]: string } = {
      'hello': "Hello! I'm your Digital Intelligence Assistant. I can help you discover AI tools, answer questions about our platform, or guide you through our learning resources. What would you like to know today?",
      'account': "You can manage your account settings in the Profile section. If you need help with login issues, our authentication system supports email/password, social logins, and passwordless options. For security concerns, we recommend enabling two-factor authentication in your profile settings.",
      'course': "Our Learning Hub offers a variety of AI courses ranging from beginner to advanced levels. Popular topics include prompt engineering, machine learning fundamentals, AI ethics, and practical implementations. Each course includes interactive elements, quizzes, and completion certificates. Would you like me to recommend a specific learning path based on your interests?",
      'pricing': "We offer three subscription tiers designed to match different needs:\n\n• Freemium: Free access to basic tools and limited learning content\n• Basic ($10/month): Includes most tools, full course access, and standard support\n• Pro ($29/month): Unlocks all premium features, advanced AI assistant capabilities, unlimited API access, and priority support\n\nAll plans include a 14-day satisfaction guarantee. Would you like to know more about specific features in each tier?",
      'tool': "Our AI Tools Directory features various categories including natural language processing, computer vision, code generation, data analysis, and creative tools. Each tool is rated for quality and performance, with usage examples and integration guides. Pro tier members get priority API access and higher usage limits. Which specific AI capability are you interested in exploring?",
      'marketplace': "The Marketplace is our ecosystem where developers, businesses, and AI enthusiasts can discover, buy, sell, or exchange AI tools and models. You can find everything from pre-trained models to custom solutions for specific industries. All offerings are verified for quality and security. Would you like to browse popular categories or learn how to list your own AI solutions?",
      'thank': "You're welcome! I'm glad I could be of assistance. If you have any other questions about our platform's features, AI tools, or learning resources, feel free to ask anytime. Is there anything else I can help with today?",
      'pro': "The Pro tier gives you access to our complete ecosystem of AI tools and features, including:\n\n• Advanced AI Studio for custom model training\n• Unlimited API calls to all tools\n• Priority processing for AI requests\n• Exclusive webinars and expert sessions\n• Early access to new features\n• Dedicated support with 24-hour response time\n• Full access to all courses and certifications\n\nWould you like to upgrade your account to experience the full potential of our platform?",
      'help': "I'm here to help! For technical support, you can contact our team at support@digitalintelligence.com or use the Help Center accessible from your dashboard. Pro members receive priority support with faster response times. You can also browse our extensive documentation and community forums for immediate answers to common questions. What specific issue can I assist you with?",
      'api': "Our platform offers comprehensive API access for integrating our AI tools into your applications. Documentation includes authentication guides, endpoint references, and code examples in popular languages. Basic tier members receive 500 API calls monthly, while Pro users get unlimited access. Would you like information on a specific API or integration scenario?",
      'studio': "The AI Studio is our powerful environment for creating and fine-tuning custom AI models. You can upload your training data, select from various model architectures, and train models tailored to your specific needs. This feature is available to Pro tier subscribers. Would you like to learn more about the model types you can create or the training process?",
      'workflow': "Our Workflow Designer lets you connect different AI tools together to create automated pipelines for complex tasks. You can process text, images, data, and more in sequence to achieve sophisticated outcomes without writing any code. Pro users have access to additional workflow templates and can save more custom workflows. Would you like to see some example workflows you can create?",
      'community': "The Community Forums are where our users share ideas, ask questions, and collaborate on projects. You can find discussions about AI techniques, tool recommendations, and innovative use cases. We also host regular AMAs with AI experts and showcase community-built projects. Basic and Pro users can create new forum topics. Would you like me to guide you to specific forum categories?",
      'team': "For team collaboration, we offer organization accounts with shared resource access, user management, and usage analytics. Team members can collaborate on projects, share custom models, and access a centralized dashboard. This is perfect for businesses and educational institutions that need to provide AI capabilities to multiple users. Would you like information on team pricing or collaboration features?"
    };

    for (const keyword in responseMap) {
      if (lowerMessage.includes(keyword)) {
        return responseMap[keyword];
      }
    }
    
    // Default response with more context and helpful guidance
    return `I understand you're asking about "${originalMessage.substring(0, 50)}${originalMessage.length > 50 ? '...' : ''}". 

Our Digital Intelligence Marketplace provides comprehensive AI solutions, learning resources, and community features to help you leverage artificial intelligence effectively.

You might be interested in:
• Exploring our AI Tools directory for practical applications
• Checking out the Learning Hub for structured courses on AI topics
• Visiting the Marketplace to discover new solutions from our community

How can I better assist you with your specific interests in AI and digital intelligence?`;
  };
  
  // Check if the message contains navigation intent and handle redirection
  //const handleNavigationIntent = (message: string) => {
  //  const navigationTarget = checkNavigationIntent(message.toLowerCase());
  //  if (navigationTarget) {
  //    // Add a delay to allow the AI response to be displayed first
  //    setTimeout(() => {
  //      window.location.href = navigationTarget.route;
  //    }, 1500);
  //  }
  //};
  
  // Helper function to check for navigation intent
  //const checkNavigationIntent = (message: string): { name: string, route: string } | null => {
  //  const navigationMappings = [
  //    { keywords: ['ai studio', 'studio'], name: 'AI Studio', route: '/ai-studio' },
  //    { keywords: ['ai tools', 'tools directory'], name: 'AI Tools', route: '/ai-tools' },
  //    { keywords: ['marketplace'], name: 'Marketplace', route: '/marketplace' },
  //    { keywords: ['learning hub', 'learning', 'courses'], name: 'Learning Hub', route: '/learning-hub' },
  //    { keywords: ['community', 'forums'], name: 'Community', route: '/community' },
  //    { keywords: ['profile', 'account'], name: 'Profile', route: '/profile' },
  //    { keywords: ['workflow'], name: 'Workflow Designer', route: '/workflow-designer' },
  //    { keywords: ['team dashboard', 'team'], name: 'Team Dashboard', route: '/team-dashboard' },
  //    { keywords: ['pricing', 'plans'], name: 'Pricing', route: '/pricing' },
  //    { keywords: ['discovery', 'search'], name: 'Discovery', route: '/discovery' }
  //  ];
  //  
  //  // Check if the message contains navigation intent words
  //  const hasNavigationIntent = 
  //    message.includes('take me to') || 
  //    message.includes('navigate to') || 
  //    message.includes('go to') || 
  //    message.includes('show me') || 
  //    message.includes('open');
  //  
  //  if (hasNavigationIntent) {
  //    for (const mapping of navigationMappings) {
  //      if (mapping.keywords.some(keyword => message.includes(keyword))) {
  //        return mapping;
  //      }
  //    }
  //  }
  //  
  //  return null;
  //};

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
