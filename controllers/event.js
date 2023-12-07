const errorHandler = require("../middleware/error");
const Event = require("../models/event");
const ErrorResponse = require("../utils/errorResponse");
const JWT = require("jsonwebtoken");

exports.createEvent = async (req, res, next) => {
  const { name, location, date, branch } = req.body;

  try {
    const eventFromDB = await Event.find({ name });

    if (eventFromDB.name === name) {
      res.render("create-event", {
        message: "*An Event with the same name already exists",
      });

      // res.redirect("/register-guest");
    }

    const event = new Event({
      name,
      location,
      date,
      branch,
    });

    event.save();

    // res.status(201).json({
    //   success: true,
    //   link: "example.com",
    // });

    res.render("guest-register", {
      message: "",
    });

    // res.redirect("/register-guest");
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

exports.deleteEvent = (req, res, next) => {
  res.send("Delete Event");
};

exports.findEvent = async (req, res, next) => {
  const eventName = req.params.event;
  console.log(eventName);
  try {
    const event = await Event.findOne({ name: eventName });

    if (!event) {
      return next(new ErrorResponse("Event does not exist", 404));
    }

    // res.render()
    sendToken(event, 200, res);
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

exports.registerGuest = async (req, res, next) => {
  // const { authorization } = req.headers;
  const { name, surname, id, cellno, email, eventName, signature } = req.body;
  // const token = authorization.split(" ")[1];

  try {
    // const decoded = JWT.verify(token, process.env.JWT_SECRET2);

    const eventFromDB = await Event.findOne({ name: eventName });

    if (!eventFromDB) {
      res.render("guest-register", {
        message: "Create an event to register guests",
      });

      // res.redirect("/create-event");
      // return next(new ErrorResponse("Event does not exist", 404));
    }

    if (eventFromDB) {
      eventFromDB.guests.push({ name, surname, id, cellno, email, signature });
      await eventFromDB.save();
    }

    res.render("guest-register", {
      message: "Guest registered",
    });

    // res.status(201).json({
    //   success: true,
    //   message: "Guest registered",
    // });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

const sendToken = (event, statusCode, res) => {
  const token = event.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token: token,
  });
};
