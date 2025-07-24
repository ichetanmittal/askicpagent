import React, { useRef, useEffect } from 'react';
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

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <ChatArea onSendMessage={chatAreaRef} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Dashboard;