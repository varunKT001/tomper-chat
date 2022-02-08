// load env-vars
require('dotenv').config();

// requiring dependencies
const express = require('express');

// require db configs
const connectToDb = require('./config/db');

// initialize express
const app = express();

// uncaught exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server shutting down due to uncaught exception`);
  process.exit(1);
});

// connect to db
connectToDb();

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
