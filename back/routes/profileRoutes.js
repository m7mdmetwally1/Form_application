const express = require("express");
const router = express.Router();

const profileController = require("./../controllers/profileController");
const authController = require("./../controllers/authController");

router.use(profileController.protect);

router.route("/upload").post(profileController.uploadPhoto);
router.route("/:id").patch(profileController.updateProfile);

module.exports = router;
