const User = require('../models/userModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/CatchAsyncErrors');
const sendToken = require('../utils/jwt');

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, profilePicture } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler('Missing fields', 400));
  }
  const exitingUser = await User.findOne({ email });
  if (exitingUser) {
    return next(new ErrorHandler('User already exist', 400));
  }
  const user = await User.create({
    name,
    email,
    password,
    profilePicture,
  });
  sendToken(user, 200, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler('Missing fields', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }
  sendToken(user, 200, res);
});
