import React from 'react';
import './TradingAgentNetwork.css';

const TradingAgentNetwork = () => {
  return (
    <div className="trading-network-container">
      <div className="network-diagram">
        {/* Connection Lines */}
        <svg className="connection-lines" viewBox="0 0 384 384">
          {/* Line from Trading Agent to Market Agent */}
          <line
            x1="192"
            y1="192"
            x2="192"
            y2="80"
            className="connection-line"
          />
          {/* Line from Trading Agent to DEX Aggregator */}
          <line
            x1="192"
            y1="192"
            x2="20"
            y2="350"
            className="connection-line"
          />
          {/* Line from Trading Agent to Social Agent */}
          <line
            x1="192"
            y1="192"
            x2="380"
            y2="360"
            className="connection-line"
          />
        </svg>

        {/* Market Agent - Top */}
        <div className="node market-agent">
          <div className="node-content">
            <div className="node-title">LSO</div>
            <div className="node-subtitle">Market Agent</div>
          </div>
        </div>

        {/* Trading Agent - Center */}
        <div className="node trading-agent">
          <div className="node-content">
            {/* Trading arrows icon */}
            <div className="trading-icon">
              <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                <path d="M2 8L8 2L8 5L14 5L14 11L8 11L8 14L2 8Z" fill="currentColor"/>
                <path d="M30 16L24 22L24 19L18 19L18 13L24 13L24 10L30 16Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="node-title">Trading Agent</div>
          </div>
        </div>

        {/* DEX Aggregator - Bottom Left */}
        <div className="node dex-aggregator">
          <div className="node-content">
            <div className="node-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="5" r="3" fill="currentColor"/>
                <circle cx="12" cy="19" r="3" fill="currentColor"/>
                <circle cx="5" cy="12" r="3" fill="currentColor"/>
                <circle cx="19" cy="12" r="3" fill="currentColor"/>
                <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="node-title">DEX</div>
            <div className="node-subtitle">Aggregator</div>
          </div>
        </div>

        {/* Social Agent - Bottom Right */}
        <div className="node social-agent">
          <div className="node-content">
            <div className="node-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className="node-title">Social Agent</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingAgentNetwork;