const bodyParser = require("body-parser");
var express = require("express");
let router = express.Router();
var jsonParser = bodyParser.json();
const escortController = require("../controllers/escortcontroller");

 router.delete("/deleteescortprofile/:id", escortController.deleteescortprofile);
 router.post("/insertescortpicture/:id", escortController.insertescortpicture);
 router.post("/verified/:id", escortController.verified);
 router.put("/forgetpassword/:id", escortController.forgetpassword);
 router.put("/updateescortprofile/:id",jsonParser, escortController.updateescortprofile);
  router.put("/updateescortprice/:id",jsonParser, escortController.updateescortprice);
  router.post("/createescort", escortController.createescort);
  router.get("/getnewbooking", escortController.getnewbooking);
  router.get("/getallbooking", escortController.getallbooking);
  router.put("/bookingstatus/:id", escortController.bookingstatus);
  router.put("/onlinestatus/:id", escortController.onlinestatus);
  router.put("/acceptingbookingstatus/:id", escortController.acceptingbookingstatus);
   router.get("/escortsearching", escortController.searchescort);

module.exports = router;
