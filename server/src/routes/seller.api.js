const express = require("express");
const fileMiddleware = require("../middlewares/file");

const sellerApi = express.Router();
const {
  Goods,
  Categories,
  SubCategories,
  Entries,
} = require("../../db/models");

sellerApi.get("/goods", async (req, res) => {
  //   const { id } = req.session.seller;
  const id = 1;
  try {
    const allGoods = (
      await Goods.findAll({
        where: { seller_id: id },
        order: [["updatedAt", "DESC"]],
      })
    ).map((el) => el.get({ plain: true }));
    res.json(allGoods);
  } catch (error) {
    console.log(error);
  }
});

sellerApi.patch("/goods", fileMiddleware.single("img"), async (req, res) => {
  //   const { id } = req.session.seller;
  const id = 1;
  const {
    name,
    country,
    brand,
    code,
    size,
    weight,
    type,
    amount,
    price,
    idProduct,
    subcategories,
  } = req.body;

  try {
    const editGoods = await Goods.update(
      {
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
        amount: Number(amount),
        subcategory_id: Number(subcategories),
      },
      { where: { id: Number(idProduct), seller_id: id } }
    );
    if (req.file !== undefined) {
      const editImageGoods = await Goods.update(
        { img_url: `/${req.file.path}` },
        { where: { id: Number(idProduct), seller_id: id } }
      );
    }
    res.json({ status: 200 });
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

  try {
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
    res.json(newGoods);
  } catch (error) {
    console.log(error);
  }
});

sellerApi.get("/reports", async (req, res) => {
  // const { id } = req.session.seller;
  const id = 1;
  try {
    const allReports = (
      await Entries.findAll({
        include: Goods,
        where: { seller_id: id },
      })
    ).map((el) => el.get({ plain: true }));
    console.log(allReports);
    res.json(allReports);
  } catch (error) {
    console.log(error);
  }
});

module.exports = sellerApi;
