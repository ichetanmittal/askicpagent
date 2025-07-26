import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Trading from './pages/Trading';
import Knowledge from './pages/Knowledge';
import Market from './pages/Market';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agents/trading" element={<Trading />} />
          <Route path="/agents/knowledge" element={<Knowledge />} />
          <Route path="/agents/market" element={<Market />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
