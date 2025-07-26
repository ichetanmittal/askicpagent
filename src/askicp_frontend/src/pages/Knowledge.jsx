import React from 'react';
import './Knowledge.css';
import KnowAgentNetwork from '../components/KnowAgentNetwork';

const Knowledge = () => {
  return (
    <div className="knowledge-container">
      <h2 className="title">
        <span className="icon">⚙️</span> Knowledge Agent
      </h2>
      <p className="kobjective">
        <strong>Objective:</strong> Maintain and analyze a comprehensive knowledge base of DeFi protocols, strategies, and market dynamics
      </p>

      <h3 className="sample-title">Sample Queries</h3>
      <ul className="query-list">
        <li>Explain how Orca concentrated liquidity pools work</li>
        <li>What are the risks and benefits of different DeFi strategies?</li>
        <li>Compare the tokenomics of major Solana DeFi protocols</li>
        <li>What are the current market trends in Solana DeFi?</li>
        <li>Analyze historical protocol performance and user adoption</li>
      </ul>
      <div>
        <KnowAgentNetwork />
      </div>
    </div>
  );
};

export default Knowledge;
