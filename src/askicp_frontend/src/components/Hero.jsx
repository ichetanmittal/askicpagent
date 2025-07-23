import React from 'react';

const Hero = () => (
  <>
  <section style={{
    color: '#FFB800',
    textAlign: 'center',
    padding: '80px 0 250px 0',
    minHeight: '220px',
    height: '50vh',
    width: '100%',
  }}>
    <h1 style={{ fontSize: '4.5rem', fontWeight: 700, marginBottom: '32px', color: '#FFB800', paddingTop:'200px' }}>
      Ask ICP Agent
    </h1>
    <p style={{ color: '#fff', fontFamily: 'monospace', fontSize: '2rem', margin: 0 }}>
      A modular network of interoperable DeFi agents
    </p>
  </section>
  <div style={{
    borderBottom: '1px solid #444',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight:'auto',
    width: '50%',
  }}></div>
  </>
);

export default Hero;
