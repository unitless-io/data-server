import express from 'express';

import authRouter, { passport } from './auth';
import userRouter from './user';

const routerV1 = express.Router();

routerV1.use(passport.initialize());
routerV1.use(passport.session());

routerV1.use('/auth', authRouter);
routerV1.use('/user', userRouter);

export default routerV1;
