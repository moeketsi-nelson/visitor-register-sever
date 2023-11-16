const express = require("express");
const router = express.Router();

const { createEvent, deleteEvent, findEvent , registerGuest} = require("../controllers/event");

router.get("/:event", findEvent);
router.post("/create", createEvent);
router.delete("/delete", deleteEvent);
router.post('/:event', registerGuest);

module.exports = router;
