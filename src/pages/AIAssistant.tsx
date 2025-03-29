
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { BrainCircuit, Send, Plus, Bot, Settings, History, Sparkles, Save, Info } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import ChatContainer, { ChatMessage } from '@/components/chat/ChatContainer';
import ChatInput from '@/components/chat/ChatInput';
import { sendChatMessage, fetchChatHistory } from '@/utils/chatUtils';

const AIAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userPrompts, setUserPrompts] = useState<any[]>([]);
  const [chatSessionId, setChatSessionId] = useState(() => uuidv4());
  const [activeTab, setActiveTab] = useState('new-chat');
  
  const navigate = useNavigate();
  const { user } = useUser();
  const { currentTier, canAccess, upgradePrompt } = useTier();
  
  // Check if user has access to this pro feature
  useEffect(() => {
    if (!canAccess('pro-chatbot')) {
      upgradePrompt('pro');
      navigate('/pricing');
    }
  }, [canAccess, upgradePrompt, navigate]);
  
  // Fetch user's saved prompts
  useEffect(() => {
    if (user) {
      fetchSavedPrompts();
      loadChatHistory();
    }
  }, [user]);
  
  const fetchSavedPrompts = async () => {
    try {
      const { data, error } = await supabase
        .from('user_prompts')
        .select('*')
        .eq('user_id', user?.id);
        
      if (error) throw error;
      
      if (data) {
        setUserPrompts(data);
      }
    } catch (error) {
      console.error('Error fetching saved prompts:', error);
    }
  };
  
  const loadChatHistory = async () => {
    try {
      if (!user) return;
      
      const history = await fetchChatHistory(user.id);
      
      if (history.length > 0) {
        // Load the most recent conversation
        const latestSession = history[0];
        setChatSessionId(latestSession.id);
        setMessages(latestSession.messages.map((msg: any) => ({
          id: uuidv4(),
          role: msg.role,
          content: msg.content,
          timestamp: new Date(msg.timestamp)
        })));
      } else {
        // Initialize with welcome message
        setMessages([{
          id: uuidv4(),
          role: 'assistant',
          content: "Hello! I'm your AI assistant, specialized in helping with complex AI concepts, coding, and data analysis. How can I help you today?",
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      toast.error('Failed to load chat history');
    }
  };
  
  const savePrompt = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic name');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('user_prompts')
        .insert([
          { 
            user_id: user?.id, 
            title: topic, 
            content: input, 
            created_at: new Date() 
          }
        ]);
        
      if (error) throw error;
      
      toast.success('Prompt saved successfully');
      fetchSavedPrompts();
      setTopic('');
    } catch (error) {
      console.error('Error saving prompt:', error);
      toast.error('Failed to save prompt');
    }
  };
  
  const loadPrompt = (content: string) => {
    setInput(content);
  };
  
  const startNewChat = () => {
    const newSessionId = uuidv4();
    setChatSessionId(newSessionId);
    setMessages([{
      id: uuidv4(),
      role: 'assistant',
      content: "Hello! I'm your AI assistant, specialized in helping with complex AI concepts, coding, and data analysis. How can I help you today?",
      timestamp: new Date()
    }]);
    setInput('');
  };
  
  const handleSubmitMessage = async (message: string) => {
    if (!message.trim()) return;
    
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Send message to backend
      const response = await sendChatMessage(
        user?.id as string,
        chatSessionId,
        userMessage.content,
        messages
      );
      
      // Add assistant response
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to get response from AI');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!canAccess('pro-chatbot')) {
    return (
      <ProTierLayout pageTitle="AI Assistant" requiredFeature="pro-chatbot">
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <BrainCircuit className="h-16 w-16 text-primary mb-4" />
          <h1 className="text-2xl font-bold mb-2">Advanced AI Assistant</h1>
          <p className="text-muted-foreground mb-6 max-w-md">
            Unlock our powerful AI Assistant with the Pro tier to help with complex AI concepts, coding, and data analysis.
          </p>
          <Button onClick={() => navigate('/pricing')}>Upgrade to Pro</Button>
        </div>
      </ProTierLayout>
    );
  }
  
  return (
    <ProTierLayout pageTitle="AI Assistant" requiredFeature="pro-chatbot">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 border-r bg-background p-4 hidden md:block">
          <Button variant="outline" className="w-full mb-4" onClick={startNewChat}>
            <Plus className="h-4 w-4 mr-2" /> New Chat
          </Button>
          
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="history">
                <History className="h-4 w-4 mr-2" /> History
              </TabsTrigger>
              <TabsTrigger value="prompts">
                <Save className="h-4 w-4 mr-2" /> Prompts
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="history" className="space-y-2">
              {/* Chat history would go here */}
              <p className="text-sm text-muted-foreground text-center py-4">
                Your chat history will appear here
              </p>
            </TabsContent>
            
            <TabsContent value="prompts" className="space-y-2">
              {userPrompts.length > 0 ? (
                userPrompts.map((prompt) => (
                  <Card key={prompt.id} className="cursor-pointer hover:bg-muted/50" onClick={() => loadPrompt(prompt.content)}>
                    <CardContent className="p-3">
                      <p className="text-sm font-medium truncate">{prompt.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{prompt.content.substring(0, 50)}...</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No saved prompts yet
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-full">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="border-b p-2 flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="new-chat" className="flex items-center">
                  <Bot className="h-4 w-4 mr-2" /> AI Assistant
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" /> Settings
                </TabsTrigger>
              </TabsList>
              
              <Badge variant="outline" className="ml-auto bg-primary/10 text-primary">
                <Sparkles className="h-3.5 w-3.5 mr-1" /> PRO
              </Badge>
            </div>
            
            <TabsContent value="new-chat" className="flex-1 flex flex-col">
              <div className="flex-1 overflow-auto">
                <ChatContainer messages={messages} isLoading={isLoading} />
              </div>
              
              <div className="p-4 border-t">
                <ChatInput 
                  onSubmit={handleSubmitMessage} 
                  isLoading={isLoading} 
                  placeholder="Ask me anything about AI, coding, or data analysis..."
                />
                
                {/* Save prompt UI */}
                <div className="flex items-center mt-2 space-x-2">
                  <Input
                    placeholder="Name this prompt to save it"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm" onClick={savePrompt} disabled={!input.trim() || !topic.trim()}>
                    <Save className="h-4 w-4 mr-2" /> Save
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="p-4">
              <h2 className="text-xl font-bold mb-4">Assistant Settings</h2>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-2">
                      <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium">About this Assistant</h3>
                        <p className="text-sm text-muted-foreground">
                          This AI Assistant is powered by advanced language models and 
                          specialized in AI concepts, coding, and data analysis. 
                          Your conversations are private and secure.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Additional settings would go here */}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProTierLayout>
  );
};

export default AIAssistant;
