const express = require('express');

const authApi = express.Router();
const bcrypt = require('bcrypt');
const { Users, Carts, Sellers } = require('../../db/models');

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

module.exports = authApi;
