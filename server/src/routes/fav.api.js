const express = require('express');
// const bcrypt = require('bcrypt');

const favApi = express.Router();
const { Favourites, Entries, Goods } = require('../../db/models');
// const isAuth = require('../middleware/isAuth');

favApi.get('/', async (req, res) => {
//   const userID = req.session.user.id;
  try {
    const fav = (await Favourites.findOne({ where: { user_id: 1 } })).get({ plain: true });
    const data = (await Entries.findAll({ include: Goods, where: { favourite_id: fav.id }, order: [['id', 'ASC']] }))
      .map((el) => el.get({ plain: true }));
    res.json({ status: 200, data });
  } catch (error) {
    res.json(error);
  }
});

// Для отображения всех товаров
favApi.get('/goods', async (req, res) => {
  try {
    const data = (await Goods.findAll({ order: [['id', 'ASC']] })).map((el) => el.get({ plain: true }));
    res.json({ status: 200, data });
  } catch (error) {
    res.json(error);
  }
});

// favApi.post('/addAmountCart', async (req, res) => {
//   const { goodID, amount } = req.body;
//   try {
//     const cart = (await Carts.findOne({ where: { user_id: 1 } }))
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
//       const data = await Entries.create({ cart_id: cart.id, good_id: goodID, quantity: amount })
//         .get({ plain: true });
//       res.json({ status: 201, data });
//     }
//   } catch (error) {
//     res.json(error);
//   }
// });

favApi.post('/addToFav', async (req, res) => {
  const { goodID } = req.body;
  //   const userID = req.session.user.id;
  try {
    const fav = (await Favourites.findOne({ where: { user_id: 1 } })).get({ plain: true });
    const data = (await Entries.create({ favourite_id: fav.id, good_id: goodID }))
      .get({ plain: true });
    res.json({ status: 201, data });
  } catch (error) {
    res.json(error);
  }
});

favApi.delete('/removeFromFav', async (req, res) => {
  const { goodID } = req.body;
  //   const userID = req.session.user.id;
  try {
    const fav = (await Favourites.findOne({ where: { user_id: 1 } })).get({ plain: true });
    await Entries.destroy({ where: { favourite_id: fav.id, good_id: goodID } });
    res.json({ status: 200 });
  } catch (error) {
    res.json(error);
  }
});

module.exports = favApi;
