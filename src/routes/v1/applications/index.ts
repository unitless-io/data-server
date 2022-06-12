import express from 'express';

import { Application, File } from '@app/db';
import { ApplicationDocument, FileDocument, User } from '@app/types';

const applicationsRouter = express.Router();

applicationsRouter.get('/', async (req, res) => {
  try {
    if (!req.user) {
      throw new Error('Endpoint is not available for an unauthorized user.');
    }
    const apps = [await Application.findOne<ApplicationDocument>({ token: (req.user as User)?.appToken }).exec()];

    if (!apps) {
      throw new Error('No applications found');
    }

    res.status(200).send(apps);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error?.message);
  }
});

applicationsRouter.get('/:appId/files', async (req, res) => {
  try {
    const files = await File.find<FileDocument>({ appId: req.params.appId }).exec();

    res.status(200).send(files || []);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error?.message);
  }
});

export default applicationsRouter;
