const mongoose = require("mongoose");
const ContactSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  message: { type: String },
  sendid: { type: Number },
});
module.exports = mongoose.model("Contact", ContactSchema);
