import {createServer} from 'https';
import {readFileSync} from 'fs';

import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// Verification utils
import {verifyToken, protectAdmin} from './utils.js';


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


// HTTPS server
createServer({
  key: readFileSync('./domain.key'),
  cert: readFileSync('./domain.cert'),
}, app).listen(3000, _ => {
  console.log('> Listening on https://localhost:3000');
});
