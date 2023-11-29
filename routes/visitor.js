const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");

const { visit, findVisitor } = require("../controllers/visitor");

router.use(express.static("public"));
router.use(
  "/public",
  express.static(
    __dirname + "/node_modules/signature_pad/dist/signature_pad.js"
  )
);
router.use(
  "/public",
  express.static(
    __dirname + "/test/test.js"
  )
);

router.post("/new", isAuth, visit);
router.post("/find", isAuth, findVisitor);

module.exports = router;
