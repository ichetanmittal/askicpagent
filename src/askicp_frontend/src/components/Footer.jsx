import React from 'react';

const beeIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#FFD600" strokeWidth="2" fill="none" />
    <ellipse cx="12" cy="14" rx="5" ry="3" fill="#FFD600" />
    <ellipse cx="12" cy="10" rx="3" ry="2" fill="#FFD600" />
    <circle cx="12" cy="9" r="1" fill="#222" />
    <line x1="12" y1="17" x2="12" y2="21" stroke="#FFD600" strokeWidth="2" />
    <line x1="9" y1="21" x2="15" y2="21" stroke="#FFD600" strokeWidth="2" />
  </svg>
);

const Footer = () => (
  <footer style={{
    background: '#181818',
    color: '#FFD600',
    padding: '32px 0 8px 0',
    textAlign: 'center',
    position: 'relative',
    borderTop: '1px solid #333',
    marginTop: '48px',
  }}>
    <div style={{ borderTop: '1px solid #444', width: '90%', margin: '0 auto 24px auto' }} />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {beeIcon}
        <span style={{ fontWeight: 700, fontSize: 22, color: '#FFD600' }}>The Hive</span>
      </div>
      <div style={{ marginTop: 12 }}>
        <a href="#" style={{ color: '#A9B7C6', margin: '0 12px', textDecoration: 'none', fontSize: 16 }}>Terms of Service</a>
        <a href="#" style={{ color: '#A9B7C6', margin: '0 12px', textDecoration: 'none', fontSize: 16 }}>Privacy Policy</a>
      </div>
    </div>
  </footer>
);

export default Footer;
