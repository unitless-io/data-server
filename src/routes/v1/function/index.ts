import express, { Request } from 'express';
import { functionsByFileMap } from '@app/db';
import { compose, prop, propOr, values } from 'ramda';
import queryValidationFactory from '@app/middlewares/query-validation';

const functionsRouter = express.Router();

interface FunctionsRouteQuery {
  fileId: string;
}

functionsRouter.use(queryValidationFactory<FunctionsRouteQuery>(['fileId']));

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

functionsRouter.get('/:funcName', async (req: Request<{ funcName: string }, any, any, FunctionsRouteQuery>, res) => {
  try {
    // eslint-disable-next-line
    const func = compose(
      prop(req.params.funcName),
      propOr({}, req.query.fileId),
    )(functionsByFileMap);

    res.status(200).send(func || null);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error?.message);
  }
});

export default functionsRouter;
