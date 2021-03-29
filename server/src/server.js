const spdy = require('spdy');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const router = require('./router');

const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

spdy
  .createServer({
    key: fs.readFileSync(path.resolve(__dirname, '../keys/key.key')),
    cert: fs.readFileSync(path.resolve(__dirname, '../keys/certificate.crt')),
  }, app)
  .listen(port, (err) => {
    if (err) {
      throw new Error(err);
    }

    /* eslint-disable no-console */
    console.log(`Listening on port: ${port}.`);
    /* eslint-enable no-console */
  });
