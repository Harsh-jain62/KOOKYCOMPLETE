const mongoose = require("mongoose");
const BookingSchema = mongoose.Schema({
  city: { type: String },
  country: { type: String },
  gender: { type: String },
  place: { type: String },
  Date: { type: Date },
  time: { type: Number },
  Duration: { type: Number },
  escortname: { type: String },
  ratings: { type: String },
  price: { type: String },
  bodyshape: { type: String },
  description: { type: String },
  agencyname: { type: String },
  age: { type: Number },
  height: { type: Number },
  bodytype: { type: String },
  service: { type: String },
  clientname: { type: String },
  clientemail: { type: String },
  hotelname: { type: String },
  roomname: { type: String },
  specialrequest: { type: String },
  createdAt: { type: Date, default: Date.now },
  sendid:{type:Number},
  escortid:{type:Number},


  
  
});
module.exports = mongoose.model("Booking", BookingSchema);
