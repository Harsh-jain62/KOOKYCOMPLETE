const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const mime = require("mime");
const path = require("path");
const fs = require("fs");
const PORT = 3001;
exports.deleteagent = function (req, res) {
  console.log(req.params);
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.warn(err);
    });
};
exports.createagent = async (req, res, next) => {
  const create = await User.create(req.body);
  res.status(200).json({
    status: "success",
    data: create,
  });
};
exports.editagentprofile = async function (req, res) {
  console.log(req.body);
  User.findByIdAndUpdate(
    { _id: req.params.id },

    {
      $set: {
        agencyname: req.body.agencyname,
        email: req.body.email,
        ownername: req.body.ownername,
        city: req.body.city,
        country: req.body.country,
        setpercent: req.body.setpercent,
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
exports.updateagencyprice = async function (req, res) {
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
exports.createmember = async (req, res, next) => {
  //   console.log(req.body.pictures);
  let data = {
    membername: req.body.membername,
    age: req.body.age,
    bodyshape: req.body.bodyshape,
    gender: req.body.gender,
    city: req.body.city,
    country: req.body.country,
    measurement: req.body.measurement,
    height: req.body.height,
    language: req.body.language,
    service: req.body.service,
    agentid: req.body.agentid,
  };

  const create = await User.create(data);
  let images = [];
  console.log(req.params.id);
  // console.log(req.body.image.length);
  for (var i in req.body.pictures) {
    console.log(i);
    let date = new Date().toLocaleString();
    let dataString = date.replace(" ", "-");
    let dateupdate = dataString.replace(" ", "-");
    var matches = await req.body.pictures[i].match(
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
    console.log(images);
  }
  const book = await User.findByIdAndUpdate(
    { _id: create._id },

    {
      $set: {
        image: images,
      },
    }
  );
  res.status(200).json({
    status: "success",
    data: book,
  });
};
exports.deletemember = function (req, res) {
  console.log(req.params);
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.warn(err);
    });
};

// exports.editmember = async (req, res, next) => {
//   //   console.log(req.body.pictures);
//   //  let images = [];
//   // console.log(req.params.id);
//   // // console.log(req.body.image.length);
//   // for (var i in req.body.pictures) {
//   //   console.log(i);
//   //   let date = new Date().toLocaleString();
//   //   let dataString = date.replace(" ", "-");
//   //   let dateupdate = dataString.replace(" ", "-");
//   //   var matches = await req.body.pictures[i].match(
//   //       /^data:([A-Za-z-+\/]+);base64,(.+)$/
//   //     ),
//   //     response = {};
//   //   if (matches.length !== 3) {
//   //     return new Error("Invalid input string");
//   //   }
//   //   response.type = matches[1];
//   //   response.data = new Buffer.from(matches[2], "base64");
//   //   let decodedImg = response;
//   //   let imageBuffer = decodedImg.data;
//   //   let type = decodedImg.type;

//   //   const name = type.split("/");
//   //   const name1 = name[0];
//   //   let extension = mime.getExtension(type);
//   //   const rand = Math.ceil(Math.random() * 1000);
//   //   //Random photo name with timeStamp so it will not overide previous images.
//   //   const fileName = `photo_${Date.now()}.${extension}`;
//   //   path3 = path.resolve(`./public/images`);
//   //   const localpath = `${path3}/photo/`;
//   //   if (!fs.existsSync(localpath)) {
//   //     fs.mkdirSync(localpath, { recursive: true });
//   //   }
//   //   fs.writeFileSync(`${localpath}` + fileName, imageBuffer, "utf8");
//   //   const url = `${req.protocol}://${req.hostname}:${PORT}/images/photo/${fileName}`;
//   //   console.log(url);
//   //   images.push(url);
//   //   console.log(images);
//   // }
//   const book = await User.findByIdAndUpdate(
//     { _id: req.params.id},

//     {
//       $set: {
//     // image: images,

//       },
//     }
//   );
//   res.status(200).json({
//     status: "success",
//     data: book,
//   });
// };

exports.editmember = async function (req, res) {
  let images = [];
  console.log(req.params.id);
  // console.log(req.body.image.length);
  for (var i in req.body.pictures) {
    console.log(i);
    let date = new Date().toLocaleString();
    let dataString = date.replace(" ", "-");
    let dateupdate = dataString.replace(" ", "-");
    var matches = await req.body.pictures[i].match(
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
    console.log(images);
  }
  User.findByIdAndUpdate(
    { _id: req.params.id },

    {
      $set: {
        membername: req.body.membername,
        age: req.body.age,
        bodyshape: req.body.bodyshape,
        gender: req.body.gender,
        city: req.body.city,
        country: req.body.country,
        measurement: req.body.measurement,
        height: req.body.height,
        language: req.body.language,
        service: req.body.service,
        image: images,
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

exports.getmember = async (req, res, next) => {
  const getmember = await User.find( { role: "member" });

  res.status(200).json({
    status: "success",
    results: getmember.length,
    data: getmember,
  });
};
 exports.newmember=async (req, res, next) =>{
            const getData = await User.find().sort({_id: -1}).limit(5)
             res.status(200).json({
                 status:"success",
                 results:getData.length,
                 data:getData,
             })
            }
        
