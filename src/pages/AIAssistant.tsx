
import React, { useState, useRef, useEffect } from 'react';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Send, Bot, Sparkles, Zap, Save, Copy, Trash, Settings } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  model: string;
  lastUpdated: Date;
}

const models = [
  { value: 'gpt-4o', label: 'GPT-4o', description: 'Most capable model for complex tasks' },
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini', description: 'Fast and efficient for most tasks' }
];

const AIAssistant = () => {
  const { user, profile } = useUser();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load or create a new conversation on component mount
  useEffect(() => {
    // Initialize with a new conversation if none exist
    if (!activeConversation) {
      const newConversation: Conversation = {
        id: generateId(),
        title: 'New Conversation',
        messages: [
          {
            id: generateId(),
            role: 'system',
            content: 'I am Digital Intelligence Assistant, here to help with your AI and data science questions. How can I help you today?',
            timestamp: new Date()
          }
        ],
        model: selectedModel,
        lastUpdated: new Date()
      };
      setConversations([newConversation]);
      setActiveConversation(newConversation);
    }
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !activeConversation) return;
    
    // Add user message to conversation
    const userMessage: Message = {
      id: generateId(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };
    
    const updatedMessages = [...activeConversation.messages, userMessage];
    updateConversation({
      ...activeConversation,
      messages: updatedMessages,
      lastUpdated: new Date()
    });
    
    setInput('');
    setIsLoading(true);
    
    try {
      // In a real implementation, you would call an API endpoint
      // For this demo, we'll simulate a response after a delay
      setTimeout(() => {
        const assistantMessage: Message = {
          id: generateId(),
          content: generateResponse(input),
          role: 'assistant',
          timestamp: new Date()
        };
        
        const finalMessages = [...updatedMessages, assistantMessage];
        updateConversation({
          ...activeConversation,
          messages: finalMessages,
          lastUpdated: new Date()
        });
        
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error generating response:', error);
      setIsLoading(false);
    }
  };

  // Simple response generator for demonstration
  const generateResponse = (query: string): string => {
    const responses = [
      "I understand you're asking about " + query.split(' ').slice(0, 3).join(' ') + "... Here's what you need to know: this is a sophisticated topic in AI that involves multiple dimensions of analysis and processing. The key aspects to understand include data preprocessing, model selection, and evaluation criteria.",
      "Great question about " + query.split(' ').slice(0, 3).join(' ') + ". When working with AI models, it's important to consider both the theoretical foundations and practical applications. Current research suggests that optimizing for both accuracy and computational efficiency yields the best results.",
      "Regarding " + query.split(' ').slice(0, 3).join(' ') + ", the Digital Intelligence platform offers several tools to help you explore this concept further. I recommend checking our learning resources and advanced tools section for practical examples and case studies.",
      "Your question about " + query.split(' ').slice(0, 3).join(' ') + " touches on an evolving area of AI research. The current consensus is that hybrid approaches combining statistical methods with deep learning often produce the most robust solutions for complex problems."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const updateConversation = (updatedConversation: Conversation) => {
    setActiveConversation(updatedConversation);
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === updatedConversation.id ? updatedConversation : conv
      )
    );
  };

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: generateId(),
      title: 'New Conversation',
      messages: [
        {
          id: generateId(),
          role: 'system',
          content: 'I am Digital Intelligence Assistant, here to help with your AI and data science questions. How can I help you today?',
          timestamp: new Date()
        }
      ],
      model: selectedModel,
      lastUpdated: new Date()
    };
    
    setConversations([...conversations, newConversation]);
    setActiveConversation(newConversation);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ProTierLayout pageTitle="AI Assistant" requiredFeature="pro-chatbot">
      <div className="flex h-[calc(100vh-240px)] gap-4 text-white">
        {/* Sidebar with conversation history */}
        <div className="w-64 shrink-0 hidden md:block">
          <Card className="h-full bg-gray-900/70 border-gray-800">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Conversations</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={createNewConversation}
                  className="h-8 w-8 text-white hover:text-white hover:bg-gray-800"
                >
                  <Zap className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <ScrollArea className="h-[calc(100vh-340px)]">
                <div className="space-y-2 pr-2">
                  {conversations.map(conversation => (
                    <Button
                      key={conversation.id}
                      variant="ghost"
                      className={`w-full justify-start text-left p-2 h-auto ${
                        activeConversation?.id === conversation.id 
                          ? 'bg-gray-800 hover:bg-gray-800' 
                          : 'hover:bg-gray-800/50'
                      }`}
                      onClick={() => setActiveConversation(conversation)}
                    >
                      <div>
                        <div className="flex items-center gap-2 font-medium mb-0.5">
                          <Bot className="h-3.5 w-3.5" />
                          <span className="truncate">{conversation.title}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {conversation.lastUpdated.toLocaleDateString()}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="border-t border-gray-800 p-4">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  {models.map(model => (
                    <SelectItem key={model.value} value={model.value}>
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-3.5 w-3.5 text-[#6AC8FF]" />
                        <span>{model.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardFooter>
          </Card>
        </div>
        
        {/* Main chat interface */}
        <div className="flex-1">
          <Card className="h-full bg-gray-900/70 border-gray-800 relative flex flex-col">
            <CardHeader className="border-b border-gray-800 p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#6AC8FF]/20 text-[#6AC8FF] border-[#6AC8FF]/20">
                    <Sparkles className="h-3.5 w-3.5 mr-1" />
                    Pro
                  </Badge>
                  <span className="text-sm text-gray-300">
                    {selectedModel === 'gpt-4o' ? 'GPT-4o' : 'GPT-4o Mini'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                    <Trash className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 p-4 overflow-auto">
              <ScrollArea className="h-[calc(100vh-400px)]">
                <div className="space-y-6">
                  {activeConversation?.messages.map((message, index) => {
                    // Skip the system message at the beginning
                    if (index === 0 && message.role === 'system') return null;
                    
                    return (
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
                    );
                  })}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-[85%]">
                        <Avatar className="h-8 w-8 bg-[#6AC8FF]/20 text-[#6AC8FF]">
                          <Bot className="h-4 w-4" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-800 rounded-lg p-4 flex items-center">
                          <Loader2 className="h-5 w-5 animate-spin text-[#6AC8FF]" />
                          <span className="ml-2 text-gray-300">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
            
            <CardFooter className="border-t border-gray-800 p-4">
              <div className="w-full flex gap-2">
                <Input
                  placeholder="Message Digital Intelligence Assistant..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 bg-gray-800 border-gray-700 text-white"
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={isLoading || !input.trim()}
                  className="bg-[#6AC8FF] hover:bg-[#6AC8FF]/90 text-gray-900"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </ProTierLayout>
  );
};

export default AIAssistant;
