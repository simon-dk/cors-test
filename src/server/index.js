const express = require("express");

const app = express();

// Middleware to set response headers
app.use((req, res, next) => {
  // Mimicks the response from the datafordeler.dk API
  // res.setHeader("Cache-Control", "private");
  // res.setHeader("Transfer-Encoding", "chunked");
  // res.setHeader("Content-Type", "application/json; charset=UTF-8");
  // res.setHeader("Server", "datafordeler.dk");
  // res.setHeader("SwitchboardPerformanceInMs", "57.3759");
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("X-POWERED-BY", "datafordeler.dk");
  // res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

  // Mimicks pipedream
  // res.setHeader("content-type", "application/json; charset=UTF-8");
  // res.setHeader("x-powered-by", "Express");
  // res.setHeader("Access-Control-Allow-Origin", "*");

  // Allow all origins and headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  next();
});

// Route handling
app.get("/", (req, res) => {
  // Response
  res.json({ response: "Hello, World!" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
