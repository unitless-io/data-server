import express from 'express';

import { FunctionDocument } from '@app/types';
import { Function } from '@app/db/entities/function';
import { Call } from '@app/db/entities/call';
import { CallDocument } from '@app/types/call';

const functionRouter = express.Router();

functionRouter.get('/:funcId', async (req, res) => {
  try {
    const func = await Function.findOne<FunctionDocument>({ _id: req.params.funcId }).exec();

    res.status(200).send(func || null);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error?.message);
  }
});

functionRouter.get('/:funcId/calls', async (req, res) => {
  try {
    const calls = await Call.find<CallDocument>({ functionId: req.params.funcId }).exec();

    res.status(200).send(calls || []);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error?.message);
  }
});

export default functionRouter;
