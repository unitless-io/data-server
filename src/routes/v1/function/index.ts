import express, { Request } from 'express';

import { getFunctions, getFunction } from '@unitless-io/local-db';
import queryValidationFactory from '@app/middlewares/query-validation';

const functionsRouter = express.Router();

interface FunctionsRouteQuery {
  fileId: string;
}

functionsRouter.use(queryValidationFactory<FunctionsRouteQuery>(['fileId']));

functionsRouter.get('/', async (req: Request<{}, any, any, FunctionsRouteQuery>, res) => {
  try {
    const functions = await getFunctions(req.query.fileId);

    res.status(200).send(functions);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error?.message);
  }
});

functionsRouter.get('/:funcName', async (req: Request<{ funcName: string }, any, any, FunctionsRouteQuery>, res) => {
  try {
    const func = await getFunction({ fileId: req.query.fileId, funcName: req.params.funcName });

    res.status(200).send(func);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error?.message);
  }
});

export default functionsRouter;
