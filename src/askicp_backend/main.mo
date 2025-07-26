import Blob "mo:base/Blob";
import Cycles "mo:base/ExperimentalCycles";
import Nat8 "mo:base/Nat8";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

actor {
  
  //The IC management canister interface
  type IC = actor {
    http_request : HttpRequestArgs -> async HttpResponsePayload;
  };

  type HttpRequestArgs = {
    url : Text;
    max_response_bytes : ?Nat64;
    headers : [HttpHeader];
    body : ?[Nat8];
    method : HttpMethod;
    transform : ?TransformRawResponseFunction;
  };

  type HttpHeader = {
    name : Text;
    value : Text;
  };

  type HttpMethod = {
    #get;
    #post;
    #head;
  };

  type HttpResponsePayload = {
    status : Nat;
    headers : [HttpHeader];
    body : [Nat8];
  };

  type TransformRawResponseFunction = {
    function : shared query HttpResponsePayload -> async HttpResponsePayload;
    context : Blob;
  };

  let ic : IC = actor ("aaaaa-aa");

  //Transform function to clean up the response
  public query func transform(raw : HttpResponsePayload) : async HttpResponsePayload {
    let transformed : HttpResponsePayload = {
      status = raw.status;
      body = raw.body;
      headers = []; // Clear headers to avoid consensus issues
    };
    transformed
  };

  public func fetch_borrowers() : async Text {
    Cycles.add(230_000_000_000);
    
    let http_request : HttpRequestArgs = {
      url = "https://rag-test-x7m8.onrender.com/api/borrowers";
      max_response_bytes = ?20000;
      headers = [
        { name = "Content-Type"; value = "application/json" }
      ];
      body = null;
      method = #get;
      transform = ?{
        function = transform;
        context = Blob.fromArray([]);
      };
    };

    try {
      let http_response : HttpResponsePayload = await ic.http_request(http_request);
      let response_body: Blob = Blob.fromArray(http_response.body);
      let decoded_text: Text = switch (Text.decodeUtf8(response_body)) {
        case (null) { "{\"error\":\"Failed to decode response\"}" };
        case (?text) { 
          if (http_response.status >= 200 and http_response.status < 300) {
            text
          } else {
            "{\"error\":\"Failed to fetch borrowers with status " # Nat.toText(http_response.status) # "\"}"
          }
        };
      };
      decoded_text
    } catch (_error) {
      "{\"error\":\"Failed to fetch borrower data\"}"
    }
  };

  private func contains_borrower_keywords(text: Text) : Bool {
    let keywords = ["borrower", "loan", "credit", "risk", "analyze", "portfolio", "lending", "applicant", "approve", "default", "repayment"];
    
    for (keyword in keywords.vals()) {
      if (Text.contains(text, #text keyword)) {
        return true;
      }
    };
    false
  };

  public func claude_api_call(messages: Text) : async Text {
    
    // Check if the message contains borrower-related keywords
    if (contains_borrower_keywords(messages)) {
      // Route to borrower analysis
      return await analyze_borrowers_summary();
    };
    
    // Add cycles for the HTTP call - required for HTTPS outcalls
    // Increased cycles for mainnet (230B cycles for HTTPS outcalls)
    Cycles.add(230_000_000_000);
    
    let claude_api_key = "CLAUDE_API_KEY";
    
    // Create the JSON request body for Claude API
    let request_body_json: Text = "{"
      # "\"model\": \"claude-3-haiku-20240307\","
      # "\"max_tokens\": 1000,"
      # "\"temperature\": 0.7,"
      # "\"messages\": " # messages
      # "}";
    
    // Convert to Blob and then to [Nat8]
    let request_body_blob: Blob = Text.encodeUtf8(request_body_json);
    let request_body_bytes: [Nat8] = Blob.toArray(request_body_blob);

    // Setup HTTP request arguments
    let http_request : HttpRequestArgs = {
      url = "https://api.anthropic.com/v1/messages";
      max_response_bytes = ?4096; // Limit response size
      headers = [
        { name = "Content-Type"; value = "application/json" },
        { name = "x-api-key"; value = claude_api_key },
        { name = "anthropic-version"; value = "2023-06-01" }
      ];
      body = ?request_body_bytes;
      method = #post;
      transform = ?{
        function = transform;
        context = Blob.fromArray([]);
      };
    };

    try {
      // Make the HTTP request
      let http_response : HttpResponsePayload = await ic.http_request(http_request);
      
      // Convert response body back to text
      let response_body: Blob = Blob.fromArray(http_response.body);
      let decoded_text: Text = switch (Text.decodeUtf8(response_body)) {
        case (null) { "{\"error\":\"Failed to decode response\"}" };
        case (?text) { 
          // Check if response is successful (status 200-299)
          if (http_response.status >= 200 and http_response.status < 300) {
            text
          } else {
            "{\"error\":\"API request failed with status " # Nat.toText(http_response.status) # "\"}"
          }
        };
      };
      
      decoded_text
      
    } catch (_error) {
      // Return error response in the expected format
      "{\"error\":\"HTTP request failed\",\"fallback\":\"I'm having trouble connecting to Claude right now. Please try again later.\"}"
    }
  };

  public func analyze_borrowers_summary() : async Text {
    let summary_prompt = "[{\"role\": \"user\", \"content\": \"Analyze this borrower portfolio: 15 applicants with credit scores 605-858, app scores 709-899. Risk categories: 5 Low risk (Arjun 851/895, Karan 844/892, Ajay 858/899, Rahul 789/841, Isha 799/875), 4 Medium risk (Rohit 765/842, Pooja 699/748, Sneha 712/762, Ritika 768/832), 6 High risk (Nikhil 612/731, Divya 632/721, Meena 688/709, Vikram 605/718). Provide: 1) Risk assessment 2) Top 3 high-risk borrowers 3) Approval recommendations\"}]";
    
    Cycles.add(230_000_000_000);
    
    let claude_api_key = "CLAUDE_API_KEY";
    
    let request_body_json: Text = "{"
      # "\"model\": \"claude-3-haiku-20240307\","
      # "\"max_tokens\": 1000,"
      # "\"temperature\": 0.7,"
      # "\"messages\": " # summary_prompt
      # "}";
    
    let request_body_blob: Blob = Text.encodeUtf8(request_body_json);
    let request_body_bytes: [Nat8] = Blob.toArray(request_body_blob);

    let http_request : HttpRequestArgs = {
      url = "https://api.anthropic.com/v1/messages";
      max_response_bytes = ?4096;
      headers = [
        { name = "Content-Type"; value = "application/json" },
        { name = "x-api-key"; value = claude_api_key },
        { name = "anthropic-version"; value = "2023-06-01" }
      ];
      body = ?request_body_bytes;
      method = #post;
      transform = ?{
        function = transform;
        context = Blob.fromArray([]);
      };
    };

    try {
      let http_response : HttpResponsePayload = await ic.http_request(http_request);
      let response_body: Blob = Blob.fromArray(http_response.body);
      let decoded_text: Text = switch (Text.decodeUtf8(response_body)) {
        case (null) { "{\"error\":\"Failed to decode response\"}" };
        case (?text) { 
          if (http_response.status >= 200 and http_response.status < 300) {
            text
          } else {
            "{\"error\":\"API request failed with status " # Nat.toText(http_response.status) # "\"}"
          }
        };
      };
      decoded_text
    } catch (_error) {
      "{\"error\":\"HTTP request failed\",\"fallback\":\"P2P lending analysis unavailable\"}"
    }
  };

  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };
};