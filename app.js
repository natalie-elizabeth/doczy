const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const env = process.env.NODE_ENV || 'development'


// Set up the express app
const app = express();

// Log requests to the console.

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
require('routes')(app)
app.get('/*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;