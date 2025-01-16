const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Proxy configuration
app.use(
  "/api", // Route for your frontend to call
  createProxyMiddleware({
    target: "https://api-icc.ican.vn", // Backend API URL
    changeOrigin: true, // Change the origin of the host header to the target URL
    pathRewrite: { "^/api": "" }, // Remove "/api" prefix when forwarding the request
    onProxyReq: (proxyReq, req, res) => {
      // Optionally, modify requests before they are sent to the backend
      console.log("Proxying request:", req.method, req.url);
    },
    onProxyRes: (proxyRes, req, res) => {
      // Optionally, log or modify the response
      console.log("Received response with status:", proxyRes.statusCode);
    },
  })
);

// Start the proxy server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Proxy server is running at http://localhost:${PORT}`);
});
