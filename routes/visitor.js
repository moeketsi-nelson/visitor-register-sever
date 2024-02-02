const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const path = require("node:path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const flash = require("express-flash");
const modules = require("./modules");

const { visit, findVisitor } = require("../controllers/visitor");
router.use(flash());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(upload.none());
router.use(express.static("public"));
modules(router);
// router.use(function (req, res, next) {
//   res.locals.messages = req.flash("message");
//   next();
// });

router.post("/new", upload.none(), isAuth, visit);
router.post("/find", upload.none(), isAuth, findVisitor);

module.exports = router;
