import express from 'express';

import { filesByIdMap } from '@app/db';

const filesRouter = express.Router();

filesRouter.get('/', async (req, res) => {
  try {
    res.status(200).send(Object.values(filesByIdMap));
  } catch (error: any) {
    console.log(error);
    res.status(500).send(error?.message);
  }
});

export default filesRouter;
