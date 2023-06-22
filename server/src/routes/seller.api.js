const express = require("express");
const bcrypt = require("bcrypt");
const fileMiddleware = require("../middlewares/file");

const sellerApi = express.Router();
const {
  Goods,
  Categories,
  SubCategories,
  Entries,
  Sellers,
} = require("../../db/models");

sellerApi.get("/goods", async (req, res) => {
  const { id } = req.session.seller;

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
  const { id } = req.session.seller;

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
      await Goods.update(
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
  const { id } = req.session.seller;

  try {
    await Goods.update(
      { archive: true },
      { where: { seller_id: id, id: goodsId } }
    );
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
  const { id } = req.session.seller;

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
        archive: false,
      })
    ).get({ plain: true });
    res.json(newGoods);
  } catch (error) {
    console.log(error);
  }
});

sellerApi.get("/reports", async (req, res) => {
  const { id } = req.session.seller;

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

//! start

sellerApi.patch("/editData", async (req, res) => {
  console.log(req.body);
  const { name, email, id, INN } = req.body;

  try {
    const updated = await Sellers.update(
      { name, email, INN },
      { where: { id }, returning: true }
    );

    const data = updated[1][0].get({ plain: true });
    req.session.seller = data;
    console.log(data);
    res.json({ status: 200, data });
  } catch (error) {
    res.json(error);
  }
});

sellerApi.put("/password", async (req, res) => {
  const { id, password } = req.body;
  console.log(req.body);
  try {
    const hashPass = await bcrypt.hash(password, 10);

    const updated = await Sellers.update(
      { password: hashPass },
      { where: { id }, returning: true }
    );

    const data = updated[1][0].get({ plain: true });
    req.session.seller = data;
    console.log(data);
    res.json({ status: 200, data });
  } catch (error) {
    res.json(error);
  }
});

sellerApi.delete("/del", async (req, res) => {
  const { id } = req.body;
  try {
    await Goods.update({ amount: 0 }, { where: { seller_id: id } });
    console.log("start");
    await Sellers.destroy({ where: { id } });
    console.log("finish");
    req.session.destroy((error) => {
      if (error) console.log(error);
      else {
        res.clearCookie("MarketPlace");
        res.json({ status: 200 });
      }
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = sellerApi;
