const express = require("express");

const router = express.Router();

const profileController = require("./../controllers/profileController");

router.use(profileController.protect);

router.route("/upload").post(profileController.uploadPhoto);
router.route("/:id").patch(profileController.updateProfile);

module.exports = router;
