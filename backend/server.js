const express = require('express')
const app = express()
const path = require('path')
const routes = require('./routes')
// const cookieParser = require('cookie-parser');

// Configuring .env
require('dotenv').config({ path: path.join(__dirname, './.env') })

// app.use(cookieParser());

// Applying middleware
app.use('/', express.json()) // parse requests with JSON payload/body
app.use('/public', express.static(path.join(__dirname, '/public'))) // serve static files


app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Importing other routes
app.use('/', routes.EmployeeRouter)
app.use('/', routes.ApplicationRouter)
app.use('/hr', routes.HRRouter)

// Catch-all route for unsupported paths
app.all('*', (req, res) => {
  res
    .status(400)
    .json({
      error: 'InvalidURI',
      description: `The URI ${req.url} is not valid.`,
    })
})

module.exports = app
