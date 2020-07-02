const {createServer} = require('http');

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Verification utils
const {verifyToken, protectAdmin} = require('./utils.js');


const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('./public'));


// All API endpoints are protected to verify tokens
app.use('/api/*', verifyToken);
app.use('/api/admin/*', protectAdmin);

// Log credentials
app.post('/creds', (req, res) => {
  res.json({
    url: req.url,
    cookies: req.cookies,
    headers: JSON.stringify(req.headers),
    data: req.body,
  });
});

// tokenData is appended at all requests from verifyToken
app.get('/api/me', (req, res) => {
  res.json(req.tokenData);
});

// A fake delete account endpoint accessible only to admin. See protectAdmin util
app.post('/api/admin/deleteaccount', (req, res) => {
  res.json({
    success: true,
    message: `Deleted account ${req.body.accId}`,
  });
})


// HTTP server
createServer(app).listen(3000, _ => {
  console.log('> Listening on http://localhost:3000');
});
