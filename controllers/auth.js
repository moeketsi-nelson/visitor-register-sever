const User = require("../models/user");
const JWT = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");

exports.login = async (req, res, next) => {
  const { branch, password } = req.body;

  if (!branch || !password) {
    // let data = {
    //   message: "Please privide branch name and password",
    //   focus: ["branch", "password"],
    // };
    res.render("login", {
      message: "Please privide branch name and password",
      focus: ["branch", "password"],
    });
  }

  try {
    const user = await User.findOne({ branch }).select("+password");

    if (!user) {
      let data = {
        message: "User does not exist",
      };
      res.render("login", {
        message: "User does not exist",
      });

      // res.redirect("/");
    }

    if (user) {
      const isMatch = await user.matchPasswords(password);

      if (!isMatch) {
        // res.redirect("/");

        res.render("login", {
          message: "Please privide the correct password",
          focus: ["branch", "password"],
        });
      }

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
