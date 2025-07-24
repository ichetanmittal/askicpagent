import React from 'react';

const Hero = () => (
  <div className="hero-container">
    <section style={{
      color: '#FFB800',
      textAlign: 'center',
      width: '100%',
    }}>
      <h1 style={{ fontSize: '4.5rem', fontWeight: 700, marginBottom: '32px', color: '#FFB800', paddingTop:'180px' }}>
        Ask ICP Agent
      </h1>
      <p style={{ color: '#fff', fontFamily: 'monospace', fontSize: '2rem', margin: 0 }}>
        A modular network of interoperable DeFi agents
      </p>
    </section>
  </div>
);

export default Hero;
