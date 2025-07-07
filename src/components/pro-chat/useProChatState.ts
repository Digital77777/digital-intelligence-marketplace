import { useState } from 'react';

interface ProChatState {
  isOpen: boolean;
  isFullScreen: boolean;
  isHistoryOpen: boolean;
  toggleChat: () => void;
  toggleFullScreen: () => void;
  toggleHistoryPanel: () => void;
}

export const useProChatState = (): ProChatState => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const toggleHistoryPanel = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  return {
    isOpen,
    isFullScreen,
    isHistoryOpen,
    toggleChat,
    toggleFullScreen,
    toggleHistoryPanel,
  };
};
