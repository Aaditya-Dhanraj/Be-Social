const User = require('./../Models/userModels');
const Post = require('./../Models/postModels');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// exports.createRoom = catchAsync(async (req, res, next) => {
//   const roomId = uuidv4();

//   if (roomId) {
//     res.status(200).json({
//       roomId,
//     });
//   } else{
//     return next(
//         new AppError(
//           'No room id generated',
//           400
//         )
//       );
//   }
// });

// exports.videoChat = catchAsync(async (req, res, next) => {
//   res.render('room', { roomId: req.params.room });
// });
