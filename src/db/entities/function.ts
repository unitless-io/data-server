import mongoose from 'mongoose';

import type { FunctionModel, Function as FunctionType } from '@app/types';

const functionSchema: mongoose.Schema = new mongoose.Schema<FunctionType>(
  {
    fileId: { type: String, index: true },
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
