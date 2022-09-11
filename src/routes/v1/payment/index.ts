import express from 'express';
import Paysera from 'paysera-nodejs';
import { Types as MongooseTypes } from 'mongoose';

import { APP_URL, PAYSERA_PROJECT_ID, PAYSERA_SIGN_PASSWORD } from '@app/config';
import { Order, Transaction } from '@app/db';
import { OrderDocument } from '@app/types';
import { OrderStatus, PayseraOrderStatus } from '@app/constants';

const options = {
  projectid: PAYSERA_PROJECT_ID,
  sign_password: PAYSERA_SIGN_PASSWORD,
  callbackurl: `${APP_URL}/api/v1/payment/callback`,
  test: 1, // TODO
};

const paysera = new Paysera(options);

const paymentRouter = express.Router();

// POST: /api/v1/payment
paymentRouter.post('/', async (req, res) => {
  if (req.isAuthenticated()) {
    const amount = 100; // TODO
    const currency = 'EUR'; // TODO

    // TODO should be only one activ order
    const order = await Order.findOneAndUpdate<OrderDocument>(
      { userId: req.user._id },
      { amount, currency, servicePlan: 'test' },
      { lean: true, new: true, upsert: true, setDefaultsOnInsert: true }
    ).exec();

    const orderId = order._id;

    const params = {
      orderid: orderId,
      p_email: req.user.google?.email,
      amount,
      currency,
      accepturl: `${APP_URL}/api/v1/payment/accept/${orderId}`,
      cancelurl: `${APP_URL}/api/v1/payment/cancel/${orderId}`,
    };

    const redirectUrl = paysera.buildRequestUrl(params);

    return res.status(200).send({ redirectUrl });
  }
  return res.status(401).send(null);
});

// GET: /api/v1/payment/accept/:orderId
paymentRouter.get('/accept/:orderId', async (req, res) => {
  const order = await Order.findOne<OrderDocument>(
    { _id: new MongooseTypes.ObjectId(req.params.orderId) },
    { lean: true }
  ).exec();

  if (order?.status === OrderStatus.Submitted) {
    await Order.updateOne<OrderDocument>(
      { _id: new MongooseTypes.ObjectId(req.params.orderId) },
      { status: OrderStatus.Pending }
    ).exec();
  }

  return res.redirect('/payments?accept');
});

// GET: /api/v1/payment/cancel/:orderId
paymentRouter.get('/cancel/:orderId', async (req, res) => {
  const order = await Order.findOne<OrderDocument>(
    { _id: new MongooseTypes.ObjectId(req.params.orderId) },
    { lean: true }
  ).exec();

  if (order?.status === OrderStatus.Submitted) {
    await Order.updateOne<OrderDocument>(
      { _id: new MongooseTypes.ObjectId(req.params.orderId) },
      { status: OrderStatus.Cancelled }
    ).exec();
  }

  return res.redirect('/payments?cancel');
});

interface PayseraOrder {
  orderid: string;
  status: PayseraOrderStatus;
}

// GET: /api/v1/payment/callback?data=<...>&ss1=<...>&ss2=<...>
paymentRouter.get('/callback', async (req, res) => {
  const isValid = paysera.checkCallback(req.query);
  if (isValid) {
    res.status(200).send('OK');
    // Since callback seems valid decode callback data
    const payseraOrder: PayseraOrder = paysera.decode(req.query.data);

    const transaction = new Transaction(payseraOrder);
    transaction.save();

    if (payseraOrder.status === PayseraOrderStatus.PaymentSuccessful) {
      await Order.updateOne<OrderDocument>(
        { _id: new MongooseTypes.ObjectId(payseraOrder.orderid) },
        { status: OrderStatus.Success },
        { lean: true }
      ).exec();
    }

    return;
  }
  return res.status(500).send(null);
});

export default paymentRouter;
