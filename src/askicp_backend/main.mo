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

  public func claude_api_call(messages: Text) : async Text {
    
    // Add cycles for the HTTP call - required for HTTPS outcalls
    Cycles.add(20_949_972_000);
    
    // TODO: Replace with your Claude API key
    let claude_api_key = "YOUR_CLAUDE_API_KEY_HERE";
    
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

  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };
};