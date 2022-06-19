import mongoose from 'mongoose';

import type { CallModel, Call as CallType } from '@app/types';

const callSchema: mongoose.Schema = new mongoose.Schema<CallType>(
  {
    functionId: { type: String, index: true },
    result: String,
    args: String,
  },
  {
    strict: false,
    timestamps: true,
  }
);

export const Call = mongoose.model<CallModel>('Call', callSchema);
