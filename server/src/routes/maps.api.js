const express = require("express");

const mapsApi = express.Router();
const { PickPoints } = require("../../db/models");

mapsApi.get("/", async (req, res) => {
  try {
    const pickPointAddress = (await PickPoints.findAll({})).map((el) =>
      el.get({ plain: true })
    );
    res.json(pickPointAddress);
  } catch (error) {
    console.log(error);
  }
});

module.exports = mapsApi;
