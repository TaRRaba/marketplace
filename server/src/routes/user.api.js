const express = require('express');
const bcrypt = require('bcrypt');

const userApi = express.Router();

const { Users } = require('../../db/models');

userApi.patch('/editData', async (req, res) => {
  const { name, email, id } = req.body;

  try {
    const updated = await Users.update({ name, email }, { where: { id }, returning: true });

    const data = updated[1][0].get({ plain: true });

    res.json({ status: 200, data });
  } catch (error) {
    res.json(error);
  }
});

userApi.put('/password', async (req, res) => {
  const { id, password } = req.body;
  try {
    const hashPass = await bcrypt.hash(password, 10);

    const updated = await Users.update({ password: hashPass }, { where: { id }, returning: true });

    const data = updated[1][0].get({ plain: true });
    res.json({ status: 200, data });
  } catch (error) {
    res.json(error);
  }
});

module.exports = userApi;
