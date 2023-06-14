const express = require("express");

const sellerApi = express.Router();
const { Goods } = require("../../db/models");

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
    res.json(error);
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
    res.json(error);
  }
});

module.exports = sellerApi;
