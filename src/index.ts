import http from 'http';
import express from 'express';
import cors from 'cors';
import path from 'path';
import open from 'open';
import { getBrowserAppPath } from '@unitless-io/browser-app';

import { PORT } from '@app/config';
import router from '@app/routes';

const browserAppPath = getBrowserAppPath();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    exposedHeaders: ['Content-disposition'],
  })
);

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

export const startDataServer = (port = PORT, options: { open: boolean } = { open: true }) => {
  server.listen(port, () => {
    const url = `http://localhost:${port}/`;

    console.log(`Unitless data server has been started: ${url}`);

    if (options.open) {
      open(url);
    }
  });
};
