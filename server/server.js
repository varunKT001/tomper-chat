// load env-vars
require('dotenv').config();

// requiring dependencies
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// require db configs
const connectToDb = require('./config/db');

// initialize express
const app = express();

// requiring routers
const userRouter = require('./routes/userRouter');
const chatRouter = require('./routes/chatRouter');
const messageRouter = require('./routes/messageRouter');

// requiring middlewares
const errorMiddleware = require('./middleware/Error');

// requiring sockets event handlers
const socketEventHandler = require('./controllers/socketController');

// uncaught exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server shutting down due to uncaught exception`);
  process.exit(1);
});

// connect to db
connectToDb();

// using middlewares
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: '20mb' }));
app.use(cookieParser());

// using routers
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);

// using other middlewares
app.use(errorMiddleware);

// deployment setup
if (process.env.NODE_ENV === 'production') {
  const __directory = path.resolve();
  app.use(express.static(path.join(__directory, '/client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__directory, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API service running 🚀');
  });
}

// starting server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log('server running 🚀');
});

// starting the socket
const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

// listening events
io.on('connection', (socket) => {
  socketEventHandler.handleSetup(socket);
  socketEventHandler.handleJoinChat(socket);
  socketEventHandler.handleMessage(socket);
  socketEventHandler.handleTyping(socket);
});

// unhandled promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server shutting down due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
