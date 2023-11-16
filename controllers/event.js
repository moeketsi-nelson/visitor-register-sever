const errorHandler = require("../middleware/error");
const Event = require("../models/event");
const ErrorResponse = require("../utils/errorResponse");
const JWT = require("jsonwebtoken");

exports.createEvent = async (req, res, next) => {
  const { name, location, date, branch } = req.body;

  try {
    const eventFromDB = await Event.find({ name });

    if (eventFromDB.name === name) {
      return next(
        new ErrorResponse(
          "Event already exists. please use a diffent name",
          409
        )
      );
    }

    const event = new Event({
      name,
      location,
      date,
      branch,
    });

    event.save();

    res.status(201).json({
      success: true,
      link: "example.com",
    });
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
  const { authorization } = req.headers;
  const { name, surname, id, cellno, email } = req.body;
  const token = authorization.split(" ")[1];

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET2);

    const eventFromDB = await Event.findOne({ name: decoded.name });

    if (!eventFromDB) {
      return next(new ErrorResponse("Event does not exist", 404));
    }

    eventFromDB.guests.push({ name, surname, id, cellno, email });
    await eventFromDB.save();

    res.status(201).json({
      success: true,
      message: "Guest registered",
    });
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
