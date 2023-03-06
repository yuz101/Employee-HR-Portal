const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const routes = require('./routes');
// const cookieParser = require('cookie-parser');

// Configuring .env
require('dotenv').config({ path: path.join(__dirname, './.env') });

app.use(cors());

// app.use(cookieParser());

// Applying middleware
app.use(express.json()); // parse requests with JSON payload/body
app.use('/public', express.static(path.join(__dirname, '/public'))); // serve static files


app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Importing other routes
app.use('/', routes.EmployeeRouter);
app.use('/application', routes.ApplicationRouter);
app.use('/hr', routes.HRRouter);
app.use('/documents', routes.DocumentRouter);

// Catch-all route for unsupported paths
app.all('*', (req, res) => {
  res
    .status(400)
    .json({
      error: 'InvalidURI',
      description: `The URI ${req.url} is not valid.`,
    })
});

module.exports = app;
