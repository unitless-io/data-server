import mongoose, { Types } from 'mongoose';

import { OrderStatus } from '@app/constants';

export interface Order {
  userId: Types.ObjectId;
  amount: number;
  currency: string;
  status: OrderStatus;
  servicePlan: string;
  orderId: string;
}

export interface OrderModel extends Order, mongoose.Document {}

export interface OrderDocument extends Order {
  _id: string;
}
