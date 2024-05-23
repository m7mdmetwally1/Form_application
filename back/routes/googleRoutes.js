// const express = require("express");

// const router = express.Router();
// const passport = require("passport");

// require("./../utils/passportSetup");
// const authGoogle = require("./../controllers/authGoogle");

// // router.post("/googleRegister", authGoogle.googleSignup);

// router.get("auth/google", authGoogle.register);
// router.get("auth/google/callback", authGoogle.callback);

// function isLoggedIn(req, res, next) {
//   req.user ? next() : res.sendStatus(401);
// }

// router.get("auth/google/protected", isLoggedIn, authGoogle.login);

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/protected",
//     failureRedirect: "/auth/google/failure",
//   })
// );

// app.get("/protected", isLoggedIn, (req, res) => {
//   res.send(`Hello ${req.user.displayName}`);
// });
