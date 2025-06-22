
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProChatState } from './pro-chat/useProChatState';
import { useProChatActions } from './pro-chat/useProChatActions';
import ProChatWindow from './pro-chat/ProChatWindow';

const ProChatAssistant: React.FC = () => {
  const { isOpen, isFullScreen, isHistoryOpen, toggleChat, toggleFullScreen, toggleHistoryPanel } = useProChatState();
  const {
    messages,
    inputValue,
    isLoading,
    isVoiceMode,
    isRecording,
    chatHistory,
    isHistoryLoading,
    handleInputChange,
    handleSendMessage,
    handleKeyPress,
    toggleVoiceMode,
    handleVoiceButton,
    handleSuggestedPrompt,
    handleLoadHistoryItem,
    clearChat
  } = useProChatActions();

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
        <ProChatWindow
          isFullScreen={isFullScreen}
          isHistoryOpen={isHistoryOpen}
          messages={messages}
          inputValue={inputValue}
          isLoading={isLoading}
          isVoiceMode={isVoiceMode}
          isRecording={isRecording}
          chatHistory={chatHistory}
          isHistoryLoading={isHistoryLoading}
          toggleFullScreen={toggleFullScreen}
          toggleHistoryPanel={toggleHistoryPanel}
          handleInputChange={handleInputChange}
          handleKeyPress={handleKeyPress}
          handleSendMessage={handleSendMessage}
          handleSuggestedPrompt={handleSuggestedPrompt}
          handleLoadHistoryItem={handleLoadHistoryItem}
          clearChat={clearChat}
          toggleVoiceMode={toggleVoiceMode}
          handleVoiceButton={handleVoiceButton}
        />
      )}
    </>
  );
};

export default ProChatAssistant;
</content>
</replace_in_file>
```
