const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const path = require("node:path");

const {
  createEvent,
  deleteEvent,
  findEvent,
  registerGuest,
} = require("../controllers/event");

router.use(express.static("public"));
// router.use(
//   express.static(
//     path.join(
//       __dirname,
//       "/node_modules/signature_pad/dist/signature_pad.min.js"
//     )
//   )
// );

router.get("/:event", isAuth, findEvent);
router.post("/create", isAuth, createEvent);
router.delete("/delete", isAuth, deleteEvent);
router.post("/register-guest", isAuth, registerGuest);

module.exports = router;
