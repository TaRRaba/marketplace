const express = require('express');
const { resolve } = require('path');
const env = require('dotenv').config({ path: '../../.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
});

const stripeApi = express.Router();
const { Entries, Goods } = require('../../db/models');

stripeApi.use(express.static(process.env.STATIC_DIR));

stripeApi.get('/', (req, res) => {
  const newPath = resolve('../client/index.html');
  res.sendFile(newPath);
  console.log('====================================');
  console.log('test');
  console.log('====================================');
});

stripeApi.get('/config', (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLUSHABLE_KEY,
  });
});

stripeApi.post('/create-payment-internet', async (req, res) => {
  try {
    const PermanentSession = 1;
    const userID = req.session;
    console.log('====================================');
    console.log(userID);
    console.log('====================================');
    const cart = await Entries.findAll({ include: Goods, where: { cart_id: PermanentSession } });
    const clearCart = cart.map((el) => el.get({ plain: true }));
    const uniqueArr = [...new Set(clearCart.map((el) => el.good_id))];
    const summerQuantityFunction = (reports, id) => reports.filter((el) => el.good_id === id).reduce((acc, cur) => acc + cur.quantity, 0);

    const profitFunction = (reports, id, quant) => reports
      .map((el) => {
        if (el.good_id === id) {
          return el.Good.price * quant;
        }
      })
      .filter((el) => el !== undefined);

    const resultArray = uniqueArr.map((el) => profitFunction(clearCart, el, summerQuantityFunction(clearCart, el)));

    const sumArrays = (arrays) => {
      let sum = 0;
      arrays.forEach((array) => {
        sum += parseInt(array[0]);
      });
      return sum;
    };

    const total = sumArrays(resultArray);

    // console.log('====================================');
    // console.log(clearCart);
    // console.log(uniqueArr);
    // console.log(summerQuantityFunction(clearCart, 1));
    // console.log(profitFunction(clearCart, 1, summerQuantityFunction(clearCart, 1)));
    // console.log(result);
    // console.log(total);
    // console.log('====================================');
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'eur',
      amount: total,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

module.exports = stripeApi;
