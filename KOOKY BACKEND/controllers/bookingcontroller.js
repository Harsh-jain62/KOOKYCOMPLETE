const Booking= require("../models/bookingModel.js");
exports.bookescort = async (req, res, next) => {
  const book = await Booking.create(req.body);
  res.status(200).json({
    status: "success",
    data: book,
  });
};
exports.bookescortthroughagency = async (req, res, next) => {
  const book = await Booking.create(req.body);
  res.status(200).json({
    status: "success",
    data: book,
  });
};
exports.report = async (req, res, next) => {
  const report = await Booking.create(req.body);
  res.status(200).json({
    status: "success",
    data: report,
  });
};

exports.mybooking = async (req, res, next) => {
  const booking = await Booking.find({sendid:req.body.myid });
    res.status(200).json({
    status: "success",
    results: booking.length,
    data: booking,
  });
};
