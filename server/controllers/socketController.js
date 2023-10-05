let connectedUsers = [];

exports.handleSetup = (socket) => {
  socket.on('setup', (user) => {
    connectedUsers.push(user.id);
    socket.user_id = user.id;
    socket.join(user.id);
    socket.emit('connected');
  });
  socket.on('disconnect', () => {
    connectedUsers = connectedUsers.filter((user) => user !== socket.user_id);
    socket.to(socket.chat_id).emit('user_online_status', false);
  });
};

exports.handleJoinChat = (socket) => {
  socket.on('join_room', ({ room, users }) => {
    socket.chat_id = room;
    socket.join(room);
    users = users.map((user) => {
      return user._id;
    });
    const online = users.every((v) => connectedUsers.includes(v));
    socket.emit('user_online_status', online);
    socket.to(room).emit('user_online_status', online);
  });
  socket.on('leave_room', (room) => {
    socket.leave(room);
  });
};

exports.handleMessage = (socket) => {
  socket.on('new_message', (message) => {
    const { chat, sender } = message;

    // Ensure the message and chat have necessary properties
    if (!chat || !chat.users || !sender) {
      console.log('Invalid message format');
      return;
    }

    // Use Set to store unique user IDs
    const recipientUserIds = new Set(chat.users.map((user) => user._id));

    // Remove the sender's ID from the recipients
    recipientUserIds.delete(sender._id);

    // Broadcast the message to all recipients
    recipientUserIds.forEach((userId) => {
      // Check if the user is connected before emitting the message
      if (connectedUsers.has(userId)) {
        socket.to(userId).emit('new_message_received', message);
      }
    });
  });
};

exports.handleTyping = (socket) => {
  socket.on('typing', (room) => {
    socket.to(room).emit('typing');
  });
  socket.on('stop_typing', (room) => {
    socket.to(room).emit('stop_typing');
  });
};
