import express from 'express';

import authRouter, { passport } from './auth';
import userRouter from './user';
import applicationsRouter from './applications';
import fileRouter from './file';
import functionRouter from './function';
import unitTests from './unit-tests';
import paymentRouter from './payment';

const routerV1 = express.Router();

routerV1.use(passport.initialize());
routerV1.use(passport.session());

routerV1.use('/auth', authRouter);
routerV1.use('/user', userRouter);
routerV1.use('/applications', applicationsRouter);
routerV1.use('/file', fileRouter);
routerV1.use('/function', functionRouter);
routerV1.use('/unit-tests', unitTests);
routerV1.use('/payment', paymentRouter);

export default routerV1;
