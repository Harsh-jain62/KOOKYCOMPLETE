const Contact = require("../models/contactModel.js");

exports.contact = async (req, res, next) => {
  const contact = await Contact.create(req.body);
  res.status(200).json({
    status: "success",
    data: contact,
  });
};
