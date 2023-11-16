const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const userSchema = new Schema({
  branch: {
    type: String,
    required: [true, "branch is required"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
    minlength: 6,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedToken = function () {
  return JWT.sign({ id: this._id, branch: this.branch }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = model("User", userSchema);
module.exports = User;
