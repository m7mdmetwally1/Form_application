const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("./../models/user/userModel");
const catchAsync = require("../utils/catchAsync");
const Email = require("./../utils/email");
const AppError = require("./../utils/appError");
const exp = require("constants");
const { where } = require("sequelize");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const generateRandomNumber = () => {
  const seq = (Math.floor(Math.random() * 10000) + 10000)
    .toString()
    .substring(1);

  return seq;
};

const createSendToken = (
  user,
  statusCode,
  otpNumber,
  otpExpiration,
  req,
  res
) => {
  const token = signToken(user.id);

  user.password = undefined;
  user.passwordConfirm = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
      otpNumber: otpNumber,
      otpExpiration: otpExpiration,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const otpCode = generateRandomNumber();

  const otpExpiration = new Date(Date.now() + 1 * 60 * 1000);

  let user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    await User.update(
      {
        otp_expiration: otpExpiration,
      },
      {
        where: {
          email: req.body.email,
        },
      }
    );
  }

  if (!user) {
    user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      acceptTerms: req.body.acceptTerms,
      mobile: req.body.mobile,
      otpMethod: req.body.otpMethod,
      country: req.body.country,
      otp_expiration: otpExpiration,
      otp_Code: otpCode,
    });
  }

  const urlCheck = process.env.URL_CHECK;

  await new Email(user, { otpCode: otpCode, url: urlCheck }).sendWelcome();

  createSendToken(user, 201, otpCode, otpExpiration, req, res);
});

exports.checkOtp = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const otpNumber = req.body.otpNumber;

  const user = await User.findOne({
    where: { email: email, otp_Code: otpNumber },
  });

  if (!user) {
    next(new AppError("incorrect otp or email not correct", 500));
  }

  const expired = Date.now() > user.otp_expiration.getTime();

  if (expired) {
    return next(new AppError("this otpNumber has been expired try again", 500));
  }

  await User.update({ isVerified: true }, { where: { email: email } });

  const updatedData = await User.findOne({
    where: {
      email: email,
    },
  });

  res.status(201).json({
    status: "success",
    createdUser: updatedData,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const email = req.body.email;

  if (req.body.otpNumber) {
    next();
  }

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    next();
  }

  if (user && user.isVerified) {
    return next(new AppError("email already exists and verified ", 400));
  }

  if (user && !user.isVerified) {
    return next(
      new AppError(
        "we sent you otp to your email check to verify your email",
        400
      )
    );
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  const user = await User.findOne({ where: { email: email } });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, "", "", req, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  const resetToken = user.createPasswordResetToken();

  const resetURL = `http://localhost:4200/auth/resetPassword/${resetToken}`;

  await user.save();

  try {
    await new Email(user, { url: resetURL }).sendPasswordReset();

    res.status(200).json({
      resetToken,
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
  });
  console.log(user);

  console.log(Date.now() + 0 * 60 * 1000);
  console.log(user.passwordResetExpires);

  if (Date.now() + 0 * 60 * 1000 > user.passwordResetExpires) {
    console.log("in error");
    return next(new AppError("Token is   has expired", 400));
  }

  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  user.password = req.body.password;
  user.passwordConfirm = undefined;

  createSendToken(user, 200, "", "", req, res);
});

exports.resetOtp = catchAsync(async (req, res, next) => {
  console.log("check");
  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) {
    return next(new AppError("try register again", 400));
  }

  const urlCheck = process.env.URL_CHECK;

  const otpCode = generateRandomNumber();
  const otpExpiration = new Date(Date.now() + 1 * 60 * 1000);

  await User.update(
    { otp_Code: otpCode, otp_expiration: otpExpiration },
    { where: { email: req.body.email } }
  );

  await new Email(user, { otpCode: otpCode, url: urlCheck }).sendWelcome();

  res.status(201).json({
    status: "success",
  });
});
