import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [conversations] = useState([
    { id: 1, title: 'New Chat', timestamp: 'Just now' },
    { id: 2, title: 'Previous conversation about...', timestamp: '2 hours ago' },
    { id: 3, title: 'Help with smart contracts', timestamp: 'Yesterday' },
  ]);
  const [contracted, setContracted] = useState(false);

  const handleToggleSidebar = () => {
    setContracted((prev) => !prev);
  };

  return (
    <div className={`sidebar${contracted ? ' contracted' : ''}`}>
      <div className="sidebar-header">
        <button className="sidebar-new-chat-btn">
          <i className="fa-solid fa-plus"></i>
          {!contracted && 'New Chat'}
        </button>
        {!contracted && (
          <i
            className="fa-solid fa-bars-staggered sidebar-logo-toggle"
            onClick={handleToggleSidebar}
            style={{ cursor: 'pointer', fontSize: 28, marginLeft: 12 }}
            title="Toggle sidebar"
          ></i>
        )}
      </div>
      {contracted && (
        <i
          className="fa-solid fa-bars-staggered sidebar-logo-toggle sidebar-logo-toggle-absolute"
          onClick={handleToggleSidebar}
          style={{ cursor: 'pointer', fontSize: 20 }}
          title="Expand sidebar"
        ></i>
      )}
      {!contracted && (
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
      )}
      <div className="sidebar-footer">
        <button className="sidebar-connect-wallet-btn">
          <i className="fa-solid fa-arrow-right-to-bracket"></i>
          {!contracted && 'Connect Wallet'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;