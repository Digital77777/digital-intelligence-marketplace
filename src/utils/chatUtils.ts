
import { supabase } from '@/integrations/supabase/client';
import { ChatMessage } from '@/components/chat/ChatContainer';

export interface ChatHistory {
  id: string;
  user_id: string;
  message: string;
  bot_response: string;
  timestamp: string;
  metadata?: any;
}

export const fetchChatHistory = async (type: string): Promise<ChatMessage[]> => {
  try {
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
      // Filter by type if provided in metadata
      const filteredData = type 
        ? result.data.filter((item: ChatHistory) => 
            item.metadata && item.metadata.type === type
          )
        : result.data;
      
      // Transform the database format to our ChatMessage format
      const chatHistory = filteredData.map((item: ChatHistory) => [
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
      
      return chatHistory.reverse();
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
};

export const saveChatMessage = async (
  userMessage: string, 
  botResponse: string, 
  metadata?: any
): Promise<boolean> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData.session) return false;
    
    const token = sessionData.session.access_token;
    
    const response = await fetch(`${supabase.functions.url}/pro-chat/history`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        botResponse: botResponse,
        metadata
      }),
    });
    
    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Error saving chat message:', error);
    return false;
  }
};
