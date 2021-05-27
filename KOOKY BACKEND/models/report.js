const mongoose = require("mongoose");
const ReportSchema = mongoose.Schema({
  
  sendid: { type: Number },
  escortid: { type: Number },
  report: [
    {
      subject: String,
      descriptionreport: String,
    },
  ],
});
module.exports = mongoose.model("Report", ReportSchema);

