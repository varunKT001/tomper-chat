const CatchAsyncErrors = require('../middleware/CatchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');

exports.sendSingleChat = CatchAsyncErrors(async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return next(new ErrorHandler('Missing fields', 400));
  }
  let existingChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate('users')
    .populate('latestMessage');

  existingChat = await User.populate(existingChat, {
    path: 'latestMessage.sender',
  });
  if (existingChat.length > 0) {
    res.status(200).json({
      success: true,
      data: existingChat[0],
    });
  } else {
    const chatData = {
      chatName: 'sender',
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    const createdChat = await Chat.create(chatData);
    const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      'users'
    );
    res.status(200).json({
      success: true,
      data: fullChat,
    });
  }
});

exports.sendAllChats = CatchAsyncErrors(async (req, res, next) => {
  let chats = await Chat.find({
    users: { $elemMatch: { $eq: req.user._id } },
  })
    .populate('users')
    .populate('groupAdmin')
    .populate('latestMessage')
    .sort({ updatedAt: -1 });
  chats = await User.populate(chats, {
    path: 'latestMessage.sender',
  });
  res.status(200).json({
    success: true,
    data: chats,
  });
});

exports.createGroupChat = CatchAsyncErrors(async (req, res, next) => {
  const { users, name } = req.body;
  if (!users || !name) {
    return next(new ErrorHandler('Missing fields', 400));
  }
  if (users.length < 2) {
    return next(new ErrorHandler('There must be more than 2 users', 400));
  }
  users.push(req.user);
  const groupChat = await Chat.create({
    chatName: name,
    isGroupChat: true,
    users,
    groupAdmin: req.user,
  });
  const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
    .populate('users')
    .populate('groupAdmin');
  res.status(200).json({
    success: true,
    data: fullGroupChat,
  });
});

exports.renameGroup = CatchAsyncErrors(async (req, res, next) => {
  const { chatId, chatName } = req.body;
  const group = await Chat.findById(chatId);
  console.log(group.groupAdmin);
  if (group.groupAdmin._id.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler(
        'Only group admins can change the name of the group',
        401
      )
    );
  }
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    { new: true }
  )
    .populate('users')
    .populate('groupAdmin');

  res.status(200).json({
    success: true,
    data: updatedChat,
  });
});

exports.addToGroup = CatchAsyncErrors(async (req, res, next) => {
  const { chatId, userId } = req.body;
  const group = await Chat.findById(chatId);
  if (group.groupAdmin._id.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler('Only group admins can add/remove someone', 401)
    );
  }
  const updatedGroup = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: {
        users: userId,
      },
    },
    {
      new: true,
    }
  )
    .populate('users')
    .populate('groupAdmin');

  res.status(200).json({
    success: true,
    data: updatedGroup,
  });
});

exports.removeFromGroup = CatchAsyncErrors(async (req, res, next) => {
  const { chatId, userId } = req.body;
  const group = await Chat.findById(chatId);
  if (
    group.groupAdmin._id.toString() !== req.user._id.toString() &&
    userId.toString() !== req.user._id.toString()
  ) {
    return next(
      new ErrorHandler('Only group admins can add/remove someone', 401)
    );
  }
  const updatedGroup = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: {
        users: userId,
      },
    },
    {
      new: true,
    }
  )
    .populate('users')
    .populate('groupAdmin');

  res.status(200).json({
    success: true,
    data: updatedGroup,
  });
});
