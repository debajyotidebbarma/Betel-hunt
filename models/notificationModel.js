const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  receiver: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  admin: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: "60cf9272df38e59cbc5b1a80",
  },
  message: String,
  read_by: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const notification = mongoose.model("Notification", notificationSchema);

module.exports = notification;
