import express, { Request } from 'express';
import { functionsByFileMap } from '@app/db';
import { compose, prop, propOr, values } from 'ramda';

const functionsRouter = express.Router();

interface FunctionsRouteQuery {
  fileId: string;
}

functionsRouter.use((req: Request<{}, any, any, Partial<FunctionsRouteQuery>>, res, next) => {
  if (!req.query.fileId) {
    throw new Error('Query parameter fileId is required but not provided.');
  }

  next();
});

functionsRouter.get('/', async (req: Request<{}, any, any, FunctionsRouteQuery>, res) => {
  try {
    // eslint-disable-next-line
    const functions = compose(
      values,
      propOr({}, req.query.fileId),
    )(functionsByFileMap);

    res.status(200).send(functions);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error?.message);
  }
});

functionsRouter.get('/:funcId', async (req: Request<{ funcId: string }, any, any, FunctionsRouteQuery>, res) => {
  try {
    // eslint-disable-next-line
    const func = compose(
      prop(req.params.funcId),
      propOr({}, req.query.fileId),
    )(functionsByFileMap);

    res.status(200).send(func || null);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error?.message);
  }
});

export default functionsRouter;
