var createError = require("http-errors");
var express = require("express");
var path = require("path");
// var cookieParser = require("cookie-parser");
var logger = require("morgan");
var EscortRouter = require("./routes/escort");
var UserRouter = require("./routes/user");
var AgentRouter = require("./routes/agent");
var ReviewRouter = require("./routes/review");
var BookingRouter = require("./routes/booking");
var ReportRouter = require("./routes/report");
var ContactRouter = require("./routes/contactus");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const AppError = require("./utils/appError");
var app = express();

////cors connection//
//app.use(cors)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  next();
});
////connection database///
mongoose
  .connect("mongodb://localhost:27017/kooky", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch(() => {
    console.log("something went wrong with DB connection");
  });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// view engine setup

app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/escort", EscortRouter);
app.use("/user", UserRouter);
app.use("/user", UserRouter);
app.use("/agent", AgentRouter);
app.use("/review", ReviewRouter);
app.use("/booking", BookingRouter);
app.use("/report", ReportRouter);
app.use("/contact", ContactRouter);

// app.use("/uploads", express.static("uploads"));

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
module.exports = app;
