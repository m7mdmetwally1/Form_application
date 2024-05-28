const passport = require("./../utils/passportSetup");
const jwt = require("jsonwebtoken");

// const { signToken } = require("./../controllers/authController");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.createSendToken = (req, res, user) => {
  const token = signToken(user.id);

  res.redirect(`http://localhost:4200/auth/login?token=${token}`);
};

exports.register = (req, res, next) => {
  //   const redirectUrl = `http://localhost:3000/api/v1/authGoogle/signup`;
  console.log("in register");
  res.redirect("/api/v1/authGoogle/signup");
};

exports.signup = (req, res, next) => {
  console.log("in signup");
  passport.authenticate("google", { scope: ["email", "profile"] })(
    req,
    res,
    next
  );
};

exports.callback = (req, res, next) => {
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/api/v1/authGoogle/protected",
    failureRedirect: "/auth/google/failure",
  })(req, res, next);
};

exports.login = (req, res) => {
  this.createSendToken(req, res, req.user.id);
};
