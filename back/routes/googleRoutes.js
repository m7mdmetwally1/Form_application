const express = require("express");

const router = express.Router();

const authGoogle = require("./../controllers/authGoogle");

router.route("/register").get(authGoogle.register);
router.route("/callback").get(authGoogle.callback);

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
router.route("/protected").get(authGoogle.login);

module.exports = router;
