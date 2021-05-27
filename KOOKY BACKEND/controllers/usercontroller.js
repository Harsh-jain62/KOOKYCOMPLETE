const User = require("../models/user.js");
const Booking = require("../models/bookingModel.js");
const bcrypt = require("bcrypt");

const AppError = require("../utils/appError");
const ObjectID = require("bson");
const jwt = require("jsonwebtoken");
const config = require("../nodemon.json");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/email");
const nodemailer = require("nodemailer");
const { promisify } = require("util");
const { token } = require("morgan");
const { parse } = require("path");
//////CREATE USER/////
exports.createuser = async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({
    status: "success",
    data: user,
  });
};
/////EDIT USER PROFILE////
exports.edituserprofile = async function (req, res) {
  console.log(req.body);
  await User.findByIdAndUpdate(
    { _id: req.body._id },

    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        contactnumber: req.body.contactnumber,
        hotelname: req.body.hotelname,
        specialrequest: req.body.specialrequest,
      },
    }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.warn(err);
    });
};
//////getdata///
//  exports.getdata= async (req, res, next) =>{
//   //  console.log(id)
//         const getData = await User.find({_id:req.body.id})
//          res.status(200).json({
//              status:"success",
//              results:getData.length,
//              data:getData,
//          })
//         },

//////DELETE USER////
exports.deleteuser = async function (req, res) {
  console.log(req.params);
  await User.deleteOne({ _id: req.body.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.warn(err);
    });
};
/////FORGETPASSWORD BY USER/////
exports.forgetpassword = async function (req, res) {
  console.log(req.body);
  let newPassword = req.body.password.toString();
  bcryptpassword = await bcrypt.hash(newPassword, 12);
  console.log(bcryptpassword);
  const password = await User.findByIdAndUpdate(
    { _id: req.body.userId },

    { $set: { password: bcryptpassword } }
  );
  res.status(200).json(password);
};

/////////fetch my booking/////
//  exports.mybook= async (req, res, next) =>{
//           const mybook = await Booking.find({_id:req.params.id})
//            res.status(200).json({
//                status:"success",
//                results:mybook.length,
//                data:mybook,
//            })
//           }
// exports.fav = async (req, res, next) => {
//   const fav = await User.findOne({ _id: req.params.id });
//   if (fav) {
//     await User.updateOne({
//       $push: { fav: req.body.fav }
//       .save(),
//     });
//   } else {
//     console.log("id no found");
//   }
// };
exports.fav = async function (req, res) {
  console.log(req.params);
  await User.findByIdAndUpdate(
    req.body.id,
    {
      $push: { favid: req.body.favid },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
};
exports.unfav = async function (req, res) {
  console.log(req.params);
  await User.findByIdAndUpdate(
    req.body.id,
    {
      $pull: { favid: req.body.favid },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
};
/////
const createSendToken = (user, statusCode, req, res) => {
  const _id = user._id;
  const token = jwt.sign(
    {
      _id,
    },
    config.env.JWT_KEY,
    {
      expiresIn: "8h",
    }
  );

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;
  //  user.imagepath = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
//////signup///////
exports.signup = catchAsync(async (req, res, next) => {
  const getuser = await User.find({ email: req.body.email });
  console.log("getuser", getuser);
  //  if (getuser) {
  //     return next(new AppError("Mail is exist", 200));
  //   }
  const newUser = await User.create(req.body);
  const bcryptpassword = await bcrypt.hash(newUser.password, 12);
  const changepassword = await User.findByIdAndUpdate(
    { _id: newUser._id },
    {
      $set: {
        password: bcryptpassword,
      },
    }
  );
  const _id = newUser._id;

  const token = jwt.sign(
    {
      _id,
    },
    config.env.JWT_KEY,
    {
      expiresIn: "8h",
    }
  );
  const message = `PLESE VERIFY THIS ACCOUNT
      <a href=http://localhost:3000/login/${token} target="_blank"><button style="background-color:rgb(72, 21, 192); color:aliceblue"> Verify </a>`;

  await sendEmail({
    email: newUser.email,
    subject: "Account Verification",
    message,
  });
  createSendToken(newUser, 201, req, res);
});
//////
exports.activateAccount = catchAsync(async (req, res, next) => {
  const token = req.body.token;
  //2. Verification token
  const decoded = jwt.verify(token, config.env.JWT_KEY);
  console.log(decoded._id);

  //3. check if user still exists
  const user = await User.findByIdAndUpdate(
    {
      _id: decoded._id,
    },
    {
      $set: {
        verify: true,
      },
    }
  );
  return res.send({
    status: "success",
    message: "verified",
  });
});
/////
// exports.login = catchAsync(async (req, res, next) => {
//   const { email, password } = req.body;
//    const user = await User.find({ email:email });
//    const bcryptpassword = await bcrypt.compare(
//      req.body.password,
//      user[0].password
//    );

//   // 1) Check if email and password exist
//   if (!email || !bcryptpassword) {
//     return next(new AppError("Please provide email and password!", 200));
//   }
//   // 2) Check if user exists && password is correct
//   const user = await User.findOne({ email }).select("+password");

//   if (!user || !(await user.correctPassword(password, user.password))) {
//     return next(new AppError("Incorrect email or password", 200));
//   }

//   if (user.verify === false) {
//     return next(
//       new AppError(
//         "email is not verified , Please verify your email to login!",
//         200
//       )
//     );
//   }

//   // 3) If everything ok, send token to client
//   createSendToken(user, 200, req, res);
// });
///

exports.login = async (req, res, next) => {
  console.log(req.body);
  try {
    const email = req.body.email;
    const user = await User.find({ email: req.body.email });
    console.log(user);
    const _id = user[0]._id;

    const bcryptpassword = await bcrypt.compare(
      req.body.password,
      user[0].password
    );
    console.log(bcryptpassword);
    if (
      bcryptpassword === req.body.password ||
      user[0]._verify == "true" ||
      user[0].email === req.body.email
    ) {
      const token = jwt.sign(
        {
          email,
          _id,
        },
        config.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );
      await User.findByIdAndUpdate(
        { _id: user[0]._id },
        {
          $set: {
            token: token,
          },
        }
      );

      return res.status(200).json({
        status: "success",
        token,
        data: user,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({
      status: "fail",
      err,
    });
  }
};
exports.sendotp = catchAsync(async (req, res, next) => {
  // console.log(req.body.emailid);
  const user = await User.findOne({ email: req.body.emailid });
  console.log(user);
  // if (!user) {
  //   return next(new AppError("there is no user with email address", 200));
  // }
  const otp = Math.floor(1000 + Math.random() * 9000);
  console.log(otp);
  //    const resetToken = createPasswordResetToken(otp);
  await user.save({ validateBeforeSave: false });
  const message = `<p> we have received a request to have your password reset for <b>KOOKY ACCOUNT</b>.
    if you did not make this request ,plese ignore this email.<br>
    <br> To reset your password,plese <a href = "#"><b>visit the link</b></a> </p> <hr>
    <h3><b> Having trouble?</b></h3>
    <p>if the above link does not work try copying this link into your browser.</p>
    <p>${otp}</p></hr>
    <h3><b> Question ?<b></h3>
    <p>plese let us know if there's anything we can help you with by replying to this email or by emailing <b>Kooky.com</b></p>`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Hi,${user.name},here's how to reset your password.(valid for 10 mins)`,
      message,
    });
    const updateOtp = await User.findByIdAndUpdate(
      { _id: user._id },
      {
        $set: {
          otp: otp,
        },
      }
    );
    res.status(200).json({
      status: "success",
      message: "otp sent to email",
    });
  } catch (err) {
    console.log(err);
    user.passwordResetToken = undefined;
    user.passwordResetExpres = undefined;
    await user.save({ validateBeforesave: false });
    return next(
      new AppError("There was an error sending the email .try again later !")
    );
  }
});
exports.otpverification = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });

  if (user.otp !== parseInt(req.body.otp)) {
    return next(new AppError("incorrect otp", 200));
  }

  res.status(200).json({
    status: "success",
  });
});

// exports.register = catchAsync(async (req, res) => {
//   console.log(req.body);
//   try {
//     if (
//       req.body.role == "user" &&
//       req.body.password == req.body.confirmpassword
//     ) {
//       console.log("inside user if", req.body);
//       const user = await Registration.create(req.body);
//     }
//     if (
//       req.body.role == "escort" &&
//       req.body.password == req.body.confirmpassword
//     ) {
//       console.log(req.body);
//       const user = await Registration.create(req.body);
//     }
//     if (
//       req.body.role == "agency" &&
//       req.body.passsword == req.body.confirmpassword
//     ) {
//       console.log(req.body);
//       const user = await Registration.create(req.body);
//     }

//     res.status(200).json({
//       status: "registration succesfully",
//       // date:user
//     });
//   } catch (error) {
//     res.status(200).json({
//       status: "not succesful",
//       err: error,
//     });
//     console.log(error);
//   }
// });

exports.decoded = catchAsync(async (req, res, next) => {
  //2. Verification token
  var token = req.body.token;
  // console.log("bodytoken",token)
  const decoded = jwt.verify(JSON.parse(token), config.env.JWT_KEY);
  // console.log("decodedid", decoded.id);
  const getData = await User.findById({ _id: decoded._id });
  // var decoded = jwt.decode(token, { complete: true });
  console.log("hii", getData);
  return res.status(200).json({
    status: "success",
    // token,
    // _id: decoded.id,
    fetchdata: getData,
  });
});
