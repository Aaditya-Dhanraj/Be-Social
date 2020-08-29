const User = require('./../Models/userModels');
const Post = require('./../Models/postModels');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

exports.othersProfile = catchAsync(async (req, res, next) => {
  await User.findOne({ _id: req.params.id })
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate('postedBy', '_id name')
        .exec((err, posts) => {
          if (err) {
            return next(new AppError(error, 422));
          }
          res.json({ user, posts });
        });
    })
    .catch((err) => {
      return next(new AppError('User not found', 422));
    });
});
