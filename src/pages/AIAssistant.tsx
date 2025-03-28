
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { 
  Bot, 
  MessageSquare, 
  ArrowRight, 
  Info, 
  RefreshCw, 
  Star, 
  Clock, 
  Download,
  Trash2,
  Search,
  Filter,
  FileText,
  Sparkles,
  ShieldCheck,
  PlusCircle,
  ChevronRight
} from 'lucide-react';
import ChatContainer, { ChatMessage } from '@/components/chat/ChatContainer';
import ChatInput from '@/components/chat/ChatInput';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';

const EXAMPLE_PROMPTS = [
  "Explain how to build a recommendation system for an e-commerce site",
  "What are the best AI tools for natural language processing?",
  "Compare and contrast different machine learning frameworks",
  "How can I integrate computer vision into my web application?",
  "What are the latest advancements in transformer models?",
  "Explain how to fine-tune a GPT model for my specific use case",
  "How do I protect user privacy when building AI applications?",
  "What's the difference between supervised and unsupervised learning?",
  "How can I optimize the performance of my machine learning models?"
];

const AIAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<{ id: string; title: string; preview: string; date: string }[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, profile } = useUser();
  const { currentTier, canAccess } = useTier();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has access to Pro features
    if (!canAccess('pro')) {
      navigate('/pricing');
      toast.error('AI Assistant is a Pro feature');
      return;
    }

    // Load conversations for Pro users
    if (user) {
      loadConversations();
    }
  }, [user, canAccess, navigate]);

  const loadConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('pro_chat_history')
        .select('*')
        .eq('user_id', user?.id)
        .order('timestamp', { ascending: false });
      
      if (error) throw error;
      
      // Process conversations (group by conversation)
      // For now we'll use a simplified approach with mock data
      const mockConversations = [
        {
          id: '1',
          title: 'Understanding GPT Models',
          preview: 'What's the difference between GPT-3 and GPT-4?',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          title: 'Computer Vision Applications',
          preview: 'How can I implement object detection in my app?',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '3',
          title: 'Machine Learning Deployment',
          preview: 'What are best practices for deploying ML models to production?',
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      
      setConversations(mockConversations);
      
      // If we have real data, use it to create conversations
      if (data && data.length > 0) {
        // TODO: Implement proper conversation grouping
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    // Create a new conversation if none is active
    if (!activeConversation) {
      const newConversationId = uuidv4();
      setActiveConversation(newConversationId);
      
      // Add to conversations list with a title derived from the message
      setConversations(prev => [
        {
          id: newConversationId,
          title: message.length > 30 ? message.substring(0, 30) + '...' : message,
          preview: message,
          date: new Date().toISOString()
        },
        ...prev
      ]);
    }
    
    const userMessage: ChatMessage = {
      id: uuidv4(),
      message,
      isUser: true,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Format previous messages for context
      const previousMessages = messages
        .slice(-10) // Just the last 10 messages for context
        .map(msg => ({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.message
        }));
      
      // Call the chatbot function
      const response = await fetch(
        'https://bqtxpbxoahfuuardbrmc.supabase.co/functions/v1/chatbot',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            message,
            userId: user?.id,
            previousMessages
          })
        }
      );
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const botMessage: ChatMessage = {
        id: uuidv4(),
        message: data.response,
        isUser: false,
        timestamp: data.timestamp || new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Save message to Supabase
      saveMessageToSupabase(message, data.response);
      
      // Update conversation preview
      setConversations(prev => 
        prev.map(conv => 
          conv.id === activeConversation 
            ? { ...conv, preview: message } 
            : conv
        )
      );
    } catch (error: any) {
      console.error('Chat assistant error:', error);
      toast.error(error.message || 'Failed to get a response');
    } finally {
      setIsLoading(false);
    }
  };
  
  const saveMessageToSupabase = async (userMessage: string, botResponse: string) => {
    try {
      if (user) {
        const { error } = await supabase
          .from('pro_chat_history')
          .insert({
            user_id: user.id,
            message: userMessage,
            bot_response: botResponse,
            timestamp: new Date().toISOString(),
            metadata: { conversation_id: activeConversation }
          });
        
        if (error) throw error;
      }
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };
  
  const selectConversation = (id: string) => {
    setActiveConversation(id);
    // TODO: Load messages for this conversation
    
    // For now, simulate loading messages
    setMessages([
      {
        id: 'user-1',
        message: 'What's the difference between GPT-3 and GPT-4?',
        isUser: true,
        timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString()
      },
      {
        id: 'bot-1',
        message: 'GPT-4 is more advanced than GPT-3 with several improvements:\n\n1. Improved reasoning and problem-solving abilities\n2. Better context handling and longer memory\n3. More nuanced understanding of complex instructions\n4. Reduced hallucinations and factual errors\n5. Multimodal capabilities (can process both text and images)\n\nIt\'s also more expensive to use and has stricter rate limits than GPT-3.',
        isUser: false,
        timestamp: new Date(Date.now() - 1 * 60 * 1000).toISOString()
      }
    ]);
  };
  
  const startNewConversation = () => {
    setActiveConversation(null);
    setMessages([]);
  };
  
  const clearConversations = () => {
    // TODO: Implement clear all conversations
    setConversations([]);
    setActiveConversation(null);
    setMessages([]);
    toast.success('All conversations cleared');
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const EmptyState = () => (
    <div className="text-center">
      <Bot className="h-16 w-16 mx-auto mb-4 text-primary/30" />
      <h3 className="text-xl font-medium mb-2">Pro AI Assistant</h3>
      <p className="text-base text-muted-foreground mb-6 max-w-md mx-auto">
        Get expert help with machine learning, computer vision, NLP, and other AI technologies. Ask any question to get started.
      </p>
      <div className="max-w-md mx-auto grid grid-cols-1 gap-3 mb-8">
        {EXAMPLE_PROMPTS.slice(0, 3).map((prompt) => (
          <Button
            key={prompt}
            variant="outline"
            className="justify-start text-sm h-auto py-3"
            onClick={() => handlePromptClick(prompt)}
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Pro AI Assistant</h1>
            <p className="text-muted-foreground">
              Get expert assistance with your AI and machine learning questions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left sidebar - conversation history */}
            <div className="lg:col-span-1">
              <Card className="h-[calc(100vh-200px)]">
                <CardHeader className="px-4 py-3 border-b flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <CardTitle className="text-base">Conversations</CardTitle>
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={startNewConversation}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <div className="p-3">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      placeholder="Search conversations" 
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <ScrollArea className="h-[calc(100%-130px)]">
                  {conversations.length > 0 ? (
                    <div className="px-3 pb-3 space-y-2">
                      {conversations.map((conversation) => (
                        <div 
                          key={conversation.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            activeConversation === conversation.id 
                              ? 'bg-primary text-primary-foreground' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => selectConversation(conversation.id)}
                        >
                          <div className="font-medium text-sm line-clamp-1 mb-1">
                            {conversation.title}
                          </div>
                          <div className="text-xs line-clamp-1 mb-1 opacity-80">
                            {conversation.preview}
                          </div>
                          <div className={`text-xs ${
                            activeConversation === conversation.id 
                              ? 'text-primary-foreground/70' 
                              : 'text-muted-foreground'
                          }`}>
                            {formatDate(conversation.date)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-3 py-8 text-center text-muted-foreground">
                      <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-40" />
                      <p className="text-sm">No conversations yet</p>
                    </div>
                  )}
                </ScrollArea>
                <CardFooter className="border-t p-3 flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs h-8 px-2" 
                    onClick={clearConversations}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    Clear All
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Main chat area */}
            <div className="lg:col-span-3">
              <Card className="h-[calc(100vh-200px)] flex flex-col">
                <CardHeader className="px-6 py-4 border-b flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        {activeConversation 
                          ? conversations.find(c => c.id === activeConversation)?.title || 'AI Assistant' 
                          : 'AI Assistant'
                        }
                      </CardTitle>
                      <CardDescription>
                        Powered by gpt-4o-mini for intelligent AI and machine learning assistance
                      </CardDescription>
                    </div>
                    <Badge className="bg-purple-600 hover:bg-purple-700">Pro Feature</Badge>
                  </div>
                </CardHeader>
                
                <ChatContainer
                  messages={messages}
                  isLoading={isLoading}
                  emptyState={<EmptyState />}
                  avatar={profile?.avatar_url || undefined}
                />
                
                <CardFooter className="border-t p-4">
                  <ChatInput
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                    placeholder="Ask about AI, machine learning, or data science..."
                  />
                </CardFooter>
              </Card>
            </div>
          </div>
          
          {/* Pro features showcase */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Pro AI Assistant Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                      <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-lg">Advanced AI</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Powered by cutting-edge models with specialized knowledge of AI, machine learning, and data science.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
                      <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-lg">Unlimited Access</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No limits on messages, conversation length, or number of topics you can discuss.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
                      <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-lg">Secure History</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All conversations are securely stored and available for future reference with powerful search.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Example topics */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Ask About...</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {EXAMPLE_PROMPTS.slice(3, 9).map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  className="justify-start h-auto text-sm py-3"
                  onClick={() => handlePromptClick(prompt)}
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIAssistant;
