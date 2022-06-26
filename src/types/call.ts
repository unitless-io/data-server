import mongoose, { Types } from 'mongoose';

export interface Call {
  functionId: Types.ObjectId;
  result: string;
  args: string;
}

export interface CallModel extends Call, mongoose.Document {}

export interface CallDocument extends Call {
  _id: string;
}
