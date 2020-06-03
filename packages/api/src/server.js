#!/usr/bin/env node

import raven from 'raven';
import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';
import app from './app';
import {isDevelopment, isProduction} from './util';

async function runner() {
  if (isDevelopment) {
    require('dotenv').config();
  }

  app.set('port', process.env.PORT || 3000);

  if (isProduction) {
    raven.config(process.env.SENTRY_DSN).install();
  }

  // Connect to the MongoDB database
  let databaseURL = process.env.MONGODB_URI;
  if (isDevelopment) {
    const mongod = new MongoMemoryServer();
    databaseURL = await mongod.getConnectionString();
  }

  await mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    autoReconnect: true,
    useUnifiedTopology: true,
  });

  const server = app.listen(app.get('port'), () => {
    console.log('Express server listening on port', server.address().port);
  });
}

runner().catch((err) => {
  console.error(err);
});
