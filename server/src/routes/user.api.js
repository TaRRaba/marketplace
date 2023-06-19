const express = require('express');
const bcrypt = require('bcrypt');

const userApi = express.Router();

const { Users, Carts, Orders, Entries, Favourites } = require('../../db/models');

userApi.patch('/editData', async (req, res) => {
  const { name, email, id } = req.body;

  try {
    const updated = await Users.update({ name, email }, { where: { id }, returning: true });

    const data = updated[1][0].get({ plain: true });
    req.session.user = data;
    res.json({ status: 200, data });
  } catch (error) {
    res.json(error);
  }
});

userApi.put('/password', async (req, res) => {
  const { id, password } = req.body;
  try {
    const hashPass = await bcrypt.hash(password, 10);

    const updated = await Users.update({ password: hashPass }, { where: { id }, returning: true });

    const data = updated[1][0].get({ plain: true });
    req.session.user = data;
    res.json({ status: 200, data });
  } catch (error) {
    res.json(error);
  }
});

userApi.delete('/del', async (req, res) => {
  const { id } = req.body;
  try {
    const userCart = (await Carts.findOne({ where: { user_id: id } })).get({ plain: true });
    const userFav = (await Favourites.findOne({ where: { user_id: id } })).get({ plain: true });
    // const userOrders = (await Orders.findAll({ where: { user_id: id } }))
    //   .map((el) => el.get({ plain: true })).map((el) => el.id);
    await Entries.destroy({ where: { cart_id: userCart.id } });
    await Entries.destroy({ where: { favourite_id: userFav.id } });
    // await Entries.destroy({ where: { order_id: userOrders } });
    await Carts.destroy({ where: { user_id: id } });
    await Favourites.destroy({ where: { user_id: id } });
    // await Orders.destroy({ where: { user_id: id } });
    await Users.destroy({ where: { id } });
    req.session.destroy((error) => {
      if (error) console.log(error);
      else {
        res.clearCookie('MarketPlace');
        res.json({ status: 200 });
      }
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = userApi;
