import mongoose from 'mongoose';

import type { FileModel, File as FileType } from '@app/types';

const fileSchema: mongoose.Schema = new mongoose.Schema<FileType>(
  {
    appId: { type: String, index: true },
    content: String,
    path: String,
  },
  {
    strict: false,
    timestamps: true,
  }
);

export const File = mongoose.model<FileModel>('File', fileSchema);
