import { useState, useCallback } from 'react';
import { suggestedPrompts } from '@/data/proChatPrompts';

interface ProChatActions {
  messages: any[];
  inputValue: string;
  isLoading: boolean;
  isVoiceMode: boolean;
  isRecording: boolean;
  isHistoryOpen: boolean;
  chatHistory: any[];
  isHistoryLoading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  toggleVoiceMode: () => void;
  handleVoiceButton: () => void;
  handleSuggestedPrompt: (prompt: string) => void;
  handleLoadHistoryItem: (item: any) => void;
  clearChat: () => void;
}

export const useProChatActions = (): ProChatActions => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleSendMessage = useCallback(() => {
    // Implement send message logic here
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const toggleVoiceMode = useCallback(() => {
    setIsVoiceMode((prev) => !prev);
  }, []);

  const handleVoiceButton = useCallback(() => {
    // Implement voice button logic here
  }, []);

  const handleSuggestedPrompt = useCallback((prompt: string) => {
    setInputValue(prompt);
  }, []);

  const handleLoadHistoryItem = useCallback((item: any) => {
    // Implement load history item logic here
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    inputValue,
    isLoading,
    isVoiceMode,
    isRecording,
    isHistoryOpen,
    chatHistory,
    isHistoryLoading,
    handleInputChange,
    handleSendMessage,
    handleKeyPress,
    toggleVoiceMode,
    handleVoiceButton,
    handleSuggestedPrompt,
    handleLoadHistoryItem,
    clearChat,
  };
};
