const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const usercontroller = require("../controllers/usercontroller");

router.post("/edituserprofile", usercontroller.edituserprofile);
// router.get("/getdata", usercontroller.getdata);
router.delete("/deleteuser", usercontroller.deleteuser);
router.post("/createuser", usercontroller.createuser);
router.post("/forgetpassword", usercontroller.forgetpassword);
router.put("/fav", usercontroller.fav);
router.put("/unfav", usercontroller.unfav);
router.post("/signup", usercontroller.signup);
router.post("/login", usercontroller.login);
router.post("/sendotp", usercontroller.sendotp);
router.post("/otpverification", usercontroller.otpverification);
router.post("/activate", usercontroller.activateAccount);

router.post("/decoded", usercontroller.decoded);

module.exports = router;
