import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo and Title */}
      <div className="navbar-logo">
        {/* <span className="navbar-logo-icon">🐝</span> */}
        <span className="navbar-logo-title">Ask ICP Agent</span>
      </div>
      {/* Navigation Buttons */}
      <div className="navbar-nav">
        {/* <button className="navbar-btn">Documentation</button> */}
        <Dropdown label="Agents" />
        <Dropdown label="Developers" />
        {/* <Dropdown label="Socials" /> */}
      </div>
      {/* Right Side: Go to App & Theme Toggle & Login */}
      <div className="navbar-right">
        {/* <button className="navbar-app-btn">Go to App</button> */}
        {/* <button className="navbar-icon-btn" title="Toggle theme">
          <span role="img" aria-label="theme">🌗</span>
        </button> */}
        <button className="navbar-login-btn">
          <span className="navbar-login-icon" role="img" aria-label="user">👤</span>
          Login
        </button>
      </div>
    </nav>
  );
};

// Simple Dropdown placeholder
const Dropdown = ({ label }) => (
  <button className="navbar-btn">
    {label} <span style={{ fontSize: '0.9em' }}>▼</span>
  </button>
);

export default Navbar;
