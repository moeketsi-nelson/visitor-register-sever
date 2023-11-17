const User = require("../models/user");
const JWT = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");

exports.login = async (req, res, next) => {
  const { branch, password } = req.body;

  if (!branch || !password) {
    res.render('login', {
      message: "please privide branch name and password"
    });
  }

  try {
    const user = await User.findOne({ branch }).select("+password");

    if (!user) {
      res.send({
        message: "User does not exist",
      });
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      // res.render("login", {
      //   message: "Incorrect password",
      // });

      res.send("error")
    }

    req.session.isAuth = true;
    // res.render("visitor-register",{message:"hi"});
    res.redirect("/register-visitor");
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      throw err;
    }
    res.redirect("/");
  });
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token: token,
  });
};
