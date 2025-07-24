import { createActor } from '../../../declarations/askicp_backend';

class ClaudeApiService {
  constructor() {
    try {
      // Use the generated createActor function with explicit canister ID
      // For mainnet: h4gsp-yyaaa-aaaah-arila-cai, for local: uxrrr-q7777-77774-qaaaq-cai
      const canisterId = process.env.DFX_NETWORK === 'ic' ? 'h4gsp-yyaaa-aaaah-arila-cai' : 'uxrrr-q7777-77774-qaaaq-cai';
      this.backend = createActor(canisterId);
      console.log("Backend actor initialized successfully");
    } catch (error) {
      console.error("Failed to initialize backend actor:", error);
      this.backend = null;
    }
  }

  async sendMessage(messages, options = {}) {
    try {
      // Check if backend is properly initialized
      if (!this.backend) {
        throw new Error('Backend canister not initialized');
      }

      // Format messages for the backend - ensure proper serialization
      const formattedMessages = JSON.stringify(
        messages.map(msg => ({
          role: String(msg.role),
          content: String(msg.content)
        }))
      );

      console.log('Calling backend with messages:', formattedMessages);

      // Test basic connectivity first
      try {
        const testResponse = await this.backend.greet("test");
        console.log('Basic backend test successful:', testResponse);
      } catch (testError) {
        console.error('Basic backend test failed:', testError);
        throw testError;
      }

      // Call the backend canister method
      const response = await this.backend.claude_api_call(formattedMessages);
      
      // Parse the response from Claude API
      try {
        const parsedResponse = JSON.parse(response);
        
        // Check if it's an error response from the backend
        if (parsedResponse.error) {
          return {
            success: false,
            error: parsedResponse.error,
            fallbackMessage: parsedResponse.fallback || "I'm having trouble connecting right now. Please try again."
          };
        }
        
        // Check if it's a successful Claude API response
        if (parsedResponse.content && parsedResponse.content.length > 0) {
          return {
            success: true,
            content: parsedResponse.content[0].text,
            usage: parsedResponse.usage
          };
        } else {
          throw new Error('Invalid response format');
        }
      } catch (parseError) {
        console.error('Response parsing error:', parseError);
        console.log('Raw response:', response);
        return {
          success: false,
          error: 'Failed to parse response',
          fallbackMessage: "I'm having trouble processing the response. Please try again."
        };
      }
      
    } catch (error) {
      console.error('Backend API Error:', error);
      return {
        success: false,
        error: error.message || 'Failed to get response from Claude',
        fallbackMessage: "I'm having trouble connecting right now. Please try again in a moment."
      };
    }
  }


  // Helper method to format conversation history
  formatMessages(chatHistory) {
    return chatHistory.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));
  }

  // Method to get available models
  getAvailableModels() {
    return [
      { 
        id: 'claude-3-haiku-20240307', 
        name: 'Claude 3 Haiku', 
        description: 'Fast and cost-effective' 
      },
      { 
        id: 'claude-3-sonnet-20240229', 
        name: 'Claude 3 Sonnet', 
        description: 'Balanced performance' 
      },
      { 
        id: 'claude-3-opus-20240229', 
        name: 'Claude 3 Opus', 
        description: 'Most capable model' 
      }
    ];
  }
}

export default new ClaudeApiService();