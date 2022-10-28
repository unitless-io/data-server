import express, { Request } from 'express';
import * as stream from 'stream';

import generateUnitTest from '@app/gen-tests';
import { getTestFileName } from '@app/helpers/get-test-file-name';
import { filesByIdMap, functionsByFileMap, callsByFunctionMap } from '@app/db';
import callsRouter from '@app/routes/v1/calls';
import { compose, propIs, propOr, props } from 'ramda';
import { Call } from '@app/types';

const unitTestsRouter = express.Router();

interface DownloadQuery {
  fileId: string;
  funcId: string;
  callIds: string;
}

callsRouter.use((req: Request<{}, any, any, Partial<DownloadQuery>>, res, next) => {
  const missingQuery = ['fileId', 'funcId', 'callIds'].reduce<string[]>((acc, queryParameter) => {
    if (!propIs(String, queryParameter, req.query)) {
      acc.push(queryParameter);
    }

    return acc;
  }, []);

  if (missingQuery) {
    throw new Error(`Query parameter(s) ${missingQuery.join(', ')} are required but not provided.`);
  }

  next();
});

unitTestsRouter.get('/', async (req: Request<{}, any, any, DownloadQuery>, res) => {
  try {
    const { fileId, funcId, callIds: callIdsString } = req.query;
    const callIds = callIdsString.split(',');

    const targetFile = filesByIdMap[fileId];
    const targetFunction = functionsByFileMap[fileId]?.[funcId];
    const targetCalls = compose(
      props<string, Call>(callIds),
      propOr<Record<string, Call>>({}, funcId)
    )(callsByFunctionMap);

    if (!targetFile) {
      throw new Error(`No files found for fileId: ${fileId}`);
    }

    if (!targetFunction) {
      throw new Error(`No functions found for funcId: ${funcId}`);
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
