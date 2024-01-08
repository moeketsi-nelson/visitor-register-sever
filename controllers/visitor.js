const JWT = require("jsonwebtoken");
const Visitor = require("../models/visitor");
const ErrorResponse = require("../utils/errorResponse");

exports.visit = async (req, res, next) => {
  const { name, surname, id, email, reason, cellno, branch, signature } =
    req.body;

  try {
    const visitorFromDB = await Visitor.findOne({ id });

    if (!visitorFromDB) {
      const visitor = new Visitor({
        name,
        surname,
        id,
        email,
        cellno,
      });

      visitor.visits.push({
        reason,
        date: new Date(),
        branch,
        signature,
      });
      console.log(req.body);
      await visitor.save();
    }

    if (visitorFromDB) {
      visitorFromDB.visits.push({
        reason,
        date: Date.now(),
        branch,
        signature,
      });
      await visitorFromDB.save();
    }

    // req.flash("message", "Visitor registered!");
    return (req.flash("message", "Visitor registered!"),res.redirect("/register-visitor"));
    // res.redirect("/regi");
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

exports.findVisitor = async (req, res, next) => {
  try {
    console.log(searchObjectBuilder(req.body));
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
    if (key === "branch" && reqBody[key] !== "") {
      obj["visits.branch"] = reqBody[key];
    } else if (key === "dateFrom" && reqBody[key] !== "") {
      if (!obj["visits.date"]) {
        obj["visits.date"] = {};
      }
      obj["visits.date"].$gt = new Date(reqBody[key]).toISOString();
    } else if (key === "dateTo" && reqBody[key] !== "") {
      if (!obj["visits.date"]) {
        obj["visits.date"] = {};
      }
      obj["visits.date"].$lt = new Date(reqBody[key]).toISOString();
    } else {
      if (reqBody[key] !== "" && reqBody[key] !== undefined) {
        obj[key] = reqBody[key];
      }
    }
  });

  return obj;
}
