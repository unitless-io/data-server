import mongoose, { Schema } from 'mongoose';

import type { CallModel, Call as CallType } from '@app/types';

const callSchema: Schema = new Schema<CallType>(
  {
    functionId: { type: Schema.Types.ObjectId, index: true },
    result: String,
    args: String,
  },
  {
    strict: false,
    timestamps: true,
  }
);

export const Call = mongoose.model<CallModel>('Call', callSchema);
