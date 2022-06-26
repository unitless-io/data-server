import mongoose, { Schema } from 'mongoose';

import type { FunctionModel, Function as FunctionType } from '@app/types';

const functionSchema: Schema = new Schema<FunctionType>(
  {
    fileId: { type: Schema.Types.ObjectId, index: true },
    hashId: { type: String, index: true },
    type: String,
    name: String,
    content: String,
    contentChangedAt: { type: Date, default: null },
  },
  {
    strict: false,
    timestamps: true,
  }
);

export const Function = mongoose.model<FunctionModel>('Function', functionSchema);
