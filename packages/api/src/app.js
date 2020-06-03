import {join} from 'path';
import express from 'express';
import corser from 'corser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import raven from 'raven';

import APIRouter from './routes/api';
import ShortLink from './models/short-link';
import {isProduction} from './util';

// Create an Express app
const app = express();
if (isProduction) {
  app.use(raven.requestHandler()); // Sentry middleware
}
app.use(bodyParser.urlencoded({extended: false})); // URL encoded queries
app.use(bodyParser.json()); // JSON
app.use(corser.create()); // CORS
app.use(morgan('combined')); // Logging

// API endpoint
app.use('/api', APIRouter);

// Find link and redirect if exists
app.get('/:base62', async (req, res, next) => {
  try {
    const shortLink = await ShortLink.findOne({base62: req.params.base62});

    if (shortLink) {
      res.redirect(shortLink.url);
    } else {
      res.redirect('/');
    }
  } catch (err) {
    next(err);
  }
});

// Route to React client app
app.use(express.static(join(__dirname + '../../web/build')));
app.get('*', (req, res) => {
  res.sendFile(join(__dirname + '../../web/build/index.html'));
});

if (isProduction) {
  // Sentry error reporting
  app.use(raven.errorHandler());
  app.use(function onError(err, req, res, next) {
    console.log(err);
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + '\n');
  });
}

export default app;
