import express, { Request } from 'express';
import { compose, propOr, values } from 'ramda';

import { callsByFunctionMap, getFunctionId } from '@app/db';
import queryValidationFactory from '@app/middlewares/query-validation';

const callsRouter = express.Router();

interface CallsRouteQuery {
  fileId: string;
  funcName: string;
}

callsRouter.use(queryValidationFactory<CallsRouteQuery>(['fileId', 'funcName']));

callsRouter.get('/', async (req: Request<{}, any, any, CallsRouteQuery>, res) => {
  try {
    const functionId = getFunctionId(req.query);

    // eslint-disable-next-line
    const calls = compose(
      values,
      propOr({}, functionId),
    )(callsByFunctionMap);

    res.status(200).send(calls);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error?.message);
  }
});

export default callsRouter;
