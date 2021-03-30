const spdy = require('spdy');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const router = require('./router');
const errorHandler = require('./errorMiddeware/errorHandler');

const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(errorHandler);

spdy
  .createServer({
    key: fs.readFileSync(path.resolve(__dirname, '../keys/key.key')),
    cert: fs.readFileSync(path.resolve(__dirname, '../keys/certificate.crt')),
  }, app)
  .listen(port);
