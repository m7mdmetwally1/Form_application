// const catchAsync = require("../utils/catchAsync");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oidc");
// const googleUser = require("./../models/googleUser/googleUserModel");

// exports.googleSignup = catchAsync(async (req, res, next) => {
//   // Configure Google OAuth strategy
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         callbackURL: "http://localhost:3000/oauth2/redirect/google",
//       },
//       async function(issuer, profile, cb) {
//         try {
//           let credential = await googleUser.findOne({
//             where: { provider: issuer, subject: profile.id },
//           });

//           if (!credential) {
//             // User does not exist, create new user
//             const user = await googleUser.create({ name: profile.displayName });

//             // Create Google federated credential for the user
//             credential = await googleUser.create({
//               userId: user.id,
//               provider: issuer,
//               subject: profile.id,
//             });

//             return cb(null, user);
//           } else {
//             // User exists, fetch user by userId
//             const user = await googleUser.findByPk(credential.userId);
//             return cb(null, user);
//           }
//         } catch (err) {
//           return cb(err);
//         }
//       }
//     )
//   );

//   passport.authenticate("google", { scope: ["profile"] })(req, res, next);
// });

// exports.googleAuthCallback = passport.authenticate("google", {
//   successRedirect: "http://localhost:4200/",
//   failureRedirect: "/login",
// });
