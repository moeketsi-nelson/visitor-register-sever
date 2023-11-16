require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const path = require("path");
const helmet = require("helmet");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const { isAuth } = require('./middleware/auth');

connectDB();

const PORT = process.env.PORT || 5000;
const corsOptions = {
  "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
  vary: true,
};

app.disable("x-powered-by");

const store = new MongoDBSession({
  uri: process.env.MONGO_URI,
  collection: "mySession",
});

app.use(session({
  secret: "fghjkkjhfddj",
  resave: false,
  saveUninitialized: false,
  store
}));

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/event", require("./routes/event"));
app.use("/api/visitor", require("./routes/visitor"));

app.get("/", (req, res, next) => {
  res.render("login");
});

app.get("/register-visitor", isAuth ,(req, res, next) => {
  // req.session.isAuth = true;
  // console.log(req.session.id)
  res.render("visitor-register");
});

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});

process.on("unhandledRejection,", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
