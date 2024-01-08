// const connectDB = require("../config/database");
const User = require("../models/user");
const mongoose = require("mongoose");

const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  try {
    mongoose.connect("mongodb://127.0.0.1:27017/Visitor-register");
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

async function saveUser() {
  try {
    connectToDb();
    const user = new User({
      branch: "Admin",
      password: "123456",
    });

    await user.save();
    console.log("User Added");
  } catch (error) {
    console.log(error);
  }
}

saveUser();
