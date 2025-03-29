
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, X, Send, MessageCircle, ChevronUp, ChevronDown, Mic, MicOff, Maximize2, Minimize2, MoreVertical, History } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import ChatContainer, { ChatMessage } from '@/components/chat/ChatContainer';

const suggestedPrompts = [
  "How do I integrate an NLP tool into my workflow?",
  "What's the difference between Basic and Pro tiers?",
  "Take me to the AI Studio page",
  "How can I train a custom vision model?",
  "Show me the latest AI tools in computer vision"
];

const ProChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const { user } = useUser();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: uuidv4(),
          role: 'assistant',
          content: "Hello! I'm your Pro AI Assistant for the Digital Intelligence Marketplace. I can help you navigate the platform, answer questions about AI tools, and provide personalized recommendations. What would you like to know?",
          timestamp: new Date()
        }
      ]);
    }
  }, [messages.length]);

  // Fetch chat history when history panel is opened
  useEffect(() => {
    if (isHistoryOpen && user) {
      fetchChatHistory();
    }
  }, [isHistoryOpen, user]);

  const fetchChatHistory = async () => {
    if (!user) return;
    
    try {
      setIsHistoryLoading(true);
      
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        toast.error("You need to be logged in to view chat history");
        return;
      }
      
      const { data, error } = await supabase.functions.invoke('pro-chat/history', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });
      
      if (error) throw error;
      
      setChatHistory(data.data || []);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      toast.error("Could not fetch chat history");
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isHistoryOpen) {
      setIsHistoryOpen(false);
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const toggleHistoryPanel = () => {
    setIsHistoryOpen(!isHistoryOpen);
    if (isHistoryOpen) {
      fetchChatHistory();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    if (!user) {
      toast.error("You need to be logged in to use the Pro AI Assistant");
      return;
    }
    
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        throw new Error("No active session");
      }
      
      const { data, error } = await supabase.functions.invoke('pro-chat/query', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
        body: { message: userMessage.content },
      });
      
      if (error) throw error;
      
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Check if it's a navigation intent and handle it
      if (userMessage.content.toLowerCase().includes('take me to') || 
          userMessage.content.toLowerCase().includes('navigate to') ||
          userMessage.content.toLowerCase().includes('open')) {
        handleNavigationIntent(userMessage.content);
      }
      
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Add error message
      setMessages(prev => [...prev, {
        id: uuidv4(),
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request. Please try again later.',
        timestamp: new Date()
      }]);
      
      toast.error("Error communicating with AI Assistant");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNavigationIntent = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Map of keywords to routes
    const navigationMappings: Record<string, string> = {
      'ai studio': '/ai-studio',
      'ai tools': '/ai-tools',
      'tools directory': '/ai-tools-directory',
      'marketplace': '/marketplace',
      'learning hub': '/learning-hub',
      'community': '/community',
      'forums': '/forums',
      'profile': '/profile',
      'business insights': '/business-insights',
      'model marketplace': '/model-marketplace',
      'workflow designer': '/workflow-designer',
      'collaboration hub': '/collaboration-hub',
      'team dashboard': '/team-dashboard',
      'pricing': '/pricing',
      'discovery': '/discovery'
    };
    
    for (const [keyword, route] of Object.entries(navigationMappings)) {
      if (lowerMessage.includes(keyword)) {
        // Add a short delay to allow the response to be displayed
        setTimeout(() => {
          window.location.href = route;
        }, 1500);
        return;
      }
    }
  };

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode);
    if (isRecording) {
      stopRecording();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        
        // In a real implementation, you would send this audioBlob to a speech-to-text service
        // For now, we'll simulate it with a timeout and predefined text
        setIsLoading(true);
        setTimeout(() => {
          const simulatedText = "How do I train a custom vision model?";
          setInputValue(simulatedText);
          setIsLoading(false);
        }, 1000);
        
        // Release microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      toast.success("Recording started. Speak your question!");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Could not access microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success("Recording stopped");
    }
  };

  const handleVoiceButton = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  const handleLoadHistoryItem = (item: any) => {
    // Add the previous conversation to the current chat
    setMessages(prev => [
      ...prev,
      {
        id: uuidv4(),
        role: 'user',
        content: item.message,
        timestamp: new Date(item.timestamp)
      },
      {
        id: uuidv4(),
        role: 'assistant',
        content: item.bot_response,
        timestamp: new Date(item.timestamp)
      }
    ]);
    
    // Close the history panel
    setIsHistoryOpen(false);
  };

  const clearChat = () => {
    setMessages([{
      id: uuidv4(),
      role: 'assistant',
      content: "Chat cleared! How else can I assist you today?",
      timestamp: new Date()
    }]);
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
        <Card 
          className={cn(
            "fixed border shadow-lg z-50 overflow-hidden transition-all duration-200",
            isFullScreen 
              ? "inset-4 h-auto" 
              : "bottom-16 right-4 w-80 sm:w-96 h-[500px]",
            isHistoryOpen ? "flex flex-row" : "flex flex-col"
          )}
        >
          {isHistoryOpen && (
            <div className="w-64 border-r bg-muted/30 flex flex-col">
              <div className="p-3 border-b bg-muted/50 font-medium flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <History size={14} />
                  Chat History
                </span>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleHistoryPanel}>
                  <X size={14} />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {isHistoryLoading ? (
                  <div className="flex justify-center items-center h-20">
                    <Spinner size="sm" />
                  </div>
                ) : chatHistory.length === 0 ? (
                  <div className="text-center text-muted-foreground p-4 text-sm">
                    No chat history found
                  </div>
                ) : (
                  <div className="space-y-2">
                    {chatHistory.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleLoadHistoryItem(item)}
                        className="w-full text-left p-2 hover:bg-muted rounded-md text-xs border border-transparent hover:border-border transition-colors"
                      >
                        <div className="font-medium truncate">{item.message}</div>
                        <div className="text-muted-foreground text-xs mt-1">
                          {new Date(item.timestamp).toLocaleString()}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className={cn("flex flex-col flex-1", isHistoryOpen ? "w-[calc(100%-16rem)]" : "w-full")}>
            {/* Chat header */}
            <div className="bg-primary text-primary-foreground p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-primary-foreground/10">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </Avatar>
                <div>
                  <h3 className="font-medium text-sm">Pro AI Assistant</h3>
                </div>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={toggleHistoryPanel}
                >
                  <History size={16} />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    >
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={clearChat}>Clear Chat</DropdownMenuItem>
                    <DropdownMenuItem onClick={toggleVoiceMode}>
                      {isVoiceMode ? "Switch to Text Input" : "Switch to Voice Input"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={toggleFullScreen}
                >
                  {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10" 
                  onClick={toggleChat}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
            
            {/* Chat messages */}
            <ChatContainer messages={messages} isLoading={isLoading} />
            
            {/* Suggested prompts */}
            {messages.length < 3 && (
              <div className="p-3 border-t">
                <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.slice(0, 3).map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-auto py-1 px-2 whitespace-nowrap"
                      onClick={() => handleSuggestedPrompt(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Chat input */}
            <div className="p-3 border-t bg-background mt-auto">
              <div className="flex gap-2">
                {isVoiceMode ? (
                  <Button
                    variant={isRecording ? "destructive" : "default"}
                    size="icon"
                    className="flex-shrink-0"
                    onClick={handleVoiceButton}
                  >
                    {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                  </Button>
                ) : (
                  <>
                    <Textarea
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                    />
                    <Button 
                      variant="default"
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={isLoading || !inputValue.trim()}
                      className="flex-shrink-0"
                    >
                      {isLoading ? <Spinner size="sm" /> : <Send size={18} />}
                    </Button>
                  </>
                )}
              </div>
              {isVoiceMode && (
                <div className="mt-2 text-center text-sm text-muted-foreground">
                  {isRecording 
                    ? "Recording... Click the button again to stop." 
                    : "Click the microphone button to start speaking."}
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

// Helper function to conditionally join class names
const cn = (...classes: (string | undefined | boolean)[]) => 
  classes.filter(Boolean).join(' ');

export default ProChatAssistant;
