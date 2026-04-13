// Vercel Serverless Entry Point
// @vercel/node builds this file and serves it as a serverless function
// All /api/* requests are proxied here via vercel.json routes

const app = require('../backend/server.js');

// Vercel needs a default export or module.exports = handler
module.exports = app;
