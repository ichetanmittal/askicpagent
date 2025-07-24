import React, { useRef, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import ChatInput from '../components/ChatInput';
import { testBackend } from '../test-backend.js';
import './Dashboard.css';

const Dashboard = () => {
  const { isAuthenticated, principal, loading } = useAuth();
  const chatAreaRef = useRef();
  const [hasFirstMessage, setHasFirstMessage] = useState(false);

  if (loading) {
    return (
      <div className="dashboard-loading">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    // Run backend test when dashboard loads
    if (isAuthenticated) {
      console.log("Running backend connectivity test...");
      testBackend();
    }
  }, [isAuthenticated]);

  const handleSendMessage = (message) => {
    if (chatAreaRef.current) {
      chatAreaRef.current(message);
    }
  };

  const handleMessagesChange = (messages) => {
    setHasFirstMessage(messages.length > 0);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        {!hasFirstMessage ? (
          <div className="dashboard-welcome-center">
            <div className="welcome-header">
              <div className="welcome-icon">
                <i className="fa-solid fa-robot"></i>
              </div>
              <h1 className="welcome-title">Ask ICP Agent</h1>
              <p className="welcome-subtitle">
                How can I help you today? Ask me anything about the Internet Computer Protocol.
              </p>
            </div>
            <ChatInput onSendMessage={handleSendMessage} position="center" />
            <div className="welcome-suggestions-grid">
              <button className="suggestion-card" onClick={() => handleSendMessage("What is the Internet Computer Protocol?")}> 
                <div className="suggestion-title">What is the Internet Computer Protocol?</div>
                <div className="suggestion-desc">Learn about ICP and its core features</div>
              </button>
              <button className="suggestion-card" onClick={() => handleSendMessage("How do I create a smart contract?")}> 
                <div className="suggestion-title">How do I create a smart contract?</div>
                <div className="suggestion-desc">Steps to deploy a smart contract on ICP</div>
              </button>
              <button className="suggestion-card" onClick={() => handleSendMessage("Explain cycles and gas fees")}> 
                <div className="suggestion-title">Explain cycles and gas fees</div>
                <div className="suggestion-desc">Understand how computation is paid for</div>
              </button>
            </div>
          </div>
        ) : (
          <>
            <ChatArea onSendMessage={chatAreaRef} onMessagesChange={handleMessagesChange} />
            <ChatInput onSendMessage={handleSendMessage} position="bottom" />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;