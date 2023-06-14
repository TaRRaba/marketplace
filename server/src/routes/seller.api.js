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

    // console.log(allGoods);
    res.json(allGoods);
  } catch (error) {
    res.json(error);
  }
});

module.exports = sellerApi;
