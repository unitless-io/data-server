import mongoose, { Schema } from 'mongoose';

import type { FileModel, File as FileType } from '@app/types';

const fileSchema: Schema = new Schema<FileType>(
  {
    appId: { type: Schema.Types.ObjectId, index: true },
    content: String,
    path: String,
  },
  {
    strict: false,
    timestamps: true,
  }
);

export const File = mongoose.model<FileModel>('File', fileSchema);
