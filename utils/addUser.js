const connectDB = require("../config/database");
const User = require("../models/user");

async function saveUser() {
  try {
    connectDB();
    const user = new User({
      branch: "Tshwane",
      password: "123456",
    });

    await user.save();

    // console.log(await User.find({ branch: "brits" }));
  } catch (error) {
    console.log(error);
  }
}

saveUser();
