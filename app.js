const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./Routes/userRoutes");
const viewsRoutes = require("./Routes/viewsRoutes");
const morgan = require("morgan");
const AppError = require("./utils/appError");
// const rateLimit = require('express-rate-limit');
const app = express();

// development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// Routes
app.use("/", viewsRoutes);
app.use("/api/v1/users", userRoutes);

// If not handled by any other middleware then it dosent exist handler
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
// app.use(globalErrorHandler);

module.exports = app;
