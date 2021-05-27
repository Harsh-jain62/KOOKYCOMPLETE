const Review = require("../models/reviewModel.js");
/////create review////
exports.reviewuser = async function (req, res) {
     const user = await Review.create(req.body);
     res.status(200).json({
       status: "success",
       data: user,
     });
};
/////fetch review////
     exports.fetchreview = async (req, res, next) => {
       const getData = await Review.find({userid: req.body.userid});
       res.status(200).json({
         status: "success",
         results: getData.length,
         data: getData.ratings,
       });
     };
///edit///review//
  exports.editreview= function (req, res) {
                      Review.findByIdAndUpdate(
                        {
                          _id: req.params.id,
                        },
                        { $set: {ratings:req.body.ratings,
                          description:req.body.description } }
                      )
                        .then((result) => {
                          res.status(200).json({
                            status: "success",
                         
                          });
                        })
                        .catch((err) => {
                          console.warn(err);
                        });
                    }
                    ////delete review//
                     exports.deletereview = function (req, res) {
                       console.log(req.params);
                       Review.deleteOne({ _id: req.params.id })
                         .then((result) => {
                           res.status(200).json(result);
                         })
                         .catch((err) => {
                           console.warn(err);
                         });
                     };
              
                    