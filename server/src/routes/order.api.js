const express = require('express');
// const bcrypt = require('bcrypt');

const orderApi = express.Router();
const {
  Carts, Entries, Goods, Orders,
} = require('../../db/models');
// const isAuth = require('../middleware/isAuth');

orderApi.get('/', async (req, res) => {
  const userID = req.session.user.id;
  try {
    const orders = (await Orders.findAll({ where: { user_id: userID } }))
      .map((el) => el.get({ plain: true })).map((el) => el.id);
    const result = (await Entries.findAll({
      include: Goods,
      where: { order_id: orders },
    })).map((el) => el.get({ plain: true }));
    const data = orders.map((e) => result.filter((el) => el.order_id === e));
    console.log(data);
    res.json({ status: 200, data });
  } catch (error) {
    res.json(error);
  }
});

orderApi.post('/addAmountCart', async (req, res) => {
  const { goodID, amount } = req.body;
  const userID = req.session.user.id;
  try {
    const cart = (await Carts.findOne({ where: { user_id: userID } }))
      .get({ plain: true });
    const cartPos = (await Entries.findAll({ where: { cart_id: cart.id, good_id: goodID } }))
      .map((el) => el.get({ plain: true }));
    if (cartPos.length > 0) {
      await Entries.update(
        { quantity: cartPos[0].quantity + amount },
        { where: { id: cartPos[0].id } },
      );
      res.json({ status: 200 });
    } else {
      const data = (await Entries.create({ cart_id: cart.id, good_id: goodID, quantity: amount }))
        .get({ plain: true });
      res.json({ status: 201, data });
    }
  } catch (error) {
    res.json(error);
  }
});

orderApi.patch('/newAmount', async (req, res) => {
  const { entryID, goodID, amount } = req.body;
  try {
    if (goodID) {
      const goodAmount = (await Goods.findOne({ where: { id: goodID } })).amount;
      if (amount <= goodAmount) {
        await Entries.update({ quantity: amount }, { where: { id: entryID } });
        res.json({ status: 200 });
      } else {
        res.json({ status: 403, goodAmount });
      }
    } else {
      await Entries.update({ quantity: amount }, { where: { id: entryID } });
      res.json({ status: 200 });
    }
  } catch (error) {
    res.json(error);
  }
});

orderApi.delete('/', async (req, res) => {
  const { entryID } = req.body;
  try {
    await Entries.destroy({ where: { id: entryID } });
    res.json({ status: 200 });
  } catch (error) {
    res.json(error);
  }
});

module.exports = orderApi;
