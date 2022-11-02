import express, { Request } from 'express';
import * as stream from 'stream';
import { getCalls, getFile } from '@unitless-io/local-db';

import generateUnitTest from '@app/gen-tests';
import { getTestFileName } from '@app/helpers/get-test-file-name';
import queryValidationFactory from '@app/middlewares/query-validation';

const unitTestsRouter = express.Router();

interface DownloadQuery {
  fileId: string;
  funcName: string;
  callIds: string;
}

unitTestsRouter.use(queryValidationFactory<DownloadQuery>(['fileId', 'funcName', 'callIds']));

unitTestsRouter.get('/', async (req: Request<{}, any, any, DownloadQuery>, res) => {
  try {
    const { fileId, funcName, callIds: callIdsString } = req.query;
    const callIds = callIdsString.split(',');

    const targetFile = await getFile(fileId);
    const targetCalls = await getCalls({ fileId, funcName, callIds });

    if (!targetFile) {
      throw new Error(`No files found for fileId: ${fileId}`);
    }

    if (targetCalls.length === 0) {
      throw new Error(`No function calls found for callIds: ${callIdsString}`);
    }

    const testFileName = getTestFileName(targetFile.path, funcName);
    const unitTestsFile = await generateUnitTest({
      importPath: targetFile.path,
      importName: funcName,
      testsData: targetCalls,
    });

    const fileContents = Buffer.from(unitTestsFile);

    const readStream = new stream.PassThrough();
    readStream.end(fileContents);

    res.set('Content-disposition', `attachment; filename=${testFileName}`);
    res.set('Content-Type', 'text/plain');

    readStream.pipe(res);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error?.message);
  }
});

export default unitTestsRouter;
