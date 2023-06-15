const express = require("express");

const sellerApi = express.Router();
const { Goods, Categories, SubCategories } = require("../../db/models");

sellerApi.get("/goods", async (req, res) => {
  //   const { id } = req.session.seller;
  const id = 1;
  try {
    const allGoods = (
      await Goods.findAll({
        where: { seller_id: id },
      })
    ).map((el) => el.get({ plain: true }));
    res.json(allGoods);
  } catch (error) {
    console.log(error);
  }
});

sellerApi.delete("/goods", async (req, res) => {
  const { goodsId } = req.body;
  //   const { id } = req.session.seller;
  const id = 1;
  try {
    await Goods.destroy({
      where: { seller_id: id, id: goodsId },
    });
    res.json({ status: 200 });
  } catch (error) {
    console.log(error);
  }
});

sellerApi.get("/categories", async (req, res) => {
  try {
    const allCategories = (
      await Categories.findAll({ include: SubCategories })
    ).map((el) => el.get({ plain: true }));
    res.json(allCategories);
  } catch (error) {
    console.log(error);
  }
});

module.exports = sellerApi;
