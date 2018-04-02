const { join } = require('path')
const express = require('express')
const corser = require('corser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Raven = require('raven')

const ShortLink = require('./models/short-link')
const APIRouter = require('./routes/api')

Raven.config(process.env.SENTRY_DSN).install()

// Connect to the MongoDB database
const databaseURL = process.env.MONGODB_URI || 'mongodb://db/nazrin'
mongoose.connect(databaseURL).catch(err => {
  console.error(err)
})

// Create express application
const app = express()

app.use(Raven.requestHandler()) // Sentry
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('combined')) // log
app.use(corser.create()) // CORS

// API routes
app.use('/api', APIRouter)

// Global routes
app.get('/*', (req, res) => {
  ShortLink.findOne({ base62: req.params[0] }, (err, shortLink) => {
    if (err || shortLink === null) {
      return res.redirect('/')
    }
    res.redirect(shortLink.url)
  })
})

// Sentry
app.use(Raven.errorHandler())
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500
  res.end(res.sentry + '\n')
})

module.exports = app
