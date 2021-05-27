const bodyParser = require("body-parser");
var express = require("express");
let router = express.Router();
const contactController = require("../controllers/contactcontroller");

router.post("/contact", contactController.contact);

module.exports = router;
