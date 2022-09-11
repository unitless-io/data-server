import mongoose, { Types } from 'mongoose';

import { PayseraOrderStatus } from '@app/constants';

export interface Transaction {
  orderid: Types.ObjectId;
  status: PayseraOrderStatus;
}

export interface TransactionModel extends Transaction, mongoose.Document {}

export interface TransactionDocument extends Transaction {
  _id: string;
}
