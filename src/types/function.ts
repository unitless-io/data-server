import mongoose from 'mongoose';

import { FunctionType } from '@app/constants';

export interface Function {
  fileId: string;
  hashId: string;
  type: FunctionType;
  name: string;
  content: string;
  contentChangedAt: Date | null;
}

export interface FunctionModel extends Function, mongoose.Document {}

export interface FunctionDocument extends Function {
  _id: string;
}
