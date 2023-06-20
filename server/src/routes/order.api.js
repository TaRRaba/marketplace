const express = require('express');

const orderApi = express.Router();
const {
  Sellers, Goods, Entries, Orders, PickPoints,
} = require('../../db/models');

// const bcrypt = require('bcrypt');
// const isAuth = require('../middleware/isAuth');

orderApi.get('/', async (req, res) => {
  const userID = req.session.user.id;
  try {
    const orders = (await Orders.findAll({ where: { user_id: userID }, order: [['id', 'DESC']] }))
      .map((el) => el.get({ plain: true })).map((el) => el.id);
    const result = (await Entries.findAll({
      include: Goods,
      where: { order_id: orders },
    })).map((el) => el.get({ plain: true }));
    const data = orders.map((e) => result.filter((el) => el.order_id === e));
    res.json({ status: 200, data });
  } catch (error) {
    res.json(error);
  }
});

orderApi.get('/seller', async (req, res) => {
  const sellerID = req.session.seller.id;
  try {
    const allEntries = (await Entries.findAll({ where: { seller_id: sellerID }, order: [['order_id', 'DESC']] }))
      .map((el) => el.get({ plain: true }));
    const orders = [...new Set(allEntries.map((entry) => entry.order_id))];
    const result = (await Entries.findAll({
      include: [Goods, Orders],
      where: { order_id: orders, seller_id: sellerID },
      order: [['order_id', 'DESC']],
    })).map((el) => el.get({ plain: true }));
    const data = orders.map((e) => result.filter((el) => el.order_id === e));
    res.json({ status: 200, data });
  } catch (error) {
    res.json(error);
  }
});

// orderApi.post('/addAmountCart', async (req, res) => {
//   const { goodID, amount } = req.body;
//   const userID = req.session.user.id;
//   try {
//     const cart = (await Carts.findOne({ where: { user_id: userID } }))
//       .get({ plain: true });
//     const cartPos = (await Entries.findAll({ where: { cart_id: cart.id, good_id: goodID } }))
//       .map((el) => el.get({ plain: true }));
//     if (cartPos.length > 0) {
//       await Entries.update(
//         { quantity: cartPos[0].quantity + amount },
//         { where: { id: cartPos[0].id } },
//       );
//       res.json({ status: 200 });
//     } else {
//       const data = (await Entries.create({ cart_id: cart.id, good_id: goodID, quantity: amount }))
//         .get({ plain: true });
//       res.json({ status: 201, data });
//     }
//   } catch (error) {
//     res.json(error);
//   }
// });

orderApi.patch('/', async (req, res) => {
  const { orderID } = req.body;
  try {
    await Orders.update({ status: false }, { where: { id: orderID } });
    const OrderEntries = (await Entries.findAll({ where: { order_id: orderID } }))
      .map((el) => el.get({ plain: true }));
    const sellers = [...new Set(OrderEntries.map((entry) => entry.seller_id))];
    const sellersData = (await Sellers.findAll({ where: { id: sellers } }))
      .map((el) => el.get({ plain: true }));
    res.json({ status: 200, sellers: sellersData });
  } catch (error) {
    console.log(error);
  }
});

// orderApi.delete('/', async (req, res) => {
//   const { entryID } = req.body;
//   try {
//     await Entries.destroy({ where: { id: entryID } });
//     res.json({ status: 200 });
//   } catch (error) {
//     res.json(error);
//   }
// });

orderApi.get('/:id', async (req, res) => {
  const { id } = req.session.user;
  // const id = 1;

  try {
    const orderOne = (
      await Orders.findOne({
        where: { id: req.params.id, user_id: id },
        include: PickPoints,
      })
    ).get({ plain: true });
    const orderEntriesAll = (
      await Entries.findAll({
        include: Goods,
        where: { order_id: req.params.id },
      })
    ).map((el) => el.get({ plain: true }));

    res.json({ detailOrder: orderEntriesAll, order: orderOne });
  } catch (error) {
    console.log(error);
  }
});

module.exports = orderApi;
