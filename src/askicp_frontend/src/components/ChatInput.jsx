import React, { useState } from 'react';
import './ChatInput.css';

const models = [
  { label: 'Anthropic', icon: '🤖' },
  { label: 'Open AI', icon: '🟢' },
  
];
const agents = [
  { label: 'DeFi Agent', icon: '🌐' },
  { label: 'ICP Agent', icon: '🟣' },
];

const ChatInput = ({ onSendMessage, position = "bottom" }) => {
  const [message, setMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);

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
    <div className={`chat-input-container${position === 'center' ? ' chat-input-center' : ''}`}
         style={position === 'center' ? { position: 'static', marginTop: 48 } : {}}>
      <div className="chat-input-wrapper">
        <form onSubmit={handleSubmit} className="chat-input-form">
          <div className="chat-input-box chat-input-dark chat-input-vertical">
            {/* Textarea on top */}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask the hive anything..."
              className="chat-textarea chat-textarea-dark"
              rows="1"
              maxLength={4000}
            />
            {/* Controls below */}
            <div className="chat-input-controls-row">
              {/* Model Dropdown */}
              <div className="chat-dropdown" tabIndex={0} onBlur={() => setShowModelDropdown(false)}>
                <button type="button" className="chat-dropdown-btn" onClick={() => setShowModelDropdown(v => !v)}>
                  {/* <span className="chat-dropdown-icon">{selectedModel.icon}</span> */}
                  <span className="chat-dropdown-label">{selectedModel.label}</span>
                  <span className="chat-dropdown-caret">▼</span>
                </button>
                {showModelDropdown && (
                  <div className="chat-dropdown-menu">
                    {models.map((model) => (
                      <div key={model.label} className="chat-dropdown-item" onMouseDown={() => { setSelectedModel(model); setShowModelDropdown(false); }}>
                        {/* <span className="chat-dropdown-icon">{model.icon}</span> */}
                        <span className="chat-dropdown-label">{model.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Agent Dropdown */}
              <div className="chat-dropdown" tabIndex={0} onBlur={() => setShowAgentDropdown(false)}>
                <button type="button" className="chat-dropdown-btn" onClick={() => setShowAgentDropdown(v => !v)}>
                  {/* <span className="chat-dropdown-icon">{selectedAgent.icon}</span> */}
                  <span className="chat-dropdown-label">{selectedAgent.label}</span>
                  <span className="chat-dropdown-caret">▼</span>
                </button>
                {showAgentDropdown && (
                  <div className="chat-dropdown-menu">
                    {agents.map((agent) => (
                      <div key={agent.label} className="chat-dropdown-item" onMouseDown={() => { setSelectedAgent(agent); setShowAgentDropdown(false); }}>
                        {/* <span className="chat-dropdown-icon">{agent.icon}</span> */}
                        <span className="chat-dropdown-label">{agent.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Send Button */}
              <button 
                type="submit" 
                className={`chat-send-btn chat-send-btn-dark ${message.trim() ? 'active' : ''}`}
                disabled={!message.trim()}
              >
                <i className="fa-solid fa-arrow-turn-up" style={{ transform: 'rotate(-90deg)' }}></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;