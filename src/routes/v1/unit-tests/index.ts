import express, {Request} from 'express';
import * as stream from 'stream';
import head from 'ramda/src/head';

import { Function } from '@app/types';
import { Call, File } from '@app/types';
import generateUnitTest, { Frameworks } from '@app/gen-tests';
import { getTestFileName } from '@app/helpers/get-test-file-name';
import {getFullFunction} from '@app/db/aggregations/fullFunction';

const unitTestsRouter = express.Router();

interface DownloadParams {
  funcId: string;
  callIds: string;
}

unitTestsRouter.get('/', async (req: Request<{}, any, any, DownloadParams>, res) => {
  try {
    const { funcId, callIds } = req.query;

    const fullFunction = head(await getFullFunction({ funcId, callIds: callIds?.split(',') }));

    if (!fullFunction) {
      throw new Error('No function found for this query');
    }

    const testFileName = getTestFileName(fullFunction.file.path, fullFunction.name);
    const unitTestsFile = await generateUnitTest({
      importPath: fullFunction.file.path,
      importName: fullFunction.name,
      testsData: fullFunction.calls,
    });

    const fileContents = Buffer.from(unitTestsFile, 'base64');

    const readStream = new stream.PassThrough();
    readStream.end(fileContents);

    res.set('Content-disposition', `attachment; filename=${testFileName}`);
    res.set('Content-Type', 'text/plain');

    readStream.pipe(res);
    // res.end(fileContents);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error?.message);
  }
});

export default unitTestsRouter;
