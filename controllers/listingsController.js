const asyncHandler = require("express-async-handler");
const Listing = require("../models/Listing");
const User = require("../models/User");
const passport = require("passport");
const { prependOnceListener } = require("../models/Listing");
const { renderHomePage } = require("./renderPages");
exports.getListings = asyncHandler(async (req, res, next) => {
  const listing = await Listing.find();
  res.render("listing", {
    title: "Listing",
    listing: listing ? listing : "",
    activePage: "listing",
    loggedIn: req.user,
  });
});
exports.getListingDetails = asyncHandler(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  res.render("singleListing", {
    title: "Listing Details",
    listing,
    activePage: " ",
    loggedIn: req.user,
  });
});
exports.createListing = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  await Listing.create(req.body);
  console.log(req.body);
  req.flash("success_msg", "List  was created successfully");
  res.redirect("/profile");
  // const listing = await Listing.find()
  // res.render('profile',{
  //     activePage:'profile',
  //     loggedIn:req.user,
  //     listing,
  //     user:req.user

  // })
});
exports.updateListing = asyncHandler(async (req, res, next) => {
  let FormData = req.body.data.body;
  let valuesToUpdate = {};
  FormData.forEach((element) => {
    Object.assign(valuesToUpdate, Home(element.name, element.value)); //propertyType: rent
  });
  console.log(valuesToUpdate);

  console.log(req.query);
  const listing = await Listing.findByIdAndUpdate(
    req.query.id,
    valuesToUpdate,
    {
      new: true,
      runValidators: true,
    }
  );
  req.flash("success_msg", "Listing updated successfully");
  res.json({ sucess: true, data: req.body });
});
exports.deleteListing = asyncHandler(async (req, res, next) => {
  console.log(req.query.id);
  await Listing.findByIdAndDelete(req.query.id);
  req.flash("success_msg", "Listing removed successfully");
  res.json({ sucess: true });
});
function Home(key, value) {
  let object = {
    [key]: value,
  };

  return object;
}
