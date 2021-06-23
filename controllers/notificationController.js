const catchAsync = require("../utils/catchAsync");
// const Branch = require("../models/branchModel");
const cust = require("../models/customerUserModel");
const notification = require("../models/notificationModel");

exports.getNotifications = catchAsync(async (req, res, next) => {
  const allNotis = await notification.find();
  allNotis.reverse();
  if (req.user.role === "admin") {
    res.status(200).render("notification", {
      title: "Notifications",
      data: allNotis,
    });
  } else {
    const requiredNotis = [];

    allNotis.forEach((el) => {
      if (el.receiver.includes(req.user._id)) {
        requiredNotis.push(el);
      }
    });

    requiredNotis.reverse();
    res.status(200).render("notification", {
      title: "Notifications",
      data: requiredNotis,
    });
  }
});

exports.getSender = catchAsync(async (req, res, next) => {
  const sender = await cust.find({ _id: req.params.senderID });

  const curNoti = await notification.find({ _id: req.params.notiID });
  await notification.findByIdAndUpdate(req.params.notiID, {
    read_by: [...curNoti[0].read_by, req.user._id],
  });

  res.status(200).render("visitorDetails", {
    title: "visitor details",
    data: sender[0],
  });
});
