const express = require('express')
const app = express()
const path = require('path')
// const routes = require('./routes')
// const cookieParser = require('cookie-parser');

// Configuring .env
require('dotenv').config({ path: path.join(__dirname, './.env') })

// app.use(cookieParser());

// Applying middleware
app.use('/', express.json()) // parse requests with JSON payload/body
app.use('/public', express.static(path.join(__dirname, '/public'))) // serve static files

// Importing other routes

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
