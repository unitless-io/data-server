import express from 'express';

import filesRouter from './file';
import functionsRouter from './function';
import callsRouter from './calls';
import unitTestsRouter from './unit-tests';

const routerV1 = express.Router();

routerV1.use('/files', filesRouter);
routerV1.use('/functions', functionsRouter);
routerV1.use('/calls', callsRouter);
routerV1.use('/unit-tests', unitTestsRouter);

export default routerV1;
