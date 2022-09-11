import mongoose, { Schema } from 'mongoose';

import { TransactionModel, Transaction as TransactionType } from '@app/types';

const transactionSchema: mongoose.Schema = new mongoose.Schema<TransactionType>(
  {
    orderid: Schema.Types.ObjectId,
  },
  {
    strict: false,
    timestamps: true,
  }
);

export const Transaction = mongoose.model<TransactionModel>('Transaction', transactionSchema);
