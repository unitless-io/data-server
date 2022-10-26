import express, { Request } from 'express';
import * as stream from 'stream';

import generateUnitTest from '@app/gen-tests';
import { getTestFileName } from '@app/helpers/get-test-file-name';
import { filesByIdMap, functionsByFileMap, callsByFunctionMap } from '@app/db';
import { compose, propOr, props } from 'ramda';
import { Call } from '@app/types';
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
    const targetFunctionId = `${fileId}:${funcName}`;

    const targetFile = filesByIdMap[fileId];
    const targetFunction = functionsByFileMap[fileId]?.[funcName];
    const targetCalls = compose(
      props<string, Call>(callIds),
      propOr<Record<string, Call>>({}, targetFunctionId)
    )(callsByFunctionMap);

    if (!targetFile) {
      throw new Error(`No files found for fileId: ${fileId}`);
    }

    if (!targetFunction) {
      throw new Error(`No functions found for funcId: ${funcName}`);
    }

    if (targetCalls.length === 0) {
      throw new Error(`No function calls found for callIds: ${callIdsString}`);
    }

    const testFileName = getTestFileName(targetFile.path, targetFunction.name);
    const unitTestsFile = await generateUnitTest({
      importPath: targetFile.path,
      importName: targetFunction.name,
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
