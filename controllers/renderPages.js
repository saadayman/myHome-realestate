const asyncHandler = require("express-async-handler");

exports.renderHomePage = asyncHandler(async (req, res, next) => {
  res.render("home", {
    activePage: "homePage",
    title: "MyHome",
    loggedIn: req.user,
  });
});
