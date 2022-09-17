import mongoose, { Schema } from 'mongoose';

import { OrderModel, Order as OrderType } from '@app/types';
import { OrderStatus } from '@app/constants';

const orderSchema: mongoose.Schema = new mongoose.Schema<OrderType>(
  {
    userId: { type: Schema.Types.ObjectId, index: true },
    status: { type: String, index: true, default: OrderStatus.Submitted },
    orderId: { type: String, index: true },
  },
  {
    strict: false,
    timestamps: true,
  }
);

export const Order = mongoose.model<OrderModel>('Order', orderSchema);
