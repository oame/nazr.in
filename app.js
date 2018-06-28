const path = require('path')
const express = require('express')
const corser = require('corser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Raven = require('raven')

const APIRouter = require('./routes/api')
const ShortLink = require('./models/short-link')

Raven.config(process.env.SENTRY_DSN).install()

// Connect to the MongoDB database
const databaseURL = process.env.MONGODB_URI || 'mongodb://db/nazrin'
mongoose.connect(databaseURL).catch(err => {
  console.error(err)
})

// Create an Express app
const app = express()
app.use(Raven.requestHandler()) // Sentry middleware
app.use(bodyParser.urlencoded({ extended: false })) // URL encoded queries
app.use(bodyParser.json()) // JSON
app.use(corser.create()) // CORS
app.use(morgan('combined')) // Logging

// API endpoint
app.use('/api', APIRouter)

// Find link and redirect if exists
app.get('/:base62', (req, res, next) => {
  ShortLink.findOne({ base62: req.params.base62 })
    .exec()
    .then(shortLink => {
      console.log('link found', shortLink)
      if (shortLink) {
        res.redirect(shortLink.url)
      } else {
        res.redirect('/')
      }
    })
    .catch(err => {
      next(err)
    })
})

// Route to React client app
app.use(express.static(path.join(__dirname + '/client/build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// Sentry error reporting
app.use(Raven.errorHandler())
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500
  res.end(res.sentry + '\n')
})

module.exports = app
