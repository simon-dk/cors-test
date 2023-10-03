const http = require("http");

const server = http.createServer((req, res) => {
  // Mimicks the response from the datafordeler.dk API
  res.setHeader("Cache-Control", "private");
  res.setHeader("Transfer-Encoding", "chunked");
  res.setHeader("Content-Type", "application/json; charset=UTF-8");
  res.setHeader("Server", "datafordeler.dk");
  res.setHeader("SwitchboardPerformanceInMs", "57.3759");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("X-POWERED-BY", "datafordeler.dk");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

  // Mimicks pipedream
  // res.setHeader("content-type", "application/json; charset=UTF-8");
  // res.setHeader("x-powered-by", "Express");
  // res.setHeader("Access-Control-Allow-Origin", "*");

  // Response
  res.end(JSON.stringify({ response: "Hello, World!" }));
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
