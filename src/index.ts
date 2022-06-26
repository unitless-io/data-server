import http from 'http';

import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { PORT, DEV } from '@app/config';
import { connectToMongo } from '@app/db';
import { getSessionParser } from '@app/session';
import router from '@app/routes';

connectToMongo();

const app = express();

if (DEV) {
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true, //access-control-allow-credentials:true
      exposedHeaders: ['Content-disposition'],
    })
  );
  app.use(morgan('common'));
}

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1); // trust first proxy

app.use(getSessionParser());

app.use('/api', router);

// Health check
app.get('/health-check', (req, res) => {
  res.status(200).send({ status: 'OK' });
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server has been started at port: ${PORT}`);
});
