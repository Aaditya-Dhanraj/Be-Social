// const User = require("../models/userModels");
// const catchAsync = require("../utils/catchAsync");


exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  // if (alert === 'booking')
  //   res.locals.alert =
  //     "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";
  next();
};

// exports.getAccount = (req, res) => {
//   res.status(200).render("account", {
//     title: "Your account",
//   });
// };

// exports.updateUserData = catchAsync(async (req, res, next) => {
//   const updatedUser = await User.findByIdAndUpdate(
//     req.user.id,
//     {
//       name: req.body.name,
//       email: req.body.email,
//     },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );

//   res.status(200).render("account", {
//     title: "Your account",
//     user: updatedUser,
//   });
// });

// exports.getLoginForm = (req, res) => {
//   res.status(200).render("login", {
//     title: "Log into your account",
//   });
// };

// exports.getSignupForm = (req, res) => {
//   res.status(200).render("signup", {
//     title: "SignUp",
//   });
// };

// exports.getAccount = (req, res) => {
//   // console.log('users are  ', user);
//   res.status(200).render("account", {
//     title: "Your account",
//   });
// };

// exports.updateUserData = catchAsync(async (req, res) => {
//   const updatedUser = await User.findByIdAndUpdate(
//     req.user.id,
//     {
//       name: req.body.name,
//       email: req.body.email,
//     },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );
//   res.status(200).render("account", {
//     title: "Your Account",
//     user: updatedUser,
//   });
// });
