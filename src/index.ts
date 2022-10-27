import http from 'http';

import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { PORT, DEV } from '@app/config';
import router from '@app/routes';

const app = express();

if (DEV) {
  app.use(
    cors({
      origin: false,
      credentials: true,
      exposedHeaders: ['Content-disposition'],
    })
  );
  app.use(morgan('common'));
}

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

// Health check
app.get('/health-check', (req, res) => {
  res.status(200).send({ status: 'OK' });
});

const server = http.createServer(app);

export const startDataServer = (port = PORT) => {
  server.listen(port, () => {
    console.log(`Unitless data server has been started at port: ${port}`);
  });
};
