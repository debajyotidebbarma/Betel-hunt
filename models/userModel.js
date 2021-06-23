const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
    trim: true,
  },
  contact: {
    type: [Number],
  },
  role: {
    type: String,
    default: "user",
    enum: {
      values: ["admin", "branch-manager", "user"],
      message: "Invalid role",
    },
  },
  branch: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password required"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      //This only works on SAVE
      validator: function (el) {
        return this.password === el;
      },
      message: "passwords does not match",
    },
    select: false,
  },
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
