import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { ChatMessage } from '@/components/chat/ChatContainer';
import { useUser } from '@/context/UserContext';

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

  // Mock fetching chat history
  useEffect(() => {
    if (isHistoryOpen && user) {
      fetchChatHistory();
    }
  }, [isHistoryOpen, user]);

  const fetchChatHistory = async () => {
    try {
      setIsHistoryLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create mock chat history
      const mockHistory = [
        {
          id: '1',
          message: 'How do I use the image generation tool?',
          bot_response: 'To use the image generation tool, go to the AI Tools section, select Image Generation, and enter your prompt. The tool will create an image based on your description.',
          timestamp: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        },
        {
          id: '2',
          message: 'What are the Pro tier features?',
          bot_response: 'Pro tier features include unlimited access to all AI tools, advanced customization options, priority processing, higher API limits, and exclusive early access to new features.',
          timestamp: new Date(Date.now() - 172800000).toISOString() // 2 days ago
        },
        {
          id: '3',
          message: 'How can I train a custom model?',
          bot_response: 'To train a custom model, visit the AI Studio page, click "New Model", upload your training data, and follow the guided workflow. We support fine-tuning for various model types.',
          timestamp: new Date(Date.now() - 259200000).toISOString() // 3 days ago
        }
      ];
      
      setChatHistory(mockHistory);
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
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
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
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a more intelligent response based on the input
      let response = "";
      const input = userMessage.content.toLowerCase();
      
      // Check for navigation intent first
      const navigationTarget = checkNavigationIntent(input);
      if (navigationTarget) {
        response = `I'll take you to the ${navigationTarget.name} page right away!`;
        
        // Schedule navigation after response is displayed
        setTimeout(() => {
          window.location.href = navigationTarget.route;
        }, 1000);
      } 
      // Otherwise generate an informative response
      else if (input.includes("ai tools") || input.includes("tools")) {
        response = "Our AI Tools section offers a variety of tools for different needs. You can find text analysis tools, image generators, code assistants, and more. Each tool is available based on your subscription tier. Would you like me to show you a specific category of tools?";
      } 
      else if (input.includes("learning") || input.includes("courses")) {
        response = "The Learning Hub contains courses on AI fundamentals, prompt engineering, model training, and applying AI in different industries. All courses include interactive exercises and completion certificates. Is there a specific topic you're interested in learning about?";
      } 
      else if (input.includes("pricing") || input.includes("tier") || input.includes("subscription")) {
        response = "We offer three subscription tiers: Freemium (free), Basic ($10/month), and Pro ($29/month). Each tier unlocks different features and tool access levels. Pro users get unlimited access to all tools and features. Would you like to know more about a specific tier?";
      } 
      else if (input.includes("workflow")) {
        response = "The Workflow Designer allows you to chain multiple AI tools together to automate complex processes. You can create, save, and share workflows with your team. This feature is available to Pro tier users. Would you like me to show you some example workflows?";
      } 
      else if (input.includes("studio") || input.includes("model")) {
        response = "The AI Studio is where you can customize and train your own AI models. You can upload training data, select parameters, and deploy your models for use in your applications. This advanced feature is available to Pro tier users.";
      } 
      else {
        response = "I can help you navigate the Digital Intelligence Marketplace, answer questions about our AI tools, and provide recommendations based on your needs. Feel free to ask about specific tools, learning resources, or features you're interested in!";
      }
      
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (error) {
      console.error("Error sending message:", error);
      
      setMessages(prev => [...prev, {
        id: uuidv4(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error while processing your request. Please try again later.",
        timestamp: new Date()
      }]);
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
  
  const checkNavigationIntent = (message: string): { name: string, route: string } | null => {
    const navigationMappings = [
      { keywords: ['ai studio', 'studio'], name: 'AI Studio', route: '/ai-studio' },
      { keywords: ['ai tools', 'tools directory'], name: 'AI Tools', route: '/ai-tools' },
      { keywords: ['marketplace'], name: 'Marketplace', route: '/marketplace' },
      { keywords: ['learning hub', 'learning', 'courses'], name: 'Learning Hub', route: '/learning-hub' },
      { keywords: ['community', 'forums'], name: 'Community', route: '/community' },
      { keywords: ['profile', 'account'], name: 'Profile', route: '/profile' },
      { keywords: ['workflow'], name: 'Workflow Designer', route: '/workflow-designer' },
      { keywords: ['team dashboard', 'team'], name: 'Team Dashboard', route: '/team-dashboard' },
      { keywords: ['pricing', 'plans'], name: 'Pricing', route: '/pricing' },
      { keywords: ['discovery', 'search'], name: 'Discovery', route: '/discovery' }
    ];
    
    // Check if the message contains navigation intent words
    const hasNavigationIntent = 
      message.includes('take me to') || 
      message.includes('navigate to') || 
      message.includes('go to') || 
      message.includes('show me') || 
      message.includes('open');
    
    if (hasNavigationIntent) {
      for (const mapping of navigationMappings) {
        if (mapping.keywords.some(keyword => message.includes(keyword))) {
          return mapping;
        }
      }
    }
    
    return null;
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
        
        // In a real implementation, this would send the audio to a speech-to-text service
        // For now, simulate with predetermined text
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
