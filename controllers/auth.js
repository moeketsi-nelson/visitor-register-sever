const User = require("../models/user");
const JWT = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");

exports.login = async (req, res, next) => {
  const { branch, password } = req.body;

  if (!branch || !password) {
    res.redirect("/login");
    // return next(new ErrorResponse("please provide branch and password", 400));
  }

  try {
    const user = await User.findOne({ branch }).select("+password");

    if (!user) {
      res.redirect("/login");
      // return next(new ErrorResponse("invalid credentials", 404));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      res.redirect("/login");
    }

    res.redirect("/register-visitor");
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

exports.logout = (req, res, next) => {
  res.send("logout route");
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token: token,
  });
};
