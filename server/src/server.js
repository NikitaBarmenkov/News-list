const spdy = require('spdy');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const port = 3001;

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'test' });
});

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
