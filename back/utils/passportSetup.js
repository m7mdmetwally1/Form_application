const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth2").Strategy;
const googleUser = require("../models/googleUser/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/v1/authGoogle/callback",
    },
    async function(accessToken, refreshToken, profile, cb) {
      const [user, status] = await googleUser.findOrCreate({
        where: {
          social_user_id: profile.id,
          name: profile.displayName,
          registration_type: "google",
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

module.exports = passport;
