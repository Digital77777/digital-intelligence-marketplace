
import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { Button } from '@/components/ui/button';
import { X, MessageSquare, Clock, ArrowUp, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import ChatContainer, { ChatMessage } from './chat/ChatContainer';
import ChatInput from './chat/ChatInput';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

const SUGGESTED_PROMPTS = [
  "What features are available in the Pro tier?",
  "How do I access the Learning Hub?",
  "What AI tools can I use in the freemium tier?",
  "Is there a community forum available?",
  "How do I upgrade my account?"
];

// Max free tier messages per day
const FREE_TIER_DAILY_LIMIT = 5;

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messagesRemaining, setMessagesRemaining] = useState(FREE_TIER_DAILY_LIMIT);
  const [previousMessagesLoaded, setPreviousMessagesLoaded] = useState(false);
  const { user, profile } = useUser();
  const { currentTier } = useTier();
  
  const isPro = currentTier === 'pro';
  const isBasic = currentTier === 'basic';
  
  // Load chat history from localStorage or Supabase
  useEffect(() => {
    if (user && !previousMessagesLoaded) {
      loadChatHistory();
    } else if (!user && !previousMessagesLoaded) {
      // For guest users, load from localStorage
      const savedMessages = localStorage.getItem('guest_chat_history');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
      
      // Set loaded flag
      setPreviousMessagesLoaded(true);
      
      // Get remaining messages count from localStorage
      const todayStr = new Date().toDateString();
      const usageData = JSON.parse(localStorage.getItem('chat_usage') || '{}');
      
      if (usageData.date === todayStr) {
        setMessagesRemaining(Math.max(0, FREE_TIER_DAILY_LIMIT - usageData.count));
      } else {
        // Reset for a new day
        localStorage.setItem('chat_usage', JSON.stringify({ date: todayStr, count: 0 }));
      }
    }
  }, [user, previousMessagesLoaded]);
  
  // Save messages for guest users
  useEffect(() => {
    if (!user && messages.length > 0) {
      localStorage.setItem('guest_chat_history', JSON.stringify(messages));
    }
  }, [messages, user]);
  
  const loadChatHistory = async () => {
    try {
      if (isPro) {
        // For Pro users, load from Supabase
        const { data, error } = await supabase
          .from('pro_chat_history')
          .select('*')
          .eq('user_id', user?.id)
          .order('timestamp', { ascending: true })
          .limit(50);
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          const formattedMessages: ChatMessage[] = data.map(item => ({
            id: item.id,
            message: item.message,
            isUser: true,
            timestamp: item.timestamp
          })).flatMap((userMsg, i) => {
            // Add corresponding bot response if available
            const botMsg = data[i];
            if (botMsg && botMsg.bot_response) {
              return [
                userMsg,
                {
                  id: `bot-${userMsg.id}`,
                  message: botMsg.bot_response,
                  isUser: false,
                  timestamp: botMsg.timestamp
                }
              ];
            }
            return [userMsg];
          });
          
          setMessages(formattedMessages);
        }
      }
      
      // Set loaded flag
      setPreviousMessagesLoaded(true);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };
  
  const saveMessageToSupabase = async (userMessage: string, botResponse: string) => {
    try {
      if (user && isPro) {
        const { error } = await supabase
          .from('pro_chat_history')
          .insert({
            user_id: user.id,
            message: userMessage,
            bot_response: botResponse,
            timestamp: new Date().toISOString()
          });
        
        if (error) throw error;
      }
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };
  
  const updateMessageCount = () => {
    if (!user) {
      // For guests, track usage in localStorage
      const todayStr = new Date().toDateString();
      const usageData = JSON.parse(localStorage.getItem('chat_usage') || '{}');
      
      if (usageData.date === todayStr) {
        const newCount = usageData.count + 1;
        localStorage.setItem('chat_usage', JSON.stringify({ 
          date: todayStr, 
          count: newCount 
        }));
        setMessagesRemaining(Math.max(0, FREE_TIER_DAILY_LIMIT - newCount));
      } else {
        // Reset for a new day
        localStorage.setItem('chat_usage', JSON.stringify({ 
          date: todayStr, 
          count: 1 
        }));
        setMessagesRemaining(FREE_TIER_DAILY_LIMIT - 1);
      }
    }
  };
  
  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    // Check message limit for free users
    if (!isPro && !isBasic && messagesRemaining <= 0) {
      toast.error("You've reached your daily message limit. Upgrade to Basic or Pro for unlimited access.");
      return;
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
            userId: user?.id || 'guest',
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
      
      // Save message to Supabase for Pro users
      if (isPro) {
        saveMessageToSupabase(message, data.response);
      }
      
      // Update message count for non-Pro users
      if (!isPro && !isBasic) {
        updateMessageCount();
      }
    } catch (error) {
      console.error('Chat assistant error:', error);
      toast.error('Failed to get a response from the assistant. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };
  
  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };
  
  const closeChat = () => {
    setIsOpen(false);
  };
  
  const EmptyState = () => (
    <div className="text-center">
      <MessageSquare className="h-12 w-12 mx-auto mb-3 text-primary/40" />
      <h3 className="text-lg font-medium mb-2">Welcome to the AI Assistant!</h3>
      <p className="text-sm text-muted-foreground mb-4">
        How can I help you today? You can ask me about platform features, AI tools, or learning resources.
      </p>
      <div className="space-y-2">
        {SUGGESTED_PROMPTS.slice(0, 3).map((prompt) => (
          <Button
            key={prompt}
            variant="outline"
            size="sm"
            className="text-xs w-full justify-start"
            onClick={() => handlePromptClick(prompt)}
          >
            <ArrowUp className="h-3 w-3 mr-2 rotate-45" />
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
  
  return (
    <>
      {/* Chat button */}
      <div className="fixed right-4 bottom-4 z-40">
        <Button
          onClick={toggleChat}
          size="icon"
          className={`h-12 w-12 rounded-full shadow-lg ${isOpen ? 'bg-red-500 hover:bg-red-600' : ''}`}
        >
          {isOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 w-[350px] md:w-[400px] h-[500px] z-30 shadow-xl"
          >
            <Card className="h-full flex flex-col">
              <CardHeader className="px-4 py-3 border-b flex-shrink-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">AI Assistant</h3>
                    {isPro && (
                      <Badge className="bg-purple-500 hover:bg-purple-600 text-xs">Pro</Badge>
                    )}
                    {isBasic && (
                      <Badge className="bg-blue-500 hover:bg-blue-600 text-xs">Basic</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {!isPro && !isBasic && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{messagesRemaining}/{FREE_TIER_DAILY_LIMIT}</span>
                      </div>
                    )}
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={closeChat}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <ChatContainer
                messages={messages}
                isLoading={isLoading}
                emptyState={<EmptyState />}
                avatar={profile?.avatar_url || undefined}
              />
              
              <CardFooter className="px-4 py-3 border-t">
                <ChatInput
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                  placeholder="Type your message..."
                />
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
