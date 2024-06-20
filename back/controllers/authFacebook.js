const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const express = require("express");
const dotenv = require("dotenv");
const googleUser = require("../models/googleUser/user");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.createSendToken = (req, res, user) => {
  const token = signToken(user.id);

  res.redirect(`http://localhost:4200/auth/login?token=${token}`);
};

const router = express.Router();
dotenv.config({ path: "./config.env" });

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/api/v1/authFacebook/callback",
    },
    async function(accessToken, refreshToken, profile, cb) {
      const [user, status] = await googleUser.findOrCreate({
        where: {
          social_user_id: profile.id,
          name: profile.displayName,
          registration_type: "facebook",
        },
      });
      cb(null, user);
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

exports.signup = (req, res, next) => {
  passport.authenticate("facebook", { scope: ["email"] })(req, res, next);
};

exports.callback = (req, res, next) => {
  console.log("in call back");
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:3000/api/v1/authFacebook/login",
    failureRedirect: "/auth/google/failure",
  })(req, res, next);
};

exports.login = (req, res) => {
  this.createSendToken(req, res, req.user.id);
};
