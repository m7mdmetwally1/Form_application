// const dotenv = require("dotenv");
// dotenv.config({ path: "./config.env" });

// const passport = require("passport");

// const googleUser = require("./../models/googleUser/googleUserModel");
// const GoogleStrategy = require("passport-google-oauth2").Strategy;

// const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/auth/google/callback",
//       passReqToCallback: true,
//     },
//     function(request, accessToken, refreshToken, profile, done) {
//       return done(null, profile);
//     }
//   )
// );

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });
