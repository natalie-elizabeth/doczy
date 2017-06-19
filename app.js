const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const env = process.env.NODE_ENV || 'development';
const path = require("path");

// Set up the express app
const port = process.env.NODE_ENV || 3000;
const app = express();

// Log requests to the console.
app.use(logger('dev'));
app.use(express.static(`${__dirname}/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('webpack-hot-middleware'));

// Setup a default catch-all route that sends back a welcome message in JSON format.
require('./server/routes')(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

module.exports = app;
