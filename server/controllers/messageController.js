const CatchAsyncErrors = require('../middleware/CatchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');

exports.sendSingleMessage = CatchAsyncErrors(async (req, res, next) => {
  const { content, chatId } = req.body;
  const chat = await Chat.findById(chatId);
  const chatUsers = chat.users.map((user) => user.toString());
  if (!chatUsers.includes(req.user._id.toString())) {
    return next(
      new ErrorHandler('Cannot message in the chats you are not part of', 401)
    );
  }
  if (!content || !chatId) {
    return next(new ErrorHandler('Missing fields', 400));
  }
  const newMessage = {
    sender: req.user._id,
    chat: chatId,
    content,
  };
  let message = await Message.create(newMessage);
  message = await message.populate('sender');
  message = await message.populate('chat');
  message = await User.populate(message, {
    path: 'chat.users',
  });
  await Chat.findByIdAndUpdate(chatId, {
    latestMessage: message,
  });
  res.status(200).json({
    success: true,
    data: message,
  });
});

exports.sendAllMessage = CatchAsyncErrors(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);
  const chatUsers = chat.users.map((user) => user.toString());
  if (!chatUsers.includes(req.user._id.toString())) {
    return next(
      new ErrorHandler('Cannot get messages of chats you are not part of', 401)
    );
  }
  const messages = await Message.find({ chat: req.params.id })
    .populate('sender')
    .populate('chat');
  res.status(200).json({
    success: true,
    data: messages,
  });
});
