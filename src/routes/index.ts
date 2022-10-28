import express from 'express';
import morgan from 'morgan';

import routerV1 from './v1';

const router = express.Router();

router.use(
  morgan('\x1b[32m::@unitless-io/data-server::\x1b[0m :method :url :status :response-time ms - :res[content-length]')
);

router.use('/v1', routerV1);

router.get('/health-check', (req, res) => res.status(200).send({ status: 'OK' }));

export default router;
