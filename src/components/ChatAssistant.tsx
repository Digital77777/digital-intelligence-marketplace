
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Bot, 
  Send, 
  Mic, 
  Sparkles,
  MessageSquare,
  Zap,
  X,
  ChevronUp,
  ChevronDown,
  BarChart,
  Workflow,
  Users,
  Search,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  actions?: {
    text: string;
    path?: string;
    action?: () => void;
  }[];
}

interface QuickPrompt {
  id: string;
  text: string;
}

const ChatAssistant = () => {
  const { user, profile } = useUser();
  const { currentTier, canAccess, upgradePrompt } = useTier();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      id: 'welcome',
      content: 'Hello! I\'m your Digital Intelligence Assistant. How can I help you today?',
      role: 'assistant',
      timestamp: new Date(),
      actions: [
        { text: 'Explore AI Tools', path: '/ai-tools' },
        { text: 'Upgrade my plan', path: '/pricing' }
      ]
    }
  ]);
  const [quickPrompts, setQuickPrompts] = useState<QuickPrompt[]>([
    { id: '1', text: 'How do I integrate an NLP tool?' },
    { id: '2', text: 'What\'s the difference between tiers?' },
    { id: '3', text: 'Take me to the AI Studio' },
    { id: '4', text: 'Show me popular AI tools' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check if user has access to the chatbot
  const hasAccess = canAccess('pro-chatbot');

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    if (!hasAccess) {
      upgradePrompt('pro');
      return;
    }

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setInput('');
    setIsSending(true);

    try {
      // In a production environment, this would call the Supabase Edge Function
      // that connects to OpenAI's API
      
      // Simulate API call with timeout
      setTimeout(() => {
        handleBotResponse(input);
        setIsSending(false);
      }, 1500);
      
      // The actual implementation would look like:
      // const { data, error } = await supabase.functions.invoke('chatbot', {
      //   body: { message: input, user_id: user?.id }
      // });
      // 
      // if (error) throw error;
      // 
      // const botResponse: Message = {
      //   id: Date.now().toString() + '-response',
      //   content: data,
      //   role: 'assistant',
      //   timestamp: new Date()
      // };
      // 
      // setChatHistory(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to get a response. Please try again.');
      setIsSending(false);
    }
  };

  // Simulate bot response based on user input
  const handleBotResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    let response: Message;
    
    // Navigation intents
    if (lowerInput.includes('take me to') || lowerInput.includes('navigate to') || lowerInput.includes('go to')) {
      if (lowerInput.includes('ai tool') || lowerInput.includes('tools')) {
        response = {
          id: Date.now().toString() + '-response',
          content: 'I can help you navigate to our AI Tools section. Click the button below:',
          role: 'assistant',
          timestamp: new Date(),
          actions: [{ text: 'Go to AI Tools', path: '/ai-tools' }]
        };
      } else if (lowerInput.includes('studio')) {
        response = {
          id: Date.now().toString() + '-response',
          content: 'Let me take you to the AI Studio where you can build custom models:',
          role: 'assistant',
          timestamp: new Date(),
          actions: [{ text: 'Go to AI Studio', path: '/ai-studio' }]
        };
      } else if (lowerInput.includes('collaboration') || lowerInput.includes('team')) {
        response = {
          id: Date.now().toString() + '-response',
          content: 'I\'ll navigate you to the Collaboration Hub where you can work with your team:',
          role: 'assistant',
          timestamp: new Date(),
          actions: [{ text: 'Go to Collaboration Hub', path: '/collaboration-hub' }]
        };
      } else {
        response = {
          id: Date.now().toString() + '-response',
          content: 'I can help you navigate to different sections of the platform. Where would you like to go?',
          role: 'assistant',
          timestamp: new Date(),
          actions: [
            { text: 'AI Tools', path: '/ai-tools' },
            { text: 'Learning Hub', path: '/learning-hub' },
            { text: 'Community', path: '/forums' }
          ]
        };
      }
    }
    // Tier information
    else if (lowerInput.includes('tier') || lowerInput.includes('plan') || lowerInput.includes('pricing')) {
      response = {
        id: Date.now().toString() + '-response',
        content: 'We offer three tiers: Freemium, Basic, and Pro. The Pro tier includes advanced features like AI Studio, custom models, and this AI Assistant. Would you like to compare plans?',
        role: 'assistant',
        timestamp: new Date(),
        actions: [{ text: 'See Pricing Plans', path: '/pricing' }]
      };
    }
    // Integration help
    else if (lowerInput.includes('integrat') || lowerInput.includes('connect') || lowerInput.includes('api')) {
      response = {
        id: Date.now().toString() + '-response',
        content: 'To integrate AI tools into your workflow, you can use our API or the Workflow Designer. Here\'s a quick guide on getting started with integrations:',
        role: 'assistant',
        timestamp: new Date(),
        actions: [
          { text: 'Go to Workflow Designer', path: '/workflow-designer' },
          { text: 'View API Documentation', path: '/learning-hub' }
        ]
      };
    }
    // Model training
    else if (lowerInput.includes('train') || lowerInput.includes('model') || lowerInput.includes('custom')) {
      response = {
        id: Date.now().toString() + '-response',
        content: 'You can train custom AI models in our AI Studio. This Pro tier feature allows you to upload your data, fine-tune pre-trained models, and deploy them to your applications.',
        role: 'assistant',
        timestamp: new Date(),
        actions: [{ text: 'Go to AI Studio', path: '/ai-studio' }]
      };
    }
    // Default response
    else {
      response = {
        id: Date.now().toString() + '-response',
        content: `I understand you're asking about "${userInput}". Based on your question, here are some resources that might help:`,
        role: 'assistant',
        timestamp: new Date(),
        actions: [
          { text: 'Explore AI Tools', path: '/ai-tools' },
          { text: 'Visit Learning Hub', path: '/learning-hub' },
          { text: 'Join Community Forums', path: '/forums' }
        ]
      };
    }
    
    setChatHistory(prev => [...prev, response]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleActionClick = (path?: string, action?: () => void) => {
    if (action) {
      action();
    } else if (path) {
      navigate(path);
      setIsOpen(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleVoiceInput = () => {
    if (!hasAccess) {
      upgradePrompt('pro');
      return;
    }

    // Check if browser supports SpeechRecognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsListening(true);
      
      // This is just a simulated voice input for demo purposes
      // In a real implementation, we would use the Web Speech API
      setTimeout(() => {
        setInput('How do I train a custom vision model?');
        setIsListening(false);
      }, 2000);
      
      toast.success('Voice input captured!');
    } else {
      toast.error('Voice input is not supported in your browser');
    }
  };

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!canAccess('pro-chatbot')) {
    return null;
  }

  return (
    <>
      {/* Mobile Chat Button */}
      <div className="md:hidden fixed right-4 bottom-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button className="w-12 h-12 rounded-full bg-[#6AC8FF] hover:bg-[#6AC8FF]/90 text-gray-900 shadow-lg">
              <Bot className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] p-0 bg-gray-900 border-gray-800">
            <SheetHeader className="border-b border-gray-800 p-4">
              <SheetTitle className="text-white flex items-center gap-2">
                <Bot className="h-5 w-5 text-[#6AC8FF]" />
                <span>Digital Intelligence Assistant</span>
                <Badge className="ml-2 bg-[#6AC8FF]/20 text-[#6AC8FF] border-[#6AC8FF]/20">
                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                  Pro
                </Badge>
              </SheetTitle>
            </SheetHeader>
            
            <ScrollArea className="h-[calc(85vh-140px)] p-4">
              <div className="space-y-4">
                {chatHistory.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`flex gap-3 max-w-[85%] ${
                        message.role === 'user' 
                          ? 'flex-row-reverse' 
                          : 'flex-row'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <Avatar className="h-8 w-8 bg-[#6AC8FF]/20 text-[#6AC8FF]">
                          <Bot className="h-4 w-4" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={profile?.avatar_url || undefined} />
                          <AvatarFallback>{profile?.username?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div 
                        className={`rounded-lg p-3 ${
                          message.role === 'user' 
                            ? 'bg-[#6AC8FF] text-white' 
                            : 'bg-gray-800 text-gray-100'
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        {message.actions && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {message.actions.map((action, i) => (
                              <Button 
                                key={i}
                                size="sm" 
                                variant={message.role === 'user' ? 'secondary' : 'outline'}
                                className={message.role === 'user' ? 'bg-blue-600 text-white' : 'border-gray-700 bg-gray-800 hover:bg-gray-700'}
                                onClick={() => handleActionClick(action.path, action.action)}
                              >
                                {action.text}
                              </Button>
                            ))}
                          </div>
                        )}
                        <div 
                          className={`text-xs mt-1 ${
                            message.role === 'user' 
                              ? 'text-blue-100' 
                              : 'text-gray-400'
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isSending && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[85%]">
                      <Avatar className="h-8 w-8 bg-[#6AC8FF]/20 text-[#6AC8FF]">
                        <Bot className="h-4 w-4" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-800 rounded-lg p-4 flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin text-[#6AC8FF]" />
                        <span className="ml-2 text-gray-300">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <div className="border-t border-gray-800 p-4 bg-gray-900">
              <Tabs defaultValue="message">
                <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-800">
                  <TabsTrigger value="message">Message</TabsTrigger>
                  <TabsTrigger value="suggested">Suggested</TabsTrigger>
                </TabsList>
                
                <TabsContent value="message" className="mt-0">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      placeholder="Ask me anything..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="flex-1 bg-gray-800 border-gray-700 text-white"
                    />
                    <Button 
                      onClick={handleVoiceInput} 
                      variant="outline" 
                      size="icon" 
                      className={`border-gray-700 ${isListening ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={isSending || !input.trim()}
                      className="bg-[#6AC8FF] hover:bg-[#6AC8FF]/90 text-gray-900"
                    >
                      {isSending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="suggested" className="mt-0">
                  <div className="grid grid-cols-2 gap-2">
                    {quickPrompts.map((prompt) => (
                      <Button 
                        key={prompt.id} 
                        variant="outline" 
                        className="border-gray-700 bg-gray-800 text-white hover:bg-gray-700 justify-start text-sm h-auto py-2"
                        onClick={() => handleQuickPrompt(prompt.text)}
                      >
                        <Search className="h-3.5 w-3.5 mr-2 text-gray-400" />
                        <span className="truncate">{prompt.text}</span>
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Desktop Chat Widget */}
      <div className="hidden md:block fixed right-4 bottom-4 z-50">
        <Popover open={isOpen && !isMinimized} onOpenChange={(open) => setIsOpen(open)}>
          <PopoverTrigger asChild>
            <Button 
              className={`${
                isMinimized 
                  ? 'w-auto px-4' 
                  : 'w-12 h-12 rounded-full'
              } bg-[#6AC8FF] hover:bg-[#6AC8FF]/90 text-gray-900 shadow-lg flex items-center`}
              onClick={() => {
                if (isMinimized) {
                  toggleMinimized();
                } else if (isOpen) {
                  setIsOpen(false);
                } else {
                  setIsOpen(true);
                }
              }}
            >
              {isMinimized ? (
                <>
                  <Bot className="h-5 w-5 mr-2" />
                  <span>AI Assistant</span>
                  <ChevronUp className="h-4 w-4 ml-2" />
                </>
              ) : (
                <Bot className="h-6 w-6" />
              )}
            </Button>
          </PopoverTrigger>
          
          <PopoverContent 
            className="w-[400px] p-0 bg-gray-900 border-gray-800 rounded-lg shadow-xl" 
            sideOffset={10}
          >
            <div className="border-b border-gray-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-[#6AC8FF]/20 text-[#6AC8FF]">
                  <Bot className="h-4 w-4" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-white font-medium">Digital Intelligence Assistant</h3>
                  <p className="text-gray-400 text-xs">Powered by GPT-4</p>
                </div>
                <Badge className="ml-1 bg-[#6AC8FF]/20 text-[#6AC8FF] border-[#6AC8FF]/20">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Pro
                </Badge>
              </div>
              
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-gray-400 hover:text-white" 
                  onClick={toggleMinimized}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-gray-400 hover:text-white" 
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[350px] p-4">
              <div className="space-y-4">
                {chatHistory.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`flex gap-3 max-w-[85%] ${
                        message.role === 'user' 
                          ? 'flex-row-reverse' 
                          : 'flex-row'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <Avatar className="h-8 w-8 bg-[#6AC8FF]/20 text-[#6AC8FF]">
                          <Bot className="h-4 w-4" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={profile?.avatar_url || undefined} />
                          <AvatarFallback>{profile?.username?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div 
                        className={`rounded-lg p-3 ${
                          message.role === 'user' 
                            ? 'bg-[#6AC8FF] text-white' 
                            : 'bg-gray-800 text-gray-100'
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        {message.actions && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {message.actions.map((action, i) => (
                              <Button 
                                key={i}
                                size="sm" 
                                variant={message.role === 'user' ? 'secondary' : 'outline'}
                                className={message.role === 'user' ? 'bg-blue-600 text-white' : 'border-gray-700 bg-gray-800 hover:bg-gray-700'}
                                onClick={() => handleActionClick(action.path, action.action)}
                              >
                                {action.text}
                              </Button>
                            ))}
                          </div>
                        )}
                        <div 
                          className={`text-xs mt-1 ${
                            message.role === 'user' 
                              ? 'text-blue-100' 
                              : 'text-gray-400'
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isSending && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[85%]">
                      <Avatar className="h-8 w-8 bg-[#6AC8FF]/20 text-[#6AC8FF]">
                        <Bot className="h-4 w-4" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-800 rounded-lg p-4 flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin text-[#6AC8FF]" />
                        <span className="ml-2 text-gray-300">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <div className="border-t border-gray-800 p-4">
              <Tabs defaultValue="message">
                <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-800">
                  <TabsTrigger value="message">Message</TabsTrigger>
                  <TabsTrigger value="suggested">Suggested</TabsTrigger>
                </TabsList>
                
                <TabsContent value="message" className="mt-0">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      placeholder="Ask me anything..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="flex-1 bg-gray-800 border-gray-700 text-white"
                    />
                    <Button 
                      onClick={handleVoiceInput} 
                      variant="outline" 
                      size="icon" 
                      className={`border-gray-700 ${isListening ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={isSending || !input.trim()}
                      className="bg-[#6AC8FF] hover:bg-[#6AC8FF]/90 text-gray-900"
                    >
                      {isSending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="suggested" className="mt-0">
                  <div className="grid grid-cols-1 gap-2">
                    {quickPrompts.map((prompt) => (
                      <Button 
                        key={prompt.id} 
                        variant="outline" 
                        className="border-gray-700 bg-gray-800 text-white hover:bg-gray-700 justify-start"
                        onClick={() => handleQuickPrompt(prompt.text)}
                      >
                        <Search className="h-3.5 w-3.5 mr-2 text-gray-400" />
                        <span>{prompt.text}</span>
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-white">
                    <BarChart className="h-3.5 w-3.5 mr-1" />
                    <span>My Stats</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-white">
                    <Workflow className="h-3.5 w-3.5 mr-1" />
                    <span>History</span>
                  </Button>
                </div>
                
                <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-white">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  <span>Feedback</span>
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default ChatAssistant;
