const bodyParser = require("body-parser");
var express = require("express");
let router = express.Router();
const reportController = require("../controllers/reportcontroller");

router.post("/report", reportController.report);

module.exports = router;
