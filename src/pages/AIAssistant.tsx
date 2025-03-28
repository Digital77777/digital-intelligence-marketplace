
import React, { useState, useEffect } from 'react';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import ChatContainer, { ChatMessage } from '@/components/chat/ChatContainer';
import ChatInput from '@/components/chat/ChatInput';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';
import { supabase } from '@/integrations/supabase/client';

const EXAMPLE_PROMPTS = [
  "Explain how to build a recommendation system for an e-commerce site",
  "What's the difference between GPT-3 and GPT-4?",
  "How can I optimize my machine learning model?",
  "What APIs should I use for a sentiment analysis tool?",
  "Compare supervised vs unsupervised learning",
  "Explain the concept of transfer learning",
];

const AIAssistant = () => {
  const { user } = useUser();
  const { canAccess } = useTier();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check access and load chat history on component mount
  useEffect(() => {
    if (!canAccess('pro')) {
      navigate('/pricing');
      toast({
        title: "Pro Tier Required",
        description: "This feature requires a Pro tier subscription",
        variant: "destructive",
      });
      return;
    }

    fetchChatHistory();
  }, [canAccess, navigate, user?.id]);

  const fetchChatHistory = async () => {
    if (!user) {
      setIsFetching(false);
      return;
    }

    try {
      setIsFetching(true);
      
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) throw new Error('Authentication required');
      
      const token = sessionData.session.access_token;
      
      const response = await fetch(`${supabase.functions.url}/pro-chat/history`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const result = await response.json();
      
      if (result.data && Array.isArray(result.data)) {
        // Transform the database format to our ChatMessage format
        const chatHistory = result.data.map((item: any) => [
          {
            id: `user-${item.id}`,
            message: item.message,
            isUser: true,
            timestamp: item.timestamp
          },
          {
            id: `bot-${item.id}`,
            message: item.bot_response,
            isUser: false,
            timestamp: item.timestamp
          }
        ]).flat();
        
        setMessages(chatHistory.reverse());
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
      // If it's a new user or there's an error, just set some welcome messages
      setMessages([
        {
          id: 'welcome-1',
          message: 'Hi there! I\'m your AI Assistant. How can I help you today?',
          isUser: false,
          timestamp: new Date().toISOString()
        }
      ]);
    } finally {
      setIsFetching(false);
    }
  };

  const saveChatToHistory = async (userMessage: string, botResponse: string) => {
    if (!user) return;
    
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) return;
      
      const token = sessionData.session.access_token;
      
      await fetch(`${supabase.functions.url}/pro-chat/history`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          botResponse: botResponse,
          metadata: { type: 'ai_assistant' }
        }),
      });
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  const handleMessageSubmit = async (message: string) => {
    if (!message.trim()) return;
    
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      message,
      isUser: true,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Simulate AI response (replace with actual API call in production)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const botResponse = await getAIResponse(message);
      
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        message: botResponse,
        isUser: false,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Save the conversation to history
      await saveChatToHistory(message, botResponse);
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // This is a mock function - replace with actual AI service integration
  const getAIResponse = async (message: string): Promise<string> => {
    // Simple response mapping for demo purposes
    if (message.toLowerCase().includes('recommendation system')) {
      return "Building a recommendation system for e-commerce typically involves these steps:\n\n1. Collect user data (browsing history, purchases)\n2. Choose an approach (collaborative filtering, content-based, or hybrid)\n3. Prepare and preprocess your data\n4. Train your model\n5. Implement filtering and ranking logic\n6. Deploy and test with A/B testing\n\nPopular frameworks include TensorFlow Recommenders, Surprise, and Amazon Personalize.";
    }
    
    if (message.toLowerCase().includes('gpt-3') && message.toLowerCase().includes('gpt-4')) {
      return "GPT-4 is more advanced than GPT-3 with several improvements:\n\n1. Improved reasoning and problem-solving abilities\n2. Better context handling and longer memory\n3. More nuanced understanding of complex instructions\n4. Reduced hallucinations and factual errors\n5. Multimodal capabilities (can process both text and images)\n\nIt's also more expensive to use and has stricter rate limits than GPT-3.";
    }
    
    if (message.toLowerCase().includes('optimize') && message.toLowerCase().includes('machine learning')) {
      return "To optimize your machine learning model:\n\n1. Ensure data quality and perform feature engineering\n2. Try different algorithms and architectures\n3. Use hyperparameter tuning (grid search, random search, Bayesian optimization)\n4. Implement regularization techniques to prevent overfitting\n5. Consider ensemble methods\n6. Monitor and analyze errors\n7. Use cross-validation for more robust evaluation\n\nTools like MLflow, Optuna, and Weights & Biases can help with tracking experiments.";
    }
    
    if (message.toLowerCase().includes('sentiment analysis') && message.toLowerCase().includes('api')) {
      return "For sentiment analysis APIs, consider:\n\n1. Google Cloud Natural Language API\n2. Azure Text Analytics\n3. Amazon Comprehend\n4. IBM Watson NLU\n5. HuggingFace Inference API\n\nOpen-source options include:\n- NLTK\n- spaCy\n- TextBlob\n- Flair\n\nChoose based on your needs for language support, accuracy, pricing, and integration ease.";
    }
    
    // Default response for other queries
    return "I'm your AI assistant specialized in machine learning, AI development, and data science. I can help you understand complex concepts, suggest implementation strategies, or assist with troubleshooting your projects. What specific area would you like to explore further?";
  };

  const handleSelectPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  if (isFetching) {
    return (
      <ProTierLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Spinner size="lg" className="mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your AI Assistant...</p>
          </div>
        </div>
      </ProTierLayout>
    );
  }

  return (
    <ProTierLayout>
      <div className="flex flex-col h-full mx-auto max-w-4xl w-full px-4 py-8">
        <div className="flex-1 pb-4 md:pb-6">
          <h1 className="text-3xl font-bold mb-2">AI Assistant</h1>
          <p className="text-muted-foreground mb-6">
            Your personal AI assistant for machine learning, AI development, and data science.
          </p>
          
          {messages.length === 0 && (
            <Card className="p-6 bg-muted/50 mb-8">
              <h3 className="font-medium text-lg mb-3">Try asking about:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {EXAMPLE_PROMPTS.map((prompt, i) => (
                  <Button 
                    key={i} 
                    variant="outline" 
                    className="justify-start h-auto py-3 px-4 text-left normal-case"
                    onClick={() => handleSelectPrompt(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </Card>
          )}

          <div className="h-[60vh] mb-4 rounded-lg border bg-background">
            <ChatContainer messages={messages} />
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-background py-4">
          <ChatInput 
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleMessageSubmit}
            isLoading={isLoading}
            placeholder="Ask me anything about AI, machine learning, or data science..."
          />
        </div>
      </div>
    </ProTierLayout>
  );
};

export default AIAssistant;
