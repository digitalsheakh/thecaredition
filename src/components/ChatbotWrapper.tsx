"use client";

import React, { useState } from 'react';
import ChatBot from './ChatBot';

const ChatbotWrapper: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleClose = () => {
    setIsChatOpen(false);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Chat toggle button - Redesigned to match website theme */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-orange-600 hover:bg-orange-700 text-white rounded-full p-4 shadow-2xl z-50 transition-all duration-300 hover:scale-110 border-2 border-orange-500 group"
        aria-label="Chat with us"
      >
        {isChatOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            {/* Notification pulse */}
            <span className="absolute top-0 right-0 h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
          </>
        )}
      </button>
      
      {/* Chatbot component */}
      {isChatOpen && <ChatBot onClose={handleClose} />}
    </>
  );
};

export default ChatbotWrapper;
