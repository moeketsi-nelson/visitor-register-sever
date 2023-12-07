const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const path = require("node:path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { visit, findVisitor } = require("../controllers/visitor");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(upload.none());
router.use(express.static("public"));
router.use(
  express.static(
    path.join(
      __dirname,
      "/node_modules/signature_pad/dist/signature_pad.min.js"
    )
  )
);

router.post("/new", upload.none(), isAuth, visit);
router.post("/find", upload.none(), isAuth, findVisitor);

module.exports = router;
