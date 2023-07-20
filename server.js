const express = require('express');
const next = require('next');
var cloudinary = require('cloudinary').v2;
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = parseInt(process.env.PORT, 10) || 3000;

app.prepare().then(() => {
  const server = express();

  server.use(express.json({ limit: '50mb' }));

  server.get('/', (req, res) => {
    console.log("hi")
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log('Express server started on http://localhost:3000');
  });
});