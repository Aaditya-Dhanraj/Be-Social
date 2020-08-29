const Post = require('../Models/postModels');
const User = require('../Models/userModels');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createPost = catchAsync(async (req, res, next) => {
  // console.log(req.file);
  // console.log(req.body);
  // 1) check if anything irrelevent present or not like password
  if (
    req.body.password ||
    req.body.passwordConfirm ||
    req.body.email ||
    req.body.name
  ) {
    return next(
      new AppError(
        'This route can only upload posts if you wish to change the password then please go to /changepassword route',
        400
      )
    );
  }

  // 2) filter out data that are not allowed to be there

  if (req.body.title && req.body.photo && req.user.id) {
    const post = await Post.create({
      title: req.body.title,
      body: req.body.body,
      postedBy: req.user.id,
      photo: req.body.photo,
    });

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } else {
    return next(new AppError('Please fill all fields', 400));
  }
});

exports.Unlike = catchAsync(async (req, res, next) => {
  const likes = await Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user.id },
    },
    {
      new: true,
    }
  ).exec(function (error, result) {
    if (error) {
      return next(new AppError(error, 422));
    } else {
      res.json(result);
    }
  });
});
exports.like = catchAsync(async (req, res, next) => {
  await Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user.id },
    },
    {
      new: true,
    }
  ).exec(function (error, result) {
    if (error) {
      return next(new AppError(error, 422));
    } else {
      res.json(result);
    }
  });
});
exports.comment = catchAsync(async (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  await Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate('comments.postedByComment', 'name')
    .populate('postedByComment', 'name')
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

exports.deletePost = catchAsync(async (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate('postedBy', '_id')
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find().populate('postedBy', 'name');

  res.status(200).json({
    status: 'success',
    result: posts.length,
    data: {
      posts,
    },
  });
});

exports.getMyPosts = catchAsync(async (req, res, next) => {
  const myPosts = await Post.find({ postedBy: req.user.id });

  if (!myPosts) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    result: myPosts.length,
    data: {
      name: req.user.name,
      myPosts,
    },
  });
});
