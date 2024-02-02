const errorHandler = require("../middleware/error");
const Event = require("../models/event");
const ErrorResponse = require("../utils/errorResponse");
const JWT = require("jsonwebtoken");

exports.createEvent = async (req, res, next) => {
  const { name, location, date, branch } = req.body;

  console.log(req.body);

  try {
    const eventFromDB = await Event.findOne({ name });

    if (eventFromDB.name === name) {
      return res.redirect(
        `/create-event?error=${encodeURIComponent(
          "An event with the same name already exists."
        )}`
      );
    }

    const event = new Event({
      name,
      location,
      date,
      branch,
    });

    event.save();

    return res.redirect(
      `/create-event?message=${encodeURIComponent(
        `Event ${name} has been created`
      )}`
    );
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
      // res.render("guest-register", {
      //   message: "Event does not exist",
      // });

      // req.flash("message", "Event does not exist.");
      return res.redirect(
        `/register-guest?error=${encodeURIComponent("Event does not exist")}`
      );
      // return next(new ErrorResponse("Event does not exist", 404));
    }

    if (eventFromDB) {
      eventFromDB.guests.push({ name, surname, id, cellno, email, signature });
      await eventFromDB.save();
    }

    // res.render("guest-register", {
    //   message: "Guest registered",
    // });

    // req.flash("message", "Guest registered");
    return res.redirect(
      `/register-guest?message=${encodeURIComponent("Guest registered")}`
    );
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
