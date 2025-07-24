import React, { useState } from 'react';
import './ChatInput.css';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage?.(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        <form onSubmit={handleSubmit} className="chat-input-form">
          <div className="chat-input-box">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message Ask ICP Agent..."
              className="chat-textarea"
              rows="1"
              maxLength={4000}
            />
            <button 
              type="submit" 
              className={`chat-send-btn ${message.trim() ? 'active' : ''}`}
              disabled={!message.trim()}
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </form>
        <div className="chat-input-footer">
          <span className="chat-disclaimer">
            Ask ICP Agent can make mistakes. Consider checking important information.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;