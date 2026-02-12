// =====================================================
// 📘 HTTP STATUS CODES IN NODE.JS (EXPRESS)
// =====================================================

// In Express we send status codes like this:
// res.status(200).json({ message: "Success" })

// =====================================================
// 1xx — INFORMATIONAL
// =====================================================

// 100 Continue → Request received, continue
// 101 Switching Protocols → Protocol is being switched
// 102 Processing → Request is being processed
// 103 Early Hints → Early response before final response


// =====================================================
// 2xx — SUCCESS
// =====================================================

// 200 OK → Request successful
// 201 Created → Resource created
// 202 Accepted → Accepted but not completed
// 203 Non-Authoritative Information → Modified response
// 204 No Content → Success but no response body
// 205 Reset Content → Reset document view
// 206 Partial Content → Partial data returned

// 🔥 Commonly Used:
// 200 → Success (GET)
// 201 → Created (POST)
// 204 → Deleted successfully


// =====================================================
// 3xx — REDIRECTION
// =====================================================

// 300 Multiple Choices → Multiple options available
// 301 Moved Permanently → Permanent redirect
// 302 Found → Temporary redirect
// 303 See Other → Redirect using GET
// 304 Not Modified → Cached version valid
// 307 Temporary Redirect → Temporary redirect (method stays same)
// 308 Permanent Redirect → Permanent redirect (method stays same)


// =====================================================
// 4xx — CLIENT ERRORS
// =====================================================

// 400 Bad Request → Invalid input
// 401 Unauthorized → Authentication required
// 402 Payment Required → Reserved
// 403 Forbidden → No permission
// 404 Not Found → Resource not found
// 405 Method Not Allowed → HTTP method not allowed
// 406 Not Acceptable → Format not acceptable
// 407 Proxy Authentication Required → Proxy auth needed
// 408 Request Timeout → Client timeout
// 409 Conflict → Data conflict
// 410 Gone → Resource permanently removed
// 411 Length Required → Content-Length required
// 412 Precondition Failed → Condition not met
// 413 Payload Too Large → Body too large
// 414 URI Too Long → URL too long
// 415 Unsupported Media Type → Wrong content-type
// 416 Range Not Satisfiable → Invalid range
// 417 Expectation Failed → Expect header failed
// 422 Unprocessable Entity → Validation error
// 429 Too Many Requests → Rate limit exceeded

// 🔥 Common in APIs:
// 400 → Bad input
// 401 → Not logged in
// 403 → No access
// 404 → Not found
// 422 → Validation error
// 429 → Too many requests


// =====================================================
// 5xx — SERVER ERRORS
// =====================================================

// 500 Internal Server Error → Something broke
// 501 Not Implemented → Feature not available
// 502 Bad Gateway → Invalid upstream response
// 503 Service Unavailable → Server down
// 504 Gateway Timeout → Upstream timeout
// 505 HTTP Version Not Supported → Version not supported
// 507 Insufficient Storage → Not enough storage
// 508 Loop Detected → Infinite loop


// =====================================================
// 🚀 EXPRESS EXAMPLE
// =====================================================

// app.get("/", (req, res) => {
//     res.status(200).json({ message: "Server running" });
// });

// app.post("/user", (req, res) => {
//     if (!req.body.email) {
//         return res.status(400).json({ error: "Email required" });
//     }
//     res.status(201).json({ message: "User created" });
// });

