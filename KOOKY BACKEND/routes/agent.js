const bodyParser = require("body-parser");
var express = require("express");
let router = express.Router();
var jsonParser = bodyParser.json();
const agentController = require("../controllers/agentcontroller");

router.delete("/deleteagent/:id", agentController.deleteagent);
router.delete("/deletemember/:id", agentController.deletemember);
router.post("/createagent", agentController.createagent);
router.post("/createmember", agentController.createmember);
router.put("/editagentprofile/:id", agentController.editagentprofile);
router.put("/editmember/:id", agentController.editmember);
router.put("/forgetpassword/:id", agentController.forgetpassword);
router.get("/getmember", agentController.getmember);
router.get("/getnewmember", agentController.newmember);
router.put("/updateagencyprice/:id",jsonParser, agentController.updateagencyprice);
module.exports = router;
