import mongoose from 'mongoose';

import { ApplicationModel, Application as ApplicationType } from '@app/types';

const applicationSchema: mongoose.Schema = new mongoose.Schema<ApplicationType>(
  {
    token: { type: String, index: true },
    mode: String,
    webpackData: {
      mode: String,
      target: String,
    },
  },
  {
    strict: false,
    timestamps: true,
  }
);

export const Application = mongoose.model<ApplicationModel>('Application', applicationSchema);
