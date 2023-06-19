require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);
// =======================

const { resolve } = require('path');
const env = require('dotenv').config({ path: './.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
});
// const session = require('express-session');
const { Entries, Goods } = require('./db/models');

// =======================
const cartApi = require('./src/routes/cart.api');
const cardApi = require('./src/routes/card.api');
const favApi = require('./src/routes/fav.api');
const authApi = require('./src/routes/auth.api');
const sellerApi = require('./src/routes/seller.api');
const goodApi = require('./src/routes/good.main');
const catalogApi = require('./src/routes/catalog.api');
// const stripeApi = require('./src/routes/stripe.api');
const userApi = require('./src/routes/user.api');
const orderApi = require('./src/routes/order.api');
const mapsApi = require('./src/routes/maps.api');

// const isAuth = require('./src/middlewares/isAuth');

const sessionConfig = {
  name: 'MarketPlace',
  store: new FileStore(),
  secret: process.env.COOKIE_SECRET || 'sometext321',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: false,
  },
};

const PORT = process.env.PORT || 3001;
const app = express();
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);

app.use(expressSession(sessionConfig));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public/')));

app.use(express.static(path.join(__dirname, 'pics')));
app.use('/pics', express.static('pics'));

app.use('/api/cart', cartApi);
// app.use('/api/stripe', stripeApi);
app.use('/api/order', orderApi);
app.use('/api/card', cardApi);
app.use('/api/fav', favApi);
app.use('/api/auth', authApi);
app.use('/api/seller', sellerApi);
app.use('/good', goodApi);
app.use('/catalog', catalogApi);
app.use('/api/user', userApi);
app.use('/api/maps', mapsApi);

//= ===========================

app.use(express.static(process.env.STATIC_DIR));

app.get('/', (req, res) => {
  const newPath = resolve(`${process.env.STATIC_DIR}/index.html`);
  res.sendFile(newPath);
});

app.get('/config', (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLUSHABLE_KEY,
  });
});

app.post('/create-payment-internet', async (req, res) => {
  const { id } = req.body;
  try {
    const cart = await Entries.findAll({ include: Goods, where: { cart_id: id } });
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
    const totalInEuro = total / 91.63;
    const roundedTotalInEuro = Number(totalInEuro.toFixed(2));
    const totalForStripe = roundedTotalInEuro * 100;
    const roundeTotalForStripe = Number(totalForStripe.toFixed(2));
    // console.log('====================================');
    // console.log('roundedTotalInEuro========>', totalInEuro, roundedTotalInEuro, typeof roundedTotalInEuro, totalForStripe, roundeTotalForStripe);
    // console.log('clearCart=======>', clearCart);
    // console.log('uniqueArr=======>', uniqueArr);
    // console.log(summerQuantityFunction(clearCart, 1));
    // console.log(profitFunction(clearCart, 1, summerQuantityFunction(clearCart, 1)));
    // console.log('total=======>', total);
    // console.log('====================================');

    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'eur',
      amount: roundeTotalForStripe,
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

//= ===========================

app.listen(PORT, () => console.log(`Сервер крутится на ${PORT} порту!`));
