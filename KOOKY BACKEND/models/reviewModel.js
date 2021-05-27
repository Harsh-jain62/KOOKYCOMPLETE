const mongoose = require("mongoose");
const ReviewSchema = mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  description: { type: String },
  name: { type: String },
  ratings: { type: String },
  userid: { type: String },
  escortid: { type: String },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Review", ReviewSchema);
