
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);

const cartApi = require('./src/routes/cart.api');
const cardApi = require('./src/routes/card.api');
const favApi = require('./src/routes/fav.api');
const authApi = require('./src/routes/auth.api');
const sellerApi = require('./src/routes/seller.api');
const goodApi = require('./src/routes/good.main');
const catalogApi = require('./src/routes/catalog.api');
const userApi = require('./src/routes/user.api');
const orderApi = require('./src/routes/order.api');
const mapsApi = require('./src/routes/maps.api');

// const isAuth = require('./src/middlewares/isAuth');

const sessionConfig = {
  name: "MarketPlace",
  store: new FileStore(),
  secret: process.env.COOKIE_SECRET || "sometext321",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 200 * 60 * 1000,
    httpOnly: false,
  },
};

const PORT = process.env.PORT || 3001;
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(expressSession(sessionConfig));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public/')));

app.use(express.static(path.join(__dirname, 'pics')));
app.use('/pics', express.static('pics'));

app.use('/api/cart', cartApi);
app.use('/api/order', orderApi);
app.use('/api/card', cardApi);
app.use('/api/fav', favApi);
app.use('/api/auth', authApi);
app.use('/api/seller', sellerApi);
app.use('/good', goodApi);
app.use('/catalog', catalogApi);
app.use('/api/user', userApi);
app.use('/api/maps', mapsApi);

app.listen(PORT, () => console.log(`Сервер крутится на ${PORT} порту!`));
