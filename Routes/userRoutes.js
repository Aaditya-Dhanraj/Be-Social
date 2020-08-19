const express = require("express");
const authController = require("./../controllers/authcontroller");

const router = express.Router();

//for these four we do not need to log in
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
