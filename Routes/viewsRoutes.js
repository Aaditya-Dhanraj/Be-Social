const express = require("express");
const authController = require("../controllers/authcontroller");

const router = express.Router();

router.get(
  "/signup",
  authController.isLoggedIn,
);
router.get("/login", authController.isLoggedIn);

module.exports = router;
