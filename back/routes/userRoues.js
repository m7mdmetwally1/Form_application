const express = require("express");
const router = express.Router();

const { validate } = require("./../utils/validate");
const { addUser } = require("./../models/user/userValidation");

const authController = require("./../controllers/authController");

router.post("/checkOtp", authController.checkOtp);
router.post("/login", authController.login);
router.use(authController.protect);
router.post("/signup", validate(addUser), authController.signup);

module.exports = router;
