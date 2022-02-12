exports.handleSetup = (socket) => {
  socket.on('setup', (user) => {
    socket.join(user.id);
    socket.emit('connected');
  });
};

exports.handleJoinChat = (socket) => {
  socket.on('join_room', (room) => {
    socket.join(room);
  });
};

exports.handleMessage = (socket) => {
  socket.on('new_message', (message) => {
    let chat = message.chat;
    if (!chat.users) {
      return console.log('no users');
    }
    chat.users.forEach((user) => {
      if (user._id === message.sender._id) {
        return;
      }
      socket.in(user._id).emit('new_message_recieved', message);
    });
  });
};

exports.handleTyping = (socket) => {
  socket.on('typing', (room) => {
    socket.in(room).emit('typing');
  });
  socket.on('stop_typing', (room) => {
    socket.in(room).emit('stop_typing');
  });
};
