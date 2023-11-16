const JWT = require("jsonwebtoken");
const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");

exports.protect = async (req, res, next) => {
  let token;

  // if (!req.session.token) {
  //   return next(new ErrorResponse("Not Authorized To Access This Route", 401));
  // } else {
  //   token = req.session.token;
  // }

  console.log()
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not Authorized To Access This Route", 401));
  }

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse("No User Found With This Id", 404));
    }

    req.user = user;

    next();
  } catch (error) {
    return next(new ErrorResponse("Not Authorized To Access This Route", 404));
  }
};

exports.isAuth = async (req, res, next) => {
  if (!req.session.isAuth) {
    res.redirect("/login");
  } else {
    next();
  }
};

exports.protectGuestPage = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not Authorized To Access This Route", 401));
  }

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET2);

    if (!decoded) {
      return next(
        new ErrorResponse("Not Authorized To Access This Route", 401)
      );
    }

    req.user = decoded;

    next();
  } catch (error) {
    return next(new ErrorResponse("Not Authorized To Access This Route", 404));
  }
};
