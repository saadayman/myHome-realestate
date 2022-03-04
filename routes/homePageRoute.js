const express = require("express");
const { protect } = require("../config/auth.js");
const router = express.Router();

const { renderHomePage } = require("../controllers/renderPages.js");
const Listing = require("../models/Listing.js");

//Render Pages
router.get("/", renderHomePage);
router.get("/home", renderHomePage);

router.get("/listing", (req, res, next) => {
  res.render("listing", {
    title: "Listing",
    loggedIn: req.user,
    activePage: "listing",
  });
});
router.get("/contact", (req, res, next) => {
  res.render("contact", {
    title: "Contact",
    loggedIn: req.user,
    activePage: "contact",
  });
});
router.get("/about", (req, res, next) => {
  res.render("about", {
    title: "About",
    loggedIn: req.user,
    activePage: "about",
  });
});
router.get("/profile", protect, async (req, res, next) => {
  const listing = await Listing.find({ user: req.user.id });
  res.render("profile", {
    loggedIn: true,
    user: req.user,
    listing,
    activePage: "profile",
  });
});

module.exports = router;
