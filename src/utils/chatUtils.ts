
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage } from '@/components/chat/ChatContainer';
import { toast } from 'sonner';

// Define the chat session interface
interface ChatSession {
  id: string;
  user_id: string;
  title: string;
  created_at: Date;
  updated_at: Date;
  messages: ChatMessage[];
}

// Send a message to the AI assistant
export const sendChatMessage = async (
  userId: string,
  sessionId: string,
  message: string,
  prevMessages: ChatMessage[]
): Promise<string> => {
  try {
    // For Pro users, use the pro-chat edge function
    const functionName = 'pro-chat';
    const { data, error } = await supabase.functions.invoke(functionName, {
      body: {
        user_id: userId,
        session_id: sessionId,
        message: message,
        history: prevMessages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      }
    });

    if (error) {
      throw error;
    }

    // Save the conversation to the database
    await saveConversation(userId, sessionId, prevMessages, {
      id: uuidv4(),
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    if (data?.response) {
      // Also save the assistant's response
      await saveConversation(userId, sessionId, [...prevMessages, {
        id: uuidv4(),
        role: 'user',
        content: message,
        timestamp: new Date()
      }], {
        id: uuidv4(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      });

      return data.response;
    }

    return "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error('Error sending message to AI assistant:', error);
    throw error;
  }
};

// Save a conversation to the database
export const saveConversation = async (
  userId: string,
  sessionId: string,
  prevMessages: ChatMessage[],
  newMessage: ChatMessage
) => {
  try {
    const { data: existingSession, error: fetchError } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 is the error code for "no rows returned"
      throw fetchError;
    }

    const allMessages = [...prevMessages, newMessage];
    
    if (!existingSession) {
      // Create a new session
      const { error: insertError } = await supabase
        .from('chat_sessions')
        .insert([
          {
            id: sessionId,
            user_id: userId,
            title: allMessages[0]?.content.substring(0, 50) || 'New conversation',
            messages: allMessages.map(msg => ({
              role: msg.role,
              content: msg.content,
              timestamp: msg.timestamp || new Date()
            }))
          }
        ]);

      if (insertError) throw insertError;
    } else {
      // Update existing session
      const { error: updateError } = await supabase
        .from('chat_sessions')
        .update({
          updated_at: new Date(),
          messages: allMessages.map(msg => ({
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp || new Date()
          }))
        })
        .eq('id', sessionId);

      if (updateError) throw updateError;
    }
  } catch (error) {
    console.error('Error saving conversation:', error);
    toast.error('Failed to save conversation');
  }
};

// Fetch chat history for a user
export const fetchChatHistory = async (userId: string): Promise<ChatSession[]> => {
  try {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching chat history:', error);
    toast.error('Failed to fetch chat history');
    return [];
  }
};
