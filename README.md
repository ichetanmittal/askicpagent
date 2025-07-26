# PFI Agent
PFI Agent allow you to program your money , automate your payments workflows, generate reports on your spendings, move your money with AI, enables knowledge base for ICP related services

## Features

- 🤖 **Realtime LLM Integration** - Natural language processing for lending queries
Intelligent keyword detection routes conversations to specailized analysis.Seamless integration with Claude AI and multiple models for real-time insights

- 🌐 **Decentralized Architecture** - Real-time fetching of borrower portfolios via HTTP outcalls .AI-driven risk assessment and credit scoring.Automated loan approval recommendations.Portfolio diversification insights

- 🔒 **Privacy-First** - Your conversations are secured by blockchain technology.Built entirely on Internet Computer Protocol. Decentralized HTTP outcalls for external API integration.Smart contract-based lending logic.Secure and transparent operations integrated with multiple services in ICP ecosystem , ICP SWAP , SNS Dashboards, Plug Wallet

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ichetanmittal/askicpagent.git
   cd askicpagent
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd src/askicp_frontend
   npm install
   cd ../..
   ```

3. **Configure Claude API Key**
   
   Edit `src/askicp_backend/main.mo` and replace `YOUR_CLAUDE_API_KEY_HERE` with your actual Claude API key:
   ```motoko
   let claude_api_key = "sk-ant-api03-your-actual-api-key-here";
   ```

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```
