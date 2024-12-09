// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS to allow remote testing by FCC
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from the public directory
app.use(express.static('public'));

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Example API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

// Request Header Parser endpoint
app.get('/api/whoami', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const lang = req.headers['accept-language'];
  const agent = req.get('User-Agent');

  res.json({
    ipaddress: ip.split(',')[0], // In case multiple IPs are present
    language: lang,
    software: agent,
  });
});

// Export the app for use in index.js
module.exports = app;
