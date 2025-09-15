import React, { useEffect, useRef, useState } from 'react';
import Message from '../Message/Message';
import TypingIndicator from './TypingIndicator';
import WelcomeMessage from './WelcomeMessage';
import './ChatMessages.css';

const ChatMessages = ({ messages, isTyping }) => {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = (behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior,
      block: 'end'
    });
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isNear = scrollHeight - scrollTop - clientHeight < 100;
      setIsNearBottom(isNear);
      setShowScrollButton(!isNear && messages.length > 5);
    }
  };

  useEffect(() => {
    if (isNearBottom) {
      scrollToBottom();
    }
  }, [messages, isTyping, isNearBottom]);

  useEffect(() => {
    // Scroll to bottom immediately when component mounts
    scrollToBottom('auto');
  }, []);

  return (
    <div className="chat-messages-container">
      <div 
        className="chat-messages" 
        ref={containerRef}
        onScroll={handleScroll}
      >
        {messages.length === 1 && <WelcomeMessage />}
        
        {messages.map((message, index) => (
          <Message 
            key={message.id} 
            message={message}
            isConsecutive={
              index > 0 && 
              messages[index - 1].sender === message.sender &&
              (new Date(message.timestamp) - new Date(messages[index - 1].timestamp)) < 60000 // 1 minute
            }
            showTimestamp={
              index === messages.length - 1 || 
              messages[index + 1]?.sender !== message.sender ||
              (new Date(messages[index + 1]?.timestamp) - new Date(message.timestamp)) > 300000 // 5 minutes
            }
          />
        ))}
        
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      {showScrollButton && (
        <button 
          className="scroll-to-bottom-btn"
          onClick={() => scrollToBottom()}
          aria-label="Scroll to bottom"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatMessages;
