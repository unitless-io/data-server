import express from 'express';

import routerV1 from './v1';

const router = express.Router();

router.use('/v1', routerV1);

router.get('/health', (req, res) => res.status(200).send({ status: 'OK' }));

export default router;
