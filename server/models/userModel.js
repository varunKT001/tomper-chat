const mongoose = require('mongoose');
const { DEFAULT_PROFILE_PICTURE } = require('../utils/constants');

const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
    profilePicture: {
      type: String,
      default: DEFAULT_PROFILE_PICTURE,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userModel);
