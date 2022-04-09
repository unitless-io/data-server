import mongoose from 'mongoose';

import { UserModel } from '@app/types';

const userSchema: mongoose.Schema = new mongoose.Schema(
  {
    email: { type: String, default: null },
  },
  {
    strict: false,
    timestamps: true,
    versionKey: false,
  }
);

export const User = mongoose.model<UserModel>('User', userSchema);
