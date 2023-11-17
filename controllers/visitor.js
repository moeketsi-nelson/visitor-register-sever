const JWT = require("jsonwebtoken");
const Visitor = require("../models/visitor");
const ErrorResponse = require("../utils/errorResponse");

exports.visit = async (req, res, next) => {
  // const { authorization } = req.headers;
  const { name, surname, id, email, reason, cellno, branch } = req.body;
  // const token = authorization.split(" ")[1];

  try {
    const visitorFromDB = await Visitor.findOne({ id });

    if (!visitorFromDB) {
      // const decoded = JWT.verify(token, process.env.JWT_SECRET);

      // console.log(req.body)

      const visitor = new Visitor({
        name,
        surname,
        id,
        email,
        cellno,
      });

      // visitor.visits[0] = { reason: reason, date: Date.now(), branch };
      visitor.visits.push({ reason: reason, date: new Date(), branch });
      console.log(visitor);
      await visitor.save();
    }

    if (visitorFromDB) {
      visitorFromDB.visits.push({ reason: reason, date: Date.now(), branch });
      await visitorFromDB.save();
    }

    res.redirect("/register-visitor");

    // res.status(201).json({
    //   success: true,
    //   message: "visitor registered",
    // });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

exports.findVisitor = async (req, res, next) => {
  const { dateTo, dateFrom } = req.body;

  try {
    console.log(req.body);
    const visitorFromDB = await Visitor.find(searchObjectBuilder(req.body));
    if (!visitorFromDB || visitorFromDB.length === 0) {
      return next(new ErrorResponse("Visitors not found", 404));
    }

    res.status(200).send(visitorFromDB);
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

function searchObjectBuilder(reqBody) {
  let obj = {};
  Object.keys(reqBody).map((key) => {
    if (key !== "dateTo" && key !== "dateFrom") {
      if (reqBody[key] !== "" && reqBody[key] !== undefined) {
        obj[key] = reqBody[key];
      }
    }
  });

  return obj;
}
//{ "visits.date": { $lte: dateTo } }
