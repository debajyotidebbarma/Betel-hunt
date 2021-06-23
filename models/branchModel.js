const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
  branchName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  BranchIncharge: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  pincodes: {
    type: [Number],
  },
});

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;
