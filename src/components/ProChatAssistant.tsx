
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, X } from 'lucide-react';
import ChatContainer from '@/components/chat/ChatContainer';

// Import the modularized components
import { ProChatHeader } from './pro-chat/ProChatHeader';
import { ProChatInput } from './pro-chat/ProChatInput';
import { ProChatHistory } from './pro-chat/ProChatHistory';
import { ProChatSuggestions } from './pro-chat/ProChatSuggestions';
import { useProChat } from './pro-chat/useProChat';

const suggestedPrompts = [
  "How do I integrate an NLP tool into my workflow?",
  "What's the difference between Basic and Pro tiers?",
  "Take me to the AI Studio page",
  "How can I train a custom vision model?",
  "Show me the latest AI tools in computer vision"
];

const ProChatAssistant: React.FC = () => {
  const {
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
  } = useProChat();

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
              toggleChat={toggleChat}
              clearChat={clearChat}
              toggleVoiceMode={toggleVoiceMode}
              isVoiceMode={isVoiceMode}
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
      )}
    </>
  );
};

// Helper function to conditionally join class names
const cn = (...classes: (string | undefined | boolean)[]) => 
  classes.filter(Boolean).join(' ');

export default ProChatAssistant;
