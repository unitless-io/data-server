import http from 'http';

import express from 'express';
import path from 'path';
import findNodeModules from 'find-node-modules';
import open from 'open';

import { PORT } from '@app/config';
import router from '@app/routes';

const browserAppPath = path.join(
  findNodeModules({ cwd: __dirname, relative: false })[0],
  '@unitless-io/browser-app',
  'build'
);

const app = express();

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
