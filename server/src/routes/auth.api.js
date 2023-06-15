const express = require('express');

const authApi = express.Router();
const bcrypt = require('bcrypt');
const {
  Users, Carts, Sellers, Favourites,
} = require('../../db/models');

authApi.get('/checkSeller', async (req, res) => {
  if (req.session.seller) {
    const sellerCheck = true;
    res.json(sellerCheck);
  } else {
    const noSeller = false;
    res.json(noSeller);
  }
});

authApi.get('/checkUser', async (req, res) => {
  if (req.session.user) {
    const userCheck = true;
    res.json(userCheck);
  } else {
    const noUser = false;
    res.json(noUser);
  }
});

authApi.post('/registration', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashPass = await bcrypt.hash(password, 10);

    const [newUser, created] = await Users.findOrCreate({
      where: { email },
      defaults: {
        name,
        password: hashPass,
      },
    });
    if (created) {
      await Carts.create({ user_id: newUser.id });
      await Favourites.create({ user_id: newUser.id });
      req.session.user = newUser.get({ plain: true });
      res.json({
        status: 201, name: newUser.name, id: newUser.id, email: newUser.email,
      });
    } else {
      res.json({ status: 405 });
    }
  } catch (error) {
    res.json(error);
  }
});

authApi.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const cheack = await Users.findOne({ where: { email } });
    if (cheack) {
      const hashPass = await bcrypt.compare(password, cheack.password);
      if (hashPass) {
        req.session.user = cheack.get({ plain: true });
        res.json({
          status: 200, name: cheack.name, id: cheack.id, email: cheack.email,
        });
      } else {
        res.json({ status: 403 });
      }
    } else {
      res.json({ status: 404 });
    }
  } catch (error) {
    res.json(error);
  }
});

authApi.post('/registration/seller', async (req, res) => {
  const {
    name, email, INN, password,
  } = req.body;
  try {
    const hashPass = await bcrypt.hash(password, 10);

    const [newSeller, created] = await Sellers.findOrCreate({
      where: { email },
      defaults: {
        name,
        INN,
        password: hashPass,
      },
    });
    if (created) {
      req.session.seller = newSeller.get({ plain: true });
      res.json({
        status: 201,
        name: newSeller.name,
        id: newSeller.id,
        email: newSeller.email,
        INN: newSeller.INN,
      });
    } else {
      res.json({ status: 405 });
    }
  } catch (error) {
    res.json(error);
  }
});

authApi.post('/login/seller', async (req, res) => {
  const { email, password } = req.body;
  try {
    const cheack = await Sellers.findOne({ where: { email } });
    if (cheack) {
      const hashPass = await bcrypt.compare(password, cheack.password);
      if (hashPass) {
        req.session.seller = cheack.get({ plain: true });
        res.json({
          status: 200, name: cheack.name, id: cheack.id, email: cheack.email, INN: cheack.INN,
        });
      } else {
        res.json({ status: 403 });
      }
    } else {
      res.json({ status: 404 });
    }
  } catch (error) {
    res.json(error);
  }
});

module.exports = authApi;
