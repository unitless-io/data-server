import mongoose from 'mongoose';

export interface UserSession {
  userId: string;
  remoteAddress: string | null;
  ip: string | null;
  xForwardedFor: string | string[] | null;
  cookie: any;
}

export interface User {
  email: string;
}

export interface UserModel extends User, mongoose.Document {}

export interface UserDocument extends User {
  _id: string;
}
