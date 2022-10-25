const mongoose = require("mongoose");

const connect = async () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => {
      console.log(
        `Mongodb Connected on : ${conn.connection.host}`.cyan.underline.bold
      );
    });
};

module.exports = connect;
