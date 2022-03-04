const asyncHandler = require("express-async-handler");

const pagesErrorHandler = asyncHandler(async (req, res, next) => {
  res.render("404", {
    title: "Error Page",
    activePage: "",
    loggedIn: req.user,
    error: "Error 404 Page not found :(",
  });
  next();
});
const errorHandler = asyncHandler(async (err, req, res, next) => {
  console.log(err.stack.name);
  if (err.name == "ValidationError") {
    console.log(err.stack);
    req.flash("error_msg", "Please fill in all fields");
    return res.redirect("/profile");
  }
});

module.exports = { pagesErrorHandler, errorHandler };
