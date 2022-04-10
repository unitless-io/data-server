import mongoose from 'mongoose';

export interface UserSession {}

export interface User {
  googleId?: string;
  google?: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
  };
  gitHubId?: string;
  gitHub?: {};
}

export interface UserModel extends User, mongoose.Document {}

export interface UserDocument extends User {
  _id: string;
}
