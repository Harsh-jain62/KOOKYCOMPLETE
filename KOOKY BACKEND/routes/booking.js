const bodyParser = require("body-parser");
var express = require("express");
let router = express.Router();
const bookingController = require("../controllers/bookingcontroller");
router.post("/bookescort", bookingController.bookescort);
router.post("/bookescortthroughagency", bookingController.bookescortthroughagency);
router.post("/report", bookingController.report);
router.get("/mybooking", bookingController.mybooking);






module.exports = router;
