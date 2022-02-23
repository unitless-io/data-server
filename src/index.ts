import http from 'http';

import express from 'express';
import morgan from 'morgan';

import { PORT } from '@app/config';

const app = express();

app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health-check', (req, res) => {
  res.status(200).send({ status: 'OK' });
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server has been started at port: ${PORT}`);
});
