import mongoose, { Types } from 'mongoose';

export interface Application {
  userId: Types.ObjectId;
  token: string;
  mode: 'webpack';
  webpackData: {
    mode: string;
    target: string;
  };
}

export interface ApplicationModel extends Application, mongoose.Document {}

export interface ApplicationDocument extends Application {
  _id: string;
}
