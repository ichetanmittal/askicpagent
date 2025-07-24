import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import claudeApi from '../services/claudeApi';
import './ChatArea.css';

const ChatArea = forwardRef(({ onMessagesChange, style }, ref) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (onMessagesChange) {
      onMessagesChange(messages);
    }
  }, [messages, onMessagesChange]);

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Format conversation history for Claude API
      const conversationHistory = claudeApi.formatMessages([...messages, userMessage]);
      
      // Get response from Claude API
      const response = await claudeApi.sendMessage(conversationHistory, {
        model: 'claude-3-haiku-20240307',
        maxTokens: 1000,
        temperature: 0.7
      });

      const aiMessage = {
        id: Date.now() + 1,
        text: response.success ? response.content : response.fallbackMessage,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
        error: !response.success
      };

      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble responding right now. Please try again in a moment.",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Expose handleSendMessage via ref
  useImperativeHandle(ref, () => ({
    handleSendMessage
  }), [messages]);

  return (
    <div className="chat-area" style={style}>
      {messages.length === 0 ? (
        <div></div>
      ) : (
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender} ${message.error ? 'error' : ''}`}>
              <div className="message-avatar">
                {message.sender === 'user' ? (
                  <i className="fa-solid fa-user"></i>
                ) : (
                  <i className="fa-solid fa-robot"></i>
                )}
              </div>
              <div className="message-content">
                <div className="message-text">{message.text}</div>
                <div className="message-timestamp">{message.timestamp}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message ai loading">
              <div className="message-avatar">
                <i className="fa-solid fa-robot"></i>
              </div>
              <div className="message-content">
                <div className="message-text">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  Claude is thinking...
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
});

export default ChatArea;