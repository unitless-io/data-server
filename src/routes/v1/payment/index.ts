import express from 'express';
// @ts-ignore
import Paysera from 'paysera-nodejs';

import { APP_URL, PAYSERA_PROJECT_ID, PAYSERA_SIGN_PASSWORD } from '@app/config';

const options = {
  projectid: PAYSERA_PROJECT_ID,
  sign_password: PAYSERA_SIGN_PASSWORD,
  callbackurl: `${APP_URL}/api/v1/payment/callback`,
  test: 1, // TODO
};

const paysera = new Paysera(options);

const paymentRouter = express.Router();

// POST: /api/v1/payment/new
paymentRouter.post('/new', async (req, res) => {
  if (req.isAuthenticated()) {
    const orderId = 123; // TODO

    const params = {
      orderid: orderId,
      p_email: req.user.google?.email,
      amount: 100, // TODO
      currency: 'EUR',
      accepturl: `${APP_URL}/api/v1/payment/accept/${orderId}`,
      cancelurl: `${APP_URL}/api/v1/payment/cancel/${orderId}`,
    };

    const urlToGo = paysera.buildRequestUrl(params);

    return res.redirect(302, urlToGo);
  }
  return res.status(401).send(null);
});

// GET: /api/v1/payment/accept/:orderId
paymentRouter.get('/accept/:orderId', async (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).send(null);
  }
  return res.status(401).send(null);
});

// GET: /api/v1/payment/cancel/:orderId
paymentRouter.get('/cancel/:orderId', async (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).send(null);
  }
  return res.status(401).send(null);
});

// GET: /api/v1/payment/callback
paymentRouter.get('/callback', async (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).send('OK');
  }
  return res.status(401).send(null);
});

export default paymentRouter;
