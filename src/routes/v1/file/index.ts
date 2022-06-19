import express from 'express';

import { File } from '@app/db';
import { FileDocument, FunctionDocument } from '@app/types';
import { Function } from '@app/db/entities/function';

const fileRouter = express.Router();

fileRouter.get('/:fileId', async (req, res) => {
  try {
    const file = await File.find<FileDocument>({ _id: req.params.fileId }).exec();

    res.status(200).send(file || null);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error?.message);
  }
});

fileRouter.get('/:fileId/functions', async (req, res) => {
  try {
    const functions = await Function.find<FunctionDocument>({ fileId: req.params.fileId }).exec();

    res.status(200).send(functions || []);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error?.message);
  }
});

export default fileRouter;
