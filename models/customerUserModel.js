const mongoose = require("mongoose");
const validator = require("validator");

const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  }
});

const visitor = mongoose.model("Visitor", visitorSchema);
module.exports = visitor;
