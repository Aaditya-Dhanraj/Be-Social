const multer = require('multer');
const sharp = require('sharp');
const Post = require('../Models/postModels');
const User = require('../Models/userModels');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = function (req, file, cb) {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload an Image file', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file || !req.body.title)
    return next(new AppError('Please fill all the fields', 400));

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`data/img/users/${req.file.filename}`);
  next();
});

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
        'This route can only change names if you wish to change the password then please go to /changepassword route',
        400
      )
    );
  }

  // 2) filter out data that are not allowed to be there

  if (req.body.title && req.file && req.user.id) {
    const post = await Post.create({
      title: req.body.title,
      body: req.body.body,
      postedBy: req.user.id,
      photo: req.file.filename,
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

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find().populate('postedBy', '_id name');

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
      myPosts,
    },
  });
});
