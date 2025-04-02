
import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { ChatMessage } from '@/components/chat/ChatContainer';

export const useProChat = () => {
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

  return {
    isOpen,
    isFullScreen,
    messages,
    inputValue,
    isLoading,
    isVoiceMode,
    isRecording,
    isHistoryOpen,
    chatHistory,
    isHistoryLoading,
    toggleChat,
    toggleFullScreen,
    toggleHistoryPanel,
    handleInputChange,
    handleSendMessage,
    handleKeyPress,
    toggleVoiceMode,
    handleVoiceButton,
    handleSuggestedPrompt,
    handleLoadHistoryItem,
    clearChat
  };
};
