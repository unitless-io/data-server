import mongoose from 'mongoose';

import { UserModel, User as UserType } from '@app/types';

const userSchema: mongoose.Schema = new mongoose.Schema<UserType>(
  {
    googleId: { type: String, index: true },
    gitHubId: { type: String, index: true },
    google: Object,
    gitHub: Object,
  },
  {
    strict: false,
    timestamps: true,
    versionKey: false,
  }
);

export const User = mongoose.model<UserModel>('User', userSchema);
