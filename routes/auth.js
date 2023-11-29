const express = require("express");
const router = express.Router();

const { login, logout } = require("../controllers/auth");

router.use(express.static("public"));
router.use(
  "/public",
  express.static(
    __dirname + "/node_modules/signature_pad/dist/signature_pad.js"
  )
);

router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
