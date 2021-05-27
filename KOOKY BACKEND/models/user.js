const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  username: { type: String },
  hotelname: { type: String },
  contactnumber: { type: Number },
  specialrequest: { type: String },
  ratings: { type: Number },
  role: {
    type: String,
    enum: ["user", "agency", "escort", "member"],
  },
  email: {
    type: String,
  },
  //escort
  gender: { type: String },
  Date: { type: Date },
  Duration: { type: Number },
  agency: { type: String },
  age: { type: Number },
  height: { type: Number },
  bodytype: { type: String },
  service: { type: String },
  image: { type: Array },
  proof: { type: String },
  escortname: { type: String },
  createdAt: { type: Date, default: Date.now },
  shot: { type: Number },
  price: { type: Number },
  //agency
  agencyname: { type: String },
  ownername: { type: String },
  countryname: { type: String },
  cityname: { type: String },
  place: { type: String },
  time: { type: Number },
  setpercentage: { type: Number },
  membername: { type: String },
  bodyshape: { type: String },
  bust: { type: Number },
  waist: { type: Number },
  hips: { type: Number },

  language: { type: String },
  service: { type: String },
  agentid: { type: String },

  password: { type: String },
  aboutme: { type: String },
  isActive: { type: Boolean, default: false },
  online: { type: Boolean, default: false },
  acceptingbooking: { type: Boolean, default: false },
  favid: { type: Array },
  id: { type: String },
  count: { type: Number },
  verify:{type:String,default:false },
   confirmpassword: { type: String },
  createdAt: { type: Date, default: Date.now },
  otp: { type: Number },
  // name: { type: String },
   contactnumber: { type: Number },
  role: { type: String, enum: ["User", "Agency", "Escort"] },
  token: { type: String },
});
module.exports = mongoose.model("User", UserSchema);
