import express, { Request } from 'express';
import { compose, propOr, values, groupBy, toPairs } from 'ramda';
import { saveCalls } from '@unitless-io/local-db';

import { callsByFunctionMap, getFunctionId } from '@app/db';
import queryValidationFactory from '@app/middlewares/query-validation';

const callsRouter = express.Router();

interface CallsRouteQuery {
  fileId: string;
  funcName: string;
}

callsRouter.get(
  '/',
  queryValidationFactory<CallsRouteQuery>(['fileId', 'funcName']),
  async (req: Request<{}, any, any, CallsRouteQuery>, res) => {
    try {
      const functionId = getFunctionId(req.query);

      // eslint-disable-next-line
      const calls = compose(values, propOr({}, functionId))(callsByFunctionMap);

      res.status(200).send(calls);
    } catch (error: any) {
      console.error(error);
      res.status(500).send(error?.message);
    }
  }
);

type PostReqBody = { id: string; args: string; result: string }[];
// POST: /api/v1/calls
callsRouter.post('/', async (req, res) => {
  res.status(200).send();

  const data: PostReqBody = req.body || [];

  toPairs(groupBy(({ id }) => id, data)).forEach(async ([id, calls]) => {
    saveCalls(id, calls);
  });
});

export default callsRouter;
