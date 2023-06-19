const express = require('express');
// const bcrypt = require('bcrypt');

const cartApi = express.Router();
const {
  Carts, Entries, Goods, Orders,
} = require('../../db/models');
// const isAuth = require('../middleware/isAuth');

cartApi.get('/', async (req, res) => {
  const userID = req.session.user.id;
  try {
    const cart = (await Carts.findOne({ where: { user_id: userID } })).get({ plain: true });
    const data = (await Entries.findAll({ include: Goods, where: { cart_id: cart.id }, order: [['id', 'ASC']] }))
      .map((el) => el.get({ plain: true }));
    res.json({ status: 200, data });
  } catch (error) {
    res.json(error);
  }
});

cartApi.post('/addAmountCart', async (req, res) => {
  const { goodID, amount } = req.body;
  const userID = req.session.user.id;
  try {
    const cart = (await Carts.findOne({ where: { user_id: userID } }))
      .get({ plain: true });
    const cartPos = (await Entries.findAll({ where: { cart_id: cart.id, good_id: goodID } }))
      .map((el) => el.get({ plain: true }));
    const goodAmount = (await Goods.findOne({ where: { id: goodID } })).amount;
    if (cartPos.length > 0) {
      let newAmount;
      if (cartPos[0].quantity + amount <= goodAmount) {
        newAmount = cartPos[0].quantity + amount;
      } else {
        newAmount = goodAmount;
      }
      await Entries.update(
        { quantity: newAmount },
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

cartApi.patch('/newAmount', async (req, res) => {
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

cartApi.delete('/', async (req, res) => {
  const { entryID } = req.body;
  try {
    await Entries.destroy({ where: { id: entryID } });
    res.json({ status: 200 });
  } catch (error) {
    res.json(error);
  }
});

cartApi.post('/payment', async (req, res) => {
  const { id } = req.session.user;
  const { deliveryState } = req.body;
  const { selectDeliveryAddress } = req.body;

  const promises = [];
  const promisesAmount = [];

  try {
    const userCart = (await Carts.findOne({ where: { user_id: id } })).get({ plain: true });
    const allOrder = (await Entries.findAll({
      include: Goods,
      where: { cart_id: userCart.id },
    }))
      .map((el) => el.get({ plain: true }));
    const newOrder = (await Orders.create({
      user_id: id, status: true, delivery: deliveryState, delivery_address: selectDeliveryAddress,
    })).get({ plain: true });

    for (let i = 0; i < allOrder.length; i += 1) {
      promises.push(Entries.create({
        order_id: newOrder.id,
        good_id: allOrder[i].good_id,
        quantity: allOrder[i].quantity,
        seller_id: allOrder[i].Good.seller_id,
      }));
      promisesAmount.push(Goods.update(
        {
          amount: allOrder[i].Good.amount - allOrder[i].quantity,
          rating: allOrder[i].Good.rating + allOrder[i].quantity,
        },
        { where: { id: allOrder[i].good_id } },
      ));
    }
    await Promise.all(promises);
    await Promise.all(promisesAmount);
    await Entries.destroy({ where: { cart_id: userCart.id } });

    res.json({ status: '200' });
  } catch (error) {
    console.log(error);
  }
});

cartApi.get('/numberoforder', async (req, res) => {
  const user_id = req.session.user.id;
  try {
    const allOrders = (await Orders.findAll({ where: { user_id }, order: [['id', 'DESC']] })).map((el) => el.get({ plain: true }));
    const lastOrder = allOrders[0];
    res.json(lastOrder);
  } catch (error) {
    console.log(error);
  }
});

module.exports = cartApi;
