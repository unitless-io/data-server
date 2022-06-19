import mongoose from 'mongoose';

export interface Call {
  functionId: string;
  result: string;
  args: string;
}

export interface CallModel extends Call, mongoose.Document {}

export interface CallDocument extends Call {
  _id: string;
}
