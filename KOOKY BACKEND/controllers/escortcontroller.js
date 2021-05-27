const User = require("../models/user.js");
const catchAsync = require("../utils/catchAsync");
const mime = require("mime");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const PORT = 3001;
/////CREATE ESCORT///
exports.createescort = async (req, res, next) => {
  try {
    const escort = await User.create(req.body);
    res.status(200).json({
      status: "success",
      data: escort,
    });
  } catch (err) {
    console.log(err);
  }
};
//////Edit escort Profile////
exports.updateescortprofile = function (req, res) {
  console.log(req.body.escortname);
  User.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: {
        escortname: req.body.escortname,
        age: req.body.age,
        bodyshape: req.body.bodyshape,
        countryname: req.body.countryname,
        cityname: req.body.cityname,
        gender: req.body.gender,
        bust: req.body.bust,
        waist: req.body.waist,
        hips: req.body.hips,
        height: req.body.height,
        language: req.body.language,
        service: req.body.service,
        aboutme: req.bodyaboutme,
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
/////forgote passowrd////
exports.forgetpassword = async function (req, res) {
  if (req.body.password === req.body.confirmpassword) {
    let newPassword = req.body.password.toString();

    bcryptpassword = await bcrypt.hash(newPassword, 12);
    console.log(bcryptpassword);
    User.findByIdAndUpdate(
      { _id: req.params.id },

      { $set: { password: bcryptpassword } }
    ).then((result) => {
      res.status(200).json(result.password);
    });
  }

  console.warn("password does not match");
};

//////  update escort price

exports.updateescortprice = async function (req, res) {
  User.findByIdAndUpdate(
    { _id: req.params.id },

    {
      $set: {
        place: req.body.place,
        time: req.body.time,
        shot: req.body.shot,
        price: req.body.price,
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
////////Verified//////
exports.verified = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  let date = new Date().toLocaleString();
  let dataString = date.replace(" ", "-");
  let dateupdate = dataString.replace(" ", "-");
  var matches = await req.body.proof.match(
      /^data:([A-Za-z-+\/]+);base64,(.+)$/
    ),
    response = {};
  if (matches.length !== 3) {
    return new Error("Invalid input string");
  }
  response.type = matches[1];
  response.data = new Buffer.from(matches[2], "base64");
  let decodedImg = response;
  let imageBuffer = decodedImg.data;
  let type = decodedImg.type;
  const name = type.split("/");
  const name1 = name[0];
  let extension = mime.getExtension(type);
  const rand = Math.ceil(Math.random() * 1000);
  //Random photo name with timeStamp so it will not overide previous images.
  const fileName = `photo_${Date.now()}.${extension}`;
  path3 = path.resolve(`./public/images`);
  const localpath = `${path3}/photo/`;
  if (!fs.existsSync(localpath)) {
    fs.mkdirSync(localpath, { recursive: true });
  }
  fs.writeFileSync(`${localpath}` + fileName, imageBuffer, "utf8");
  const url = `${req.protocol}://${req.hostname}:${PORT}/images/photo/${fileName}`;
  console.log(url);
  const updating = await User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: { proof: url },
    }
  );
  // console.log(updating);
  return res.status(200).json({
    status: "success",
  });
});
//////insert escort multiple picture
exports.insertescortpicture = catchAsync(async (req, res, next) => {
  let images = [];
  console.log(req.params.id);
  // console.log(req.body.image.length);
  for (var i in req.body.image) {
    console.log(i);
    let date = new Date().toLocaleString();
    let dataString = date.replace(" ", "-");
    let dateupdate = dataString.replace(" ", "-");
    var matches = await req.body.image[i].match(
        /^data:([A-Za-z-+\/]+);base64,(.+)$/
      ),
      response = {};
    if (matches.length !== 3) {
      return new Error("Invalid input string");
    }
    response.type = matches[1];
    response.data = new Buffer.from(matches[2], "base64");
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;

    const name = type.split("/");
    const name1 = name[0];
    let extension = mime.getExtension(type);
    const rand = Math.ceil(Math.random() * 1000);
    //Random photo name with timeStamp so it will not overide previous images.
    const fileName = `photo_${Date.now()}.${extension}`;
    path3 = path.resolve(`./public/images`);
    const localpath = `${path3}/photo/`;
    if (!fs.existsSync(localpath)) {
      fs.mkdirSync(localpath, { recursive: true });
    }
    fs.writeFileSync(`${localpath}` + fileName, imageBuffer, "utf8");
    const url = `${req.protocol}://${req.hostname}:${PORT}/images/photo/${fileName}`;
    console.log(url);
    images.push(url);
  }
  const updating = await User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: { image: images },
    }
  );
  console.log(images);
  // console.log(updating);
  return res.status(200).json({
    status: "success",
  });
});
/////delete escort profile///
exports.deleteescortprofile = function (req, res) {
  console.log(req.params);
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.warn(err);
    });
};

///////new booking////
(exports.getnewbooking = async (req, res, next) => {
  const getnewbooking = await User.find().sort({ _id: -1 }).limit(5);
  res.status(200).json({
    status: "success",
    results: getnewbooking.length,
    data: getnewbooking,
  });
}),
  //////all booking display///
  (exports.getallbooking = async (req, res, next) => {
    const getallbooking = await User.find();

    res.status(200).json({
      status: "success",
      results: getallbooking.length,
      data: getallbooking,
    });
  }),
  //////booking accept/reject//
  (exports.bookingstatus = function (req, res) {
    User.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: { isActive: req.body.isActive } }
    )
      .then((result) => {
        res.status(200).json({
          status: "success",
          data: result.isActive,
        });
      })
      .catch((err) => {
        console.warn(err);
      });
  }),
  //////////online status ////
  (exports.onlinestatus = function (req, res) {
    User.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: { online: req.body.online } }
    )
      .then((result) => {
        res.status(200).json({
          status: "success",
          data: result.online,
        });
      })
      .catch((err) => {
        console.warn(err);
      });
  });
////////accepting booking///
exports.acceptingbookingstatus = function (req, res) {
  User.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: { acceptingbooking: req.body.acceptingbooking } }
  )
    .then((result) => {
      res.status(200).json({
        status: "success",
        data: result.acceptingbooking,
      });
    })
    .catch((err) => {
      console.warn(err);
    });
};
///////////////////////searching escort//////
exports.searchescort = async (req, res, next) => {
  // let query={name:a}
  // if(a){

  // }
  const getescort = await User.find(
    { role: "escort" } && {
        cityname: req.body.cityname,
      } && { countryname: req.body.countryname } && {
        place: req.body.place,
      } && { Duration: req.body.Duration } && {
        time: req.body.time,
      } && { Date: req.body.Date } && { gender: req.body.gender }
  );

  res.status(200).json({
    status: "success",
    results: getescort.length,
    data: getescort,
  });
};
