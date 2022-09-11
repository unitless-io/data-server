import mongoose, { Schema } from 'mongoose';

import { OrderModel, Order as OrderType } from '@app/types';
import { OrderStatus } from '@app/constants';

const orderSchema: mongoose.Schema = new mongoose.Schema<OrderType>(
  {
    userId: Schema.Types.ObjectId,
    status: { type: String, index: true, default: OrderStatus.Submitted },
  },
  {
    strict: false,
    timestamps: true,
  }
);

export const Order = mongoose.model<OrderModel>('Order', orderSchema);
