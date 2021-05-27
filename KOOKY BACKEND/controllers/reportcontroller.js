const Report= require("../models/report.js");

exports.report = async (req, res, next) => {
  const report = await Report.create(req.body);
  res.status(200).json({
    status: "success",
    data: report,
  });
};
