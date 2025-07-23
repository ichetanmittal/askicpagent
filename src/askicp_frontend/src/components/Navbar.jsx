import React, { useState } from 'react';
import './Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const agentMenuItems = [
  { label: 'Trading', icon: 'fa-arrows-rotate' },
  { label: 'Market', icon: 'fa-fire' },
  { label: 'Social', icon: 'fa-user-group' },
  { label: 'Liquidity', icon: 'fa-droplet' },
  { label: 'Staking', icon: 'fa-seedling' },
  { label: 'Knowledge', icon: 'fa-brain' },
  { label: 'Token', icon: 'fa-coins' },
  { label: 'Wallet', icon: 'fa-wallet' },
];

const developerMenuItems = [
  { label: 'Upstream', icon: 'fa-code-branch' },
  { label: 'Fork', icon: 'fa-code-fork' },
];

const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        {/* Logo and Title */}
        <div className="navbar-logo">
          {/* <span className="navbar-logo-icon">🐝</span> */}
          <span className="navbar-logo-title">Ask ICP Agent</span>
        </div>
        {/* Navigation Buttons */}
        <div className="navbar-nav">
          {/* <button className="navbar-btn">Documentation</button> */}
          <Dropdown label="Agents" items={agentMenuItems} />
          <Dropdown label="Developers" items={developerMenuItems} />
          {/* <Dropdown label="Socials" /> */}
        </div>
      </nav>
      {/* Login Button - now outside nav, in top right */}
      <button className="navbar-login-btn">
        {/* <span className="navbar-login-icon" role="img" aria-label="user">👤</span> */}
        Login
      </button>
    </div>
  );
};

// Dropdown with hover menu
const Dropdown = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="navbar-dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <button className="navbar-btn">
        {label} <span style={{ fontSize: '0.9em' }}>▼</span>
      </button>
      {items && open && (
        <div className="navbar-dropdown-menu">
          {items.map((item) => (
            <div className="navbar-dropdown-item" key={item.label}>
              <i className={`fa-solid ${item.icon}`} style={{ marginRight: '10px', width: '20px', textAlign: 'center' }}></i>
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
