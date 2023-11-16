const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const { visit, findVisitor } = require("../controllers/visitor");

router.post("/new", protect, visit);
router.post("/find", protect, findVisitor);

module.exports = router;
