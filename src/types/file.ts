import mongoose, { Types } from 'mongoose';

export interface File {
  appId: Types.ObjectId;
  content: string;
  areInterceptorsInjected: boolean;
  path: string;
}

export interface FileModel extends File, mongoose.Document {}

export interface FileDocument extends File {
  _id: string;
}
