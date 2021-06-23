const express = require("express");
const branchViewController = require("../controllers/branchViewController");
const userController = require("../controllers/userController");
const notificationController = require("../controllers/notificationController");

const router = express.Router();

router.use(userController.isLoggedin);
//View Routes
router.get("/", branchViewController.frontPage);
router.get("/search", branchViewController.searchPage);
router.get("/login-page", branchViewController.loginPage);

router.get(
  "/all-data",
  userController.protect,
  branchViewController.getAllData
);
router.get("/searchResult", branchViewController.searchResult);

//user API routes
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.post("/search", branchViewController.searchBranch);

//notification routes
router.get("/get-notifications", notificationController.getNotifications);

router.get("/get-sender/:senderID/:notiID", notificationController.getSender);

module.exports = router;
