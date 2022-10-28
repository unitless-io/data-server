import express, { Request } from 'express';
import { callsByFunctionMap } from '@app/db';
import { compose, propOr, values } from 'ramda';

const callsRouter = express.Router();

interface CallsRouteQuery {
  funcId: string;
}

callsRouter.use((req: Request<{}, any, any, Partial<CallsRouteQuery>>, res, next) => {
  if (!req.query.funcId) {
    throw new Error('Query parameter funcId is required but not provided.');
  }

  next();
});

callsRouter.get('/', async (req: Request<{}, any, any, CallsRouteQuery>, res) => {
  try {
    // eslint-disable-next-line
    const calls = compose(
      values,
      propOr({}, req.query.funcId),
    )(callsByFunctionMap);

    res.status(200).send(calls);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error?.message);
  }
});

export default callsRouter;
