import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const agentMenuItems = [
  { label: 'Trading', icon: 'fa-arrows-rotate', link: '/agents/trading' },
  { label: 'Market', icon: 'fa-fire', link: '/agents/market' },
  { label: 'Social', icon: 'fa-user-group', link: '/agents/social' },
  { label: 'Liquidity', icon: 'fa-droplet', link: '/agents/liquidity' },
  { label: 'Staking', icon: 'fa-seedling', link: '/agents/staking' },
  { label: 'Knowledge', icon: 'fa-brain', link: '/agents/knowledge' },
  { label: 'Token', icon: 'fa-coins', link: '/agents/token' },
  { label: 'Wallet', icon: 'fa-wallet', link: '/agents/wallet' },
];

const developerMenuItems = [
  { label: 'Github', icon: 'fa-code-branch' },
  { label: 'Fork', icon: 'fa-code-fork' },
];

const Navbar = () => {
  const { isAuthenticated, principal, login, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleLoginClick = async () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      await login(() => {
        navigate('/dashboard');
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="navbar-container">
      {!isAuthenticated && (
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
      )}
      {/* Login/Dashboard Button - now outside nav, in top right */}
      <div className="navbar-auth-section">
        {loading ? (
          <button className="navbar-login-btn" disabled>
            Loading...
          </button>
        ) : isAuthenticated ? (
          <div className="navbar-user-menu">
            <div 
              className="navbar-profile-container"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <i className="fa-solid fa-user navbar-profile-icon"></i>
              {showProfileDropdown && (
                <div className="navbar-profile-dropdown">
                  <div className="navbar-profile-header">Principal ID</div>
                  <div className="navbar-profile-principal">{principal}</div>
                </div>
              )}
            </div>
            <button className="navbar-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="navbar-login-btn" onClick={handleLoginClick}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

// Dropdown with hover menu
const Dropdown = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Add this line to use navigation inside Dropdown
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
            <div
              className="navbar-dropdown-item"
              key={item.label}
              onClick={() => {
                if (item.link) {
                  navigate(item.link);
                }
              }}
              style={{ cursor: item.link ? 'pointer' : 'default' }}
            >
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
