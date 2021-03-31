const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const router = require('./router');
const errorHandler = require('./errorMiddeware/errorHandler');

const port = process.env.PORT || 3001;

const app = express();
app.use(compression());
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(express.static(path.resolve(__dirname, '../static')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../static/index.html'));
});

app.use('/hell', errorHandler);

app.listen(port);
