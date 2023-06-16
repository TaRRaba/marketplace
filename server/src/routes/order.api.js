const express = require("express");

const orderApi = express.Router();
const { Goods, Entries, Orders, PickPoints } = require("../../db/models");

orderApi.get("/:id", async (req, res) => {
  //   const { id } = req.session.user;
  const id = 1;
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
