const express = require("express");
const { pagesErrorHandler, errorHandler } = require("./middlewares/error");

const app = express();
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const path = require("path");
const Homepage = require("./routes/homePageRoute");
const listings = require("./routes/listingsRoute");
const users = require("./routes/user");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
//passing passport to pawssport config
require("./config/passport")(passport);
//configuring dotenv
dotenv.config({ path: "config/config.env" });
const PORT = process.env.PORT;
//connecting the db
connectDB();
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//setting view engine
//
app.use(expressLayouts);
app.set("view engine", "ejs");

//express session
app.use(
  session({
    secret: "damuu",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(async (req, res, next) => {
  res.locals.error_msg = req.flash("error_msg");
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", Homepage);
app.use("/user", users);
app.use("/listings", listings);

app.use(pagesErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port ${PORT}`.yellow));
