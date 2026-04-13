// Vercel Serverless Function Entry Point
// All /api/* requests are routed here by vercel.json
// Express handles the internal routing (auth, courses, modules, etc.)

const app = require('../backend/server.js');

module.exports = app;
