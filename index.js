const express = require("express");
const app = express();
const dotenv = require("dotenv");
const colors = require("colors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
dotenv.config();

// connect to database
connectDB();

// json middleware
app.use(express.json());

// error handler
app.use(errorHandler);

// listen to port
app.listen(process.env.PORT || 6000, () => {
  console.log(`Listening on port : ${process.env.PORT}`.underline.bold.blue);
});
