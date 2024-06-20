const express = require("express");

const router = express.Router();

const authFacebook = require("./../controllers/authFacebook");

// router.route("/register").get(authGoogle.register);

router.route("/signup").get(authFacebook.signup);
router.route("/callback").get(authFacebook.callback);

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
router.route("/login").get(authFacebook.login);

module.exports = router;
