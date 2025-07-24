import { Actor, HttpAgent } from '@dfinity/agent';

// Simple test to isolate the CBOR issue
const testBackend = async () => {
  try {
    console.log("Creating HttpAgent...");
    
    const agent = new HttpAgent({
      host: "http://localhost:4943",
    });

    console.log("Fetching root key...");
    await agent.fetchRootKey();

    console.log("Creating actor with minimal IDL...");
    
    // Minimal IDL for testing
    const idl = ({ IDL }) => {
      return IDL.Service({
        'greet': IDL.Func([IDL.Text], [IDL.Text], ['query']),
      });
    };

    const actor = Actor.createActor(idl, {
      agent,
      canisterId: "uxrrr-q7777-77774-qaaaq-cai",
    });

    console.log("Calling greet method...");
    const result = await actor.greet("test");
    console.log("Success:", result);
    
  } catch (error) {
    console.error("Test failed:", error);
  }
};

export { testBackend };