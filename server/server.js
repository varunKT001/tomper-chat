// load env-vars
require('dotenv').config();

// requiring dependencies
const express = require('express');
const cookieParser = require('cookie-parser');

// require db configs
const connectToDb = require('./config/db');

// initialize express
const app = express();

// requiring routers
const userRouter = require('./routes/userRouter');

// requiring middlewares
const errorMiddleware = require('./middleware/Error');

// uncaught exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server shutting down due to uncaught exception`);
  process.exit(1);
});

// connect to db
connectToDb();

// using middlewares
app.use(express.json({ limit: '20mb' }));
app.use(cookieParser());

// using routers
app.use('/api/user', userRouter);

// using other middlewares
app.use(errorMiddleware);

// starting server
app.listen(process.env.PORT, () => {
  console.log('server running 🚀');
});

// unhandled promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server shutting down due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
