
import { supabase } from '@/integrations/supabase/client';
import { ChatMessage } from '@/components/chat/ChatContainer';
import { v4 as uuidv4 } from 'uuid';

export interface ChatSession {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  messages: ChatMessage[];
}

export const sendChatMessage = async (content: string, sessionId: string) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error('User not authenticated');
    }
    
    const message: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    return message;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

export const fetchAIResponse = async (
  userMessage: string, 
  sessionId: string,
  chatType: 'general' | 'pro' = 'general'
): Promise<ChatMessage> => {
  try {
    // This simulates an AI response for now
    // In a real implementation, we would call our edge function or external API
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    // Demo response
    const responsePrefix = chatType === 'pro' ? 'Pro AI: ' : 'AI: ';
    
    return {
      id: uuidv4(),
      role: 'assistant',
      content: `${responsePrefix}${generateDemoResponse(userMessage, chatType)}`,
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Error fetching AI response:', error);
    throw error;
  }
};

// Helper function to generate demo responses
const generateDemoResponse = (userMessage: string, chatType: 'general' | 'pro'): string => {
  const message = userMessage.toLowerCase();
  
  if (message.includes('hello') || message.includes('hi')) {
    return 'Hello! How can I assist you today?';
  }
  
  if (message.includes('help')) {
    return 'I\'m here to help! What would you like to know about our AI tools and features?';
  }
  
  if (chatType === 'pro' && message.includes('model')) {
    return 'As a Pro user, you have access to our advanced model customization features. You can fine-tune parameters, adjust response styles, and even create specialized models for your specific needs.';
  }
  
  if (chatType === 'general') {
    return 'I can answer general questions about AI tools and features. For more advanced help and personalized recommendations, consider upgrading to our Pro tier!';
  }
  
  return 'I understand your question about "' + userMessage + '". How else can I assist you today?';
};

// Save chat message to Supabase
export const saveChatMessage = async (message: string, botResponse: string, metadata: any = {}) => {
  try {
    const { data: session } = await supabase.auth.getSession();
    
    if (!session.session) {
      throw new Error('No active session');
    }
    
    // Use Supabase Edge Function to save the chat
    const { error } = await supabase.functions.invoke('pro-chat/history', {
      headers: {
        Authorization: `Bearer ${session.session.access_token}`,
      },
      body: { 
        message, 
        botResponse, 
        metadata 
      },
      method: 'POST',
    });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error saving chat message:', error);
    return false;
  }
};
