const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Proxy configuration
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://api-icc.ican.vn",
    changeOrigin: true,
    pathRewrite: { "^/api": "" }, // Remove "/api" prefix when forwarding the request
    onProxyReq: (proxyReq, req, res) => {
      console.log("Proxying request:", req.method, req.url);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log("Received response with status:", proxyRes.statusCode);
    },
  })
);

// Start the proxy server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Proxy server is running at http://localhost:${PORT}`);
});
