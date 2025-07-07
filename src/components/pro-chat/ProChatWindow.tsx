import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import ChatContainer from '@/components/chat/ChatContainer';
import { ProChatHeader } from './ProChatHeader';
import { ProChatInput } from './ProChatInput';
import { ProChatSuggestions } from './ProChatSuggestions';
import { ProChatHistory } from './ProChatHistory';
import { suggestedPrompts } from '@/data/proChatPrompts';

interface ProChatWindowProps {
  isFullScreen: boolean;
  isHistoryOpen: boolean;
  messages: any[];
  inputValue: string;
  isLoading: boolean;
  isVoiceMode: boolean;
  isRecording: boolean;
  chatHistory: any[];
  isHistoryLoading: boolean;
  toggleFullScreen: () => void;
  toggleHistoryPanel: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  toggleVoiceMode: () => void;
  handleVoiceButton: () => void;
  handleSuggestedPrompt: (prompt: string) => void;
  handleLoadHistoryItem: (item: any) => void;
  clearChat: () => void;
}

const ProChatWindow: React.FC<ProChatWindowProps> = ({
  isFullScreen,
  isHistoryOpen,
  messages,
  inputValue,
  isLoading,
  isVoiceMode,
  isRecording,
  chatHistory,
  isHistoryLoading,
  toggleFullScreen,
  toggleHistoryPanel,
  handleInputChange,
  handleKeyPress,
  handleSendMessage,
  handleSuggestedPrompt,
  handleLoadHistoryItem,
  clearChat,
  toggleVoiceMode,
  handleVoiceButton,
}) => {
  return (
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
        <ProChatHistory
          isHistoryLoading={isHistoryLoading}
          chatHistory={chatHistory}
          toggleHistoryPanel={toggleHistoryPanel}
          handleLoadHistoryItem={handleLoadHistoryItem}
        />
      )}
      
      <div className={cn("flex flex-col flex-1", isHistoryOpen ? "w-[calc(100%-16rem)]" : "w-full")}>
        {/* Chat header */}
        <ProChatHeader
          isFullScreen={isFullScreen}
          toggleFullScreen={toggleFullScreen}
          toggleHistoryPanel={toggleHistoryPanel}
          clearChat={clearChat}
          toggleVoiceMode={toggleVoiceMode}
          isVoiceMode={isVoiceMode}
          toggleChat={toggleChat}
        />
        {/* Chat messages */}
        <ChatContainer messages={messages} isLoading={isLoading} />
        
        {/* Suggested prompts */}
        {messages.length < 3 && (
          <ProChatSuggestions
            suggestedPrompts={suggestedPrompts}
            handleSuggestedPrompt={handleSuggestedPrompt}
          />
        )}
        
        {/* Chat input */}
        <ProChatInput
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleKeyPress={handleKeyPress}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
          isVoiceMode={isVoiceMode}
          isRecording={isRecording}
          handleVoiceButton={handleVoiceButton}
        />
      </div>
    </Card>
  );
};

export default ProChatWindow;
