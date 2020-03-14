/** @format */

const express = require("express");
const router = new express.Router();
const userModel = require("../model/userModel");

router.post("/", async (req, res) => {
  try {
    let userData = await userModel.saveData(req.body);
    if (Object.keys(userData).length === 0) {
      res.status(200).json({});
    } else {
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

/**
 * search or filter one at a time.
 */
router.post("/search", async (req, res) => {
  try {
    let userData = await userModel.getAll(req.body);
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json(error);
  }
});

/**
 * search and filter on same time
 */

router.post("/search1", async (req, res) => {
  try {
    let userData = await userModel.getAllWithSearchAndFilter(req.body);
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json(error);
  }
});


module.exports = router;
