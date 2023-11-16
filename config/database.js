require("dotenv").config({ path: "../config.env" });
const mongoose = require("mongoose");

const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  try {
    mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.once("open", function () {
      console.log("db conn");
    });
  } catch {
    mongoose.connection.on(
      "error",
      console.error.bind(console, "connection error")
    );
  }
};

module.exports = connectToDb;
