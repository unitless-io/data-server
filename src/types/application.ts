import mongoose from 'mongoose';

export interface Application {
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
