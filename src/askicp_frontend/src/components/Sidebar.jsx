import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [conversations] = useState([
    { id: 1, title: 'New Chat', timestamp: 'Just now' },
    { id: 2, title: 'Previous conversation about...', timestamp: '2 hours ago' },
    { id: 3, title: 'Help with smart contracts', timestamp: 'Yesterday' },
  ]);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="sidebar-new-chat-btn">
          <i className="fa-solid fa-plus"></i>
          New Chat
        </button>
      </div>
      
      <div className="sidebar-conversations">
        <div className="sidebar-section-title">Recent</div>
        {conversations.map((conv) => (
          <div key={conv.id} className="sidebar-conversation-item">
            <div className="conversation-title">{conv.title}</div>
            <div className="conversation-timestamp">{conv.timestamp}</div>
            <div className="conversation-actions">
              <button className="conversation-action-btn">
                <i className="fa-solid fa-pen"></i>
              </button>
              <button className="conversation-action-btn">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-upgrade">
          <i className="fa-solid fa-crown"></i>
          <div>
            <div className="upgrade-title">Upgrade to Pro</div>
            <div className="upgrade-subtitle">Get unlimited access</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;