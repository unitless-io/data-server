import express from 'express';

import { getFiles } from '@unitless-io/local-db';

const filesRouter = express.Router();

filesRouter.get('/', async (req, res) => {
  try {
    const filesByIdMap = await getFiles();
    res.status(200).send(Object.values(filesByIdMap));
  } catch (error: any) {
    console.log(error);
    res.status(500).send(error?.message);
  }
});

export default filesRouter;
