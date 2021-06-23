const path = require("path");

const express = require("express");

//start express app
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const AppError = require("./utils/appError");
const viewRouter = require("./Routes/allRoutes");

app.enable("trust proxy");
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// 1.MIDDLEWARES
//Implement cors
app.use(cors());

//Access-control-Allow-Origin *
app.options("*", cors()); //for non simple request like patch,delete,etc

//set security http headers
app.use(helmet());

//Ddevelopment logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Body parser,reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

//serving static files
app.use(express.static(path.join(__dirname, "public")));

//ROUTES
app.use("/", viewRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

//4.START SERVER
module.exports = app;
