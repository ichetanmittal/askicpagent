import React from 'react';
import './Trading.css';
import TradingAgentNetwork from '../components/TradingAgentNetwork';

const Knowledge = () => {
  return (
    <div className="knowledge-container">
      <h2 className="title">
        <span className="icon"></span> Trading Agent
      </h2>
      <p className="objective">
        <strong>Objective:</strong> Make trades via Jupiter with information from the Market Agent and Social Agent
      </p>

      <h3 className="sample-title">Sample Queries</h3>
      <ul className="query-list">
        <li>Buy 10 USDC worth of the highest volume coin today</li>
        <li>Sell 10 USDC worth of the highest volume coin today</li>
        <li>Buy 10 USDC worth of the highest volume coin in the last 7 days</li>
      </ul>

      <div>
        <TradingAgentNetwork />
      </div>
    </div>
  );
};

export default Knowledge;
