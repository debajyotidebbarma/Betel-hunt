const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
const User = require("../models/userModel");
const branch = require("../models/branchModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connnection successful");
  });

//READ JSON FILE
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const branchData = JSON.parse(
  fs.readFileSync(`${__dirname}/branchData.json`, "utf-8")
);

// IMPPORT DATA INTO DB

const importUserData = async () => {
  try {
    await User.create(users, { validateBeforeSave: false });
    console.log("user Data Successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const importBranchData = async () => {
  try {
    await branch.create(branchData);
    console.log("Branch Data Successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE ALL DATA FROM DB

const deleteData = async () => {
  try {
    await User.deleteMany();
    await branch.deleteMany();
    console.log("Data Successfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--importUsers") {
  importUserData();
} else if (process.argv[2] === "--importBranch") {
  importBranchData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
