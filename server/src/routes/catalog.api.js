const express = require('express');
const { Categories, SubCategories } = require('../../db/models');

const catalogApi = express.Router();

catalogApi.get('/category', async (req, res) => {
  try {
    // const category = await Categories.findAll();
    // const subCategory = await SubCategories.findAll();
    const data = await Categories.findAll({
      include: SubCategories,

    });
    // const data = { category, subCategory };
    res.json({ status: 200, data });
  } catch (error) {
    console.log(error);
  }
});

module.exports = catalogApi;
