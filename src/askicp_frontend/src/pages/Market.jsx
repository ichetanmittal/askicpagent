import React from 'react';
import './Market.css';
import TradingAgentNetwork from '../components/TradingAgentNetwork';
import MarketAgent from '../components/MarketAgent';

const Market = () => {
  return (
    <div className="knowledge-container">
      <h2 className="title">
        <span className="icon"></span> Market Agent
      </h2>
      <p className="kobjective">
        <strong>Objective:</strong> Query and analyze on and off chain data to inform other agents of trading and yield opportunities
      </p>

      <h3 className="sample-title">Sample Queries</h3>
      <ul className="query-list">
        <li>What are the trading volumes of the top 5 tending coins?</li>
        <li>What is the 7 day price chart of the highest volume coin today?</li>
        <li>What is the contract address of USDC on Solana?</li>
      </ul>

      <div>
        <MarketAgent />
      </div>
    </div>
  );
};

export default Market;
