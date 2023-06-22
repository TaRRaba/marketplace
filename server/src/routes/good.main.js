const express = require('express');
// const bcrypt = require('bcrypt');

const goodApi = express.Router();
const { Goods } = require('../../db/models');

goodApi.get('/', async (req, res) => {
  //   const userID = req.session.user.id;
  try {
    const data = await Goods.findAll({
      limit: 12,
      order: [['rating', 'DESC']],
    });
    res.json({ status: 200, data });
  } catch (error) {
    res.json(error);
  }
});

goodApi.get('/all', async (req, res) => {
  //   const userID = req.session.user.id;
  try {
    const data = await Goods.findAll();
    res.json({ status: 200, data });
  } catch (error) {
    res.json(error);
  }
});

module.exports = goodApi;
