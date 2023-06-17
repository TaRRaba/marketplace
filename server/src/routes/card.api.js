const express = require('express');

const cardApi = express.Router();
const {
  Carts, Entries, Goods, SubCategories, Categories,
} = require('../../db/models');

cardApi.get('/category/:id', async (req, res) => {
//   const userID = req.session.user.id;
  const { id } = req.params;
  try {
    const cardsCategory = (await SubCategories.findAll({
      include: Goods,
      where: { category_id: id },
    })).map((el) => el.get({ plain: true }));

    // console.log(cardsCategory);
    res.json(cardsCategory);
  } catch (error) {
    res.json(error);
  }
});

cardApi.get('/subcategory/:id', async (req, res) => {
  //   const userID = req.session.user.id;
  const { id } = req.params;
  try {
    const cardSubcategory = (await Goods.findAll({ where: { subcategory_id: id } }))
      .map((el) => el.get({ plain: true }));

    // console.log(cardSubcategory);
    res.json(cardSubcategory);
  } catch (error) {
    res.json(error);
  }
});

cardApi.get('/subcategory/goods/:id', async (req, res) => {
  //   const userID = req.session.user.id;
  const { id } = req.params;
  try {
    const cardGood = (await Goods.findOne({ where: { id } })).get({ plain: true });
    // console.log(cardGood);
    res.json(cardGood);
  } catch (error) {
    res.json(error);
  }
});

module.exports = cardApi;
