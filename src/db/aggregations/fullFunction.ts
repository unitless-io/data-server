import { Function } from '@app/db';
import { Call, File, Function as FunctionType } from '@app/types';
import { Types as MongooseTypes } from 'mongoose';

type FullFunction = FunctionType & { file: File; calls: Call[] };

export const getFullFunction = ({
  funcId,
  callIds,
}: {
  funcId: string;
  callIds: string[];
}): Promise<FullFunction[]> => {
  const mongooseCallIds = callIds.map((stringId) => new MongooseTypes.ObjectId(stringId));
  return Function.aggregate([
    { $match: { _id: new MongooseTypes.ObjectId(funcId) } },
    {
      $lookup: {
        from: 'calls',
        localField: '_id',
        foreignField: 'functionId',
        pipeline: [
          {
            $match: { _id: { $in: mongooseCallIds } },
          },
        ],
        as: 'calls',
      },
    },
    {
      $lookup: {
        from: 'files',
        localField: 'fileId',
        foreignField: '_id',
        as: 'file',
      },
    },
    {
      $addFields: {
        file: { $arrayElemAt: ['$file', 0] },
      },
    },
  ]).exec();
};
