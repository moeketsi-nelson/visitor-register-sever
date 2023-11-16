const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");

const { visit, findVisitor } = require("../controllers/visitor");

router.post("/new", isAuth , visit);
router.post("/find", isAuth, findVisitor);

module.exports = router;
