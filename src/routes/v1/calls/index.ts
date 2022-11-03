import express, { Request } from 'express';
import { groupBy, toPairs } from 'ramda';

import { getCalls, saveCalls, deleteAllCalls } from '@unitless-io/local-db';

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
      const calls = await getCalls({ fileId: req.query.fileId, funcName: req.query.funcName });

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

// DELETE: /api/v1/calls
callsRouter.delete('/', async (req, res) => {
  await deleteAllCalls();

  res.status(200).send();
});

export default callsRouter;
