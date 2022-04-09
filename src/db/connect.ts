import mongoose from 'mongoose';

import { DB_CONNECTION_URL, DEV } from '@app/config';

const RECONNECT_TIMEOUT = 5000; // ms

export const connectToMongo = () => {
  mongoose.connect(DB_CONNECTION_URL, {}, (err) => {
    if (err) {
      if (DEV) {
        console.error(err);
      }
      setTimeout(connectToMongo, RECONNECT_TIMEOUT);
    }
  });
};

const db = mongoose.connection;

db.once('open', () => {
  if (DEV) {
    console.log('connected to mongo');
  }
});

export const getMongoConnection = () => mongoose.connection;
