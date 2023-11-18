const express = require("express");
const router = express.Router();

const { login, logout } = require("../controllers/auth");

router.use(express.static("public"));

router.post("/login", login);
router.post("/logout", logout);

module.exports = router;