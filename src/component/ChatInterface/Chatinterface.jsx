import React, { useState } from 'react';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatMessages from './ChatMessages/ChatMessages';
import ChatInput from './ChatInput/ChatInput';
import { callAIAPI } from '../services/aiAPI';
import './ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! I'm your Autometa assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

const handleSendMessage = async (content) => {
  // Add user message
  const userMessage = {
    id: Date.now(),
    content,
    sender: 'user',
    timestamp: new Date()
  };
  
  setMessages(prev => [...prev, userMessage]);
  setIsTyping(true);

  try {
    // Call AI API - MODIFY THIS PART
    const aiResponse = await callAIAPI(content);
    
    // Add AI response - MODIFY THIS PART
    const aiMessage = {
      id: Date.now() + 1,
      content: aiResponse.response,
      sender: 'ai',
      timestamp: new Date(),
      tool_calls: aiResponse.tool_calls,  // Add this line
      reasoning: aiResponse.reasoning     // Add this line
    };
    console.log(aiMessage)
    setMessages(prev => [...prev, aiMessage]);
  } catch (error) {
    const errorMessage = {
      id: Date.now() + 1,
      content: "Sorry, I encountered an error. Please try again." + error ,
      sender: 'ai',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsTyping(false);
  }
};

  return (
    <div className="chat-container">
      <ChatHeader />
      <ChatMessages messages={messages} isTyping={isTyping} />
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};

export default ChatInterface;
