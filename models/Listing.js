const mongoose = require("mongoose");

let listingSchema = new mongoose.Schema(
  {
    propertyType: {
      type: String,
      enum: ["House", "Vila", "Compound", "Apartment", "Office", "Commercials"],
      required: [true, "Please fill in this field"],
    },
    propertyFor: {
      type: String,
      enum: ["Sale", "Rent"],
      required: [true, "please fill in this field"],
    },
    propertyPrice: {
      type: Number,
      required: [true, "Pleaes fill in this field"],
    },
    propertySpace: {
      type: Number,
      required: [true, "please fill in this field"],
    },
    propertyAddress: {
      type: String,
      required: [true, "please fill in this field"],
    },
    bedRooms: {
      type: Number,
    },
    bathRooms: {
      type: Number,
    },
    garages: Number,
    description: {
      type: String,
      minlength: [2, "description cannot be less than 2 chars"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", listingSchema);
