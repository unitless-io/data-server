import http from 'http';

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import { PORT, DEV } from '@app/config';
import router from '@app/routes';

const browserAppPath = path.join(__dirname, '..', 'node_modules', '@unitless-io/browser-app', 'build');

const app = express();

if (DEV) {
  app.use(
    cors({
      origin: true,
      credentials: true,
      exposedHeaders: ['Content-disposition'],
    })
  );
}

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

// Health check
app.get('/health-check', (req, res) => {
  res.status(200).send({ status: 'OK' });
});

app.use(express.static(browserAppPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(browserAppPath, 'index.html'));
});

const server = http.createServer(app);

export const startDataServer = (port = PORT) => {
  server.listen(port, () => {
    console.log(`Unitless data server has been started at port: ${port}`);
  });
};
