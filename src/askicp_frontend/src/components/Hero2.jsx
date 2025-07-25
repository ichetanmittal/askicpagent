import React from 'react';
import './Hero2.css';

const Hero2 = () => (
  <>
    <section className="hero2-section">
      <div className="hero2-headings">
        <div className="hero2-heading">Multiple Agents</div>
        <div className="hero2-heading hero2-center-heading">
          Interoperable Protocols
          {/* <div className="hero2-underline" /> */}
        </div>
        <div className="hero2-heading">Zero Friction</div>
      </div>
      <div className="hero2-subtitle">
        We are building the intelligence layer for crypto.
      </div>
      <hr className="hero2-divider" />
    </section>

    <section className="hero2-models-section">
      <div className="hero2-models-title">Multiple Models</div>
      <div className="hero2-models-row-animate">
        <div className="hero2-models-row-inner">
          {/* OpenAI */}
          <div className="hero2-model-card">
           
            OpenAI
          </div>
          {/* Anthropic */}
          <div className="hero2-model-card">
           
            Anthropic
          </div>
          {/* XAI */}
          <div className="hero2-model-card">
           
            XAI
          </div>
          {/* Gemini */}
          <div className="hero2-model-card">
           
            Gemini
          </div>
          {/* DeepSeek */}
          <div className="hero2-model-card">
            
            DeepSeek
          </div>
          {/* Duplicate for seamless animation */}
          <div className="hero2-model-card">
            
            OpenAI
          </div>
          <div className="hero2-model-card">
           
            Anthropic
          </div>
          {/* <div className="hero2-model-card">
            <span className="hero2-model-icon" style={{background: '#000'}}>
              <span style={{color: '#fff', fontWeight: 'bold', fontSize: '1.1rem'}}>X</span>
            </span>
            XAI
          </div> */}
          <div className="hero2-model-card">
            
            Gemini
          </div>
          <div className="hero2-model-card">
            
            DeepSeek
          </div>
        </div>
      </div>
      <hr className="hero2-divider" />
    </section>

    {/* Features Row */}
    <div>
    <section className="hero2-features-section">
      <div className="hero2-feature">
        <div className="hero2-feature-border">
          <div className="hero2-feature-title">Modular</div>
          <div className="hero2-feature-desc">
            Build and customize your DeFi experience using various AI agents
          </div>
        </div>
      </div>
      <div className="hero2-feature">
        <div className="hero2-feature-border">
          <div className="hero2-feature-title">Interoperable</div>
          <div className="hero2-feature-desc">
            Seamlessly connect and interact with various DeFi protocols and services
          </div>
        </div>
      </div>
      <div className="hero2-feature">
        <div className="hero2-feature-border">
          <div className="hero2-feature-title">Intuitive</div>
          <div className="hero2-feature-desc">
            Direct on-chain transactions and interactions using natural language
          </div>
        </div>
      </div>
      
      
    </section>
    <hr className="hero2-divider" />
    </div>

    {/* Supported Services */}
    <section className="hero2-services-section">
      <div className="hero2-services-title">Supported Services</div>
      <div className="hero2-services-row-animate">
        <div className="hero2-services-row-inner">
          {/* Helius */}
          <div className="hero2-service-card">
            
            ICSwap
          </div>
          {/* Twitter */}
          <div className="hero2-service-card">
            
            Sonic
          </div>
          {/* Jupiter */}
          <div className="hero2-service-card">
            
            Bionic
          </div>
          {/* Staking Rewards */}
          <div className="hero2-service-card">
           
            Plug Wallet
          </div>
          {/* Birdeye */}
          <div className="hero2-service-card">
            
            Dfinity Explorer
          </div>
          {/* 0x */}
          <div className="hero2-service-card">
            
            SNS(Service Nervous System)
          </div>
          {/* Arkham */}
          {/* <div className="hero2-service-card">
            <span className="hero2-service-icon">
              <img src="https://arkhamintelligence.com/favicon.ico" alt="Arkham" style={{width: '24px', height: '24px'}} />
            </span>
            Arkham
          </div> */}
          {/* Raydium */}
          {/* <div className="hero2-service-card">
            <span className="hero2-service-icon">
              <img src="https://raydium.io/favicon.ico" alt="Raydium" style={{width: '24px', height: '24px'}} />
            </span>
            Raydium
          </div> */}
          {/* Moralis */}
          {/* <div className="hero2-service-card">
            <span className="hero2-service-icon">
              <img src="https://moralis.io/favicon.ico" alt="Moralis" style={{width: '24px', height: '24px'}} />
            </span>
            Moralis
          </div> */}
          {/* HelloMoon */}
          {/* <div className="hero2-service-card">
            <span className="hero2-service-icon">
              <img src="https://hellomoon.io/favicon.ico" alt="HelloMoon" style={{width: '24px', height: '24px'}} />
            </span>
            HelloMoon
          </div> */}
          {/* Duplicate for seamless animation */}
          <div className="hero2-service-card">
            <span className="hero2-service-icon">
              <img src="https://helius.xyz/favicon.ico" alt="Helius" style={{width: '24px', height: '24px'}} />
            </span>
            Helius
          </div>
          <div className="hero2-service-card">
            <span className="hero2-service-icon">
              <img src="https://abs.twimg.com/favicons/twitter.2.ico" alt="Twitter" style={{width: '24px', height: '24px'}} />
            </span>
            Twitter
          </div>
          <div className="hero2-service-card">
            <span className="hero2-service-icon">
              <img src="https://jup.ag/favicon.ico" alt="Jupiter" style={{width: '24px', height: '24px'}} />
            </span>
            Jupiter
          </div>
          <div className="hero2-service-card">
            <span className="hero2-service-icon">
              <img src="https://stakingrewards.com/favicon.ico" alt="Staking Rewards" style={{width: '24px', height: '24px'}} />
            </span>
            Staking Rewards
          </div>
          <div className="hero2-service-card">
            <span className="hero2-service-icon">
              <img src="https://birdeye.so/favicon.ico" alt="Birdeye" style={{width: '24px', height: '24px'}} />
            </span>
            Birdeye
          </div>
          <div className="hero2-service-card">
            <span className="hero2-service-icon">
              <img src="https://0x.org/favicon.ico" alt="0x" style={{width: '24px', height: '24px'}} />
            </span>
            0x
          </div>
          <div className="hero2-service-card">
            <span className="hero2-service-icon">
              <img src="https://arkhamintelligence.com/favicon.ico" alt="Arkham" style={{width: '24px', height: '24px'}} />
            </span>
            Arkham
          </div>
          <div className="hero2-service-card">
            <span className="hero2-service-icon">
              <img src="https://raydium.io/favicon.ico" alt="Raydium" style={{width: '24px', height: '24px'}} />
            </span>
            Raydium
          </div>
          <div className="hero2-service-card">
            <span className="hero2-service-icon">
              <img src="https://moralis.io/favicon.ico" alt="Moralis" style={{width: '24px', height: '24px'}} />
            </span>
            Moralis
          </div>
          <div className="hero2-service-card">
            <span className="hero2-service-icon">
              <img src="https://hellomoon.io/favicon.ico" alt="HelloMoon" style={{width: '24px', height: '24px'}} />
            </span>
            HelloMoon
          </div>
        </div>
      </div>
      <hr className="hero2-divider" />
    </section>
  </>
);

export default Hero2;
