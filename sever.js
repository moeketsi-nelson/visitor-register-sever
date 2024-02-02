require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const path = require("node:path");
const helmet = require("helmet");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const { isAuth, isAdmin } = require("./middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const flash = require("express-flash");

const modules = require("./routes/modules");

connectDB();

const PORT = process.env.PORT || 5000;
const corsOptions = {
  "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
  vary: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(upload.none());
app.disable("x-powered-by");

// app.use(helmet());

const store = new MongoDBSession({
  uri: process.env.MONGO_URI,
  collection: "mySession",
});

app.use(
  session({
    secret: "fghjkkjhfddj",
    resave: false,
    saveUninitialized: true,
    store,
  })
);

app.use(cors(corsOptions));
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );
app.use(flash());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

modules(app);
app.use(express.static("public"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/event", require("./routes/event"));
app.use("/api/visitor", require("./routes/visitor"));

app.get("/", (req, res, next) => {
  res.render("login");
});

app.get("/register-visitor", isAuth, (req, res, next) => {
  res.render("visitor-register");
});

app.get("/register-guest", isAuth, (req, res, next) => {
  res.render("guest-register");
});

app.get("/create-event", isAuth, (req, res, next) => {
  res.render("create-event");
});

app.get("/admin", isAuth, isAdmin, (req, res, next) => {
  res.render("admin");
});

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});

process.on("unhandledRejection,", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});

console.log("hi")