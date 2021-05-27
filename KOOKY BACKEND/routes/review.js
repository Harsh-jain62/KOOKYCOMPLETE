const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const reviewcontroller = require("../controllers/reviewcontroller");

router.put("/reviewuser", reviewcontroller.reviewuser);
router.get("/fetchreview/:id", reviewcontroller.fetchreview);
router.put("/editreview/:id", reviewcontroller.editreview);
router.delete("/deletereview/:id", reviewcontroller.deletereview);

module.exports = router;