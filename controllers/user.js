const User = require("../models/User");
const Listing = require("../models/Listing");
const asyncHandler = require("express-async-handler");
const passport = require("passport");

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, confirm_password } = req.body;
  let errors = [];
  let user = await User.findOne({ email });
  //validating input
  if (!name || !email || !password || !confirm_password) {
    errors.push({ msg: "Please fill in the all fields" });
    return res.render("register", {
      user: req.body,
      title: "Register",
      errors,
      activePage: "",
    });
  } //checking if user exits
  if (password !== confirm_password) {
    errors.push({ msg: "Passwords do not match" });
    return res.render("register", {
      user: req.body,
      title: "Register",
      errors,
      activePage: "",
    });
  }
  if (password.length <= 6) {
    errors.push({ msg: "Passwords cannot be less than 7 chars" });
    return res.render("register", {
      user: req.body,
      title: "Register",
      errors,
      activePage: "",
    });
  }
  if (user) {
    errors.push({ msg: "Email Already exists" });
    return res.render("register", {
      user: req.body,
      title: "Register",
      errors,
      activePage: "",
    });
  }

  user = await User.create(req.body);
  req.flash("success_msg", "Now you are Registered and can login");
  res.redirect("/user/login");
});
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  let errors = [];
  let user = await User.findOne({ email }).select("+password");
  if (!email || !password) {
    errors.push({ msg: "Please fill in all fields" });
    return res.render("login", {
      user: req.body,
      title: "Login",
      errors,
      activePage: "",
    });
  }
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/user/login",
    failureFlash: true, // takes an error var
  })(req, res, next);
});
exports.logout = asyncHandler(async (req, res, next) => {
  req.logout();
  req.flash("success_msg", "Logged out sucessfully");
  res.redirect("/user/login");
});
exports.getUserListing = asyncHandler(async (req, res, next) => {
  let listing = await Listing.find({ user: req.user.id });
  console.log(listing);
  res.render("listing", {
    title: req.user.name,
    activePage: "listing",
    listing,
    loggedIn: req.user,
  });
});
