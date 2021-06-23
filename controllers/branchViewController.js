const catchAsync = require("../utils/catchAsync");
const Branch = require("../models/branchModel");
const cust = require("../models/customerUserModel");
const notification = require("../models/notificationModel");

exports.searchPage = catchAsync(async (req, res, next) => {
  res.status(200).render("searchPage", {
    title: "search Betel",
  });
});
exports.frontPage = catchAsync(async (req, res, next) => {
  res.status(200).render("base", {
    title: "welcome",
  });
});

exports.getAllData = catchAsync(async (req, res, next) => {
  if (req.user.role === "admin") {
    const allbranch = await Branch.find().populate({ path: "BranchIncharge" });
    res.status(200).render("allBranch", {
      title: "All Branches",
      data: allbranch,
    });
  }
  if (req.user.role === "branch-manager") {
    const mybranch = await Branch.find({
      BranchIncharge: req.user._id,
    }).populate({ path: "BranchIncharge" });
    res.status(200).render("allBranch", {
      title: "My Branch",
      data: mybranch,
    });
  }
});

exports.loginPage = catchAsync(async (req, res, next) => {
  res.status(200).render("login", {
    title: "Login",
  });
});

//SEND NOTIFICATION

const sendNotification = async (branches, senderID, message) => {
  if (branches.length > 0) {
    const allBMids = [];
    branches.forEach((el) => allBMids.push(el.BranchIncharge._id));

    await notification.create({
      sender: senderID,
      receiver: allBMids,
      message,
    });
  } else {
    await notification.create({
      sender: senderID,
      message,
    });
  }
};

//Search Branch
let foundBranch = [];
exports.searchBranch = catchAsync(async (req, res, next) => {
  foundBranch = [];
  const allbranches = await Branch.find().populate({ path: "BranchIncharge" });
  allbranches.forEach((el) => {
    if (el.pincodes.includes(req.body.pincode)) {
      foundBranch.push(el);
    }
  });

  let custCreated;
  if (foundBranch.length > 0) {
    const visitor = await cust.find({ email: req.body.email });
    if (visitor.length === 0)
      custCreated = await cust.create({
        name: req.body.name,
        email: req.body.email,
      });
    else {
      custCreated = visitor[0];
    }
    const message = `${req.body.name} searched for pin-${req.body.pincode} which comes under your jurisdiction.`;
    await sendNotification(foundBranch, custCreated._id, message);
  } else {
    const visitor = await cust.find({ email: req.body.email });
    if (visitor.length === 0)
      custCreated = await cust.create({
        name: req.body.name,
        email: req.body.email,
      });
    else {
      custCreated = visitor[0];
    }
    const message = `${req.body.name} searched for pin-${req.body.pincode} which doesn't include any available branch`;
    await sendNotification(foundBranch, custCreated._id, message);
  }

  res.status(200).json({
    status: "success",
  });
});

//SEARCH RESULT
exports.searchResult = catchAsync(async (req, res, next) => {
  let found = false;
  if (foundBranch.length > 0) found = true;
  res.status(200).render("searchResult", {
    title: "Find Branch",
    data: foundBranch,
    found,
  });
});
