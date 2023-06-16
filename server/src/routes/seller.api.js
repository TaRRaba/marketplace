
const express = require("express");
const fileMiddleware = require("../middlewares/file");

const sellerApi = express.Router();
const { Goods, Categories, SubCategories, Entries } = require("../../db/models");


sellerApi.get('/goods', async (req, res) => {
  //   const { id } = req.session.seller;
  const id = 1;
  try {
    const allGoods = (
      await Goods.findAll({
        where: { seller_id: id },
        order: [["id", "DESC"]],
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

sellerApi.post("/newgoods", fileMiddleware.single("img"), async (req, res) => {
  //   const { id } = req.session.seller;
  const id = 1;
  const {
    subcategories,
    name,
    country,
    brand,
    code,
    size,
    weight,
    type,
    amount,
    price,
  } = req.body;
  // console.log("img======", req.body.img_url);
  try {
    // console.log("req.body", req.body);
    // if (req.file) {
    //   console.log("req.file", req.file);
    // }
    const newGoods = (
      await Goods.create({
        name,
        country,
        specs: {
          brand,
          code,
          size,
          weight,
          type,
        },
        price: Number(price),
        rating: 0,
        amount: Number(amount),
        seller_id: id,
        subcategory_id: Number(subcategories),
        img_url: `/${req.file.path}`,
      })
    ).get({ plain: true });
    // console.log("newGoods ============>", newGoods);
    res.json(newGoods);
  } catch (error) {
    console.log(error);
  }
});

sellerApi.get('/reports', async (req, res) => {
  // const { id } = req.session.seller;
  const id = 1;
  try {
    const allReports = (await Entries.findAll({
      include: Goods,
      where: { seller_id: id },
    })).map((el) => el.get({ plain: true }));
    console.log(allReports);
    res.json(allReports);
  } catch (error) {
    console.log(error);
  }
});

module.exports = sellerApi;
