const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./../models/user/userModel");
const catchAsync = require("../utils/catchAsync");
const Email = require("./../utils/email");

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
  console.log("in signup");
  const otpCode = generateRandomNumber();

  const otpExpiration = new Date(Date.now() + 10 * 60 * 1000);

  const newUser = await User.create({
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

  console.log("in signup");

  await new Email(newUser, otpCode).sendWelcome();

  createSendToken(newUser, 201, otpCode, otpExpiration, req, res);
});

exports.checkOtp = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const email = req.body.email;
  const otpNumber = req.body.otpNumber;

  const user = await User.findOne({
    where: { email: email, otp_Code: otpNumber },
  });

  if (!user) {
    console.log("will be handled");
    return;
  }
  console.log(user);

  const otpExpired = new Date() > new Date(user.otp_expiration);

  if (otpExpired) {
    console.log("will be handled also expiration");
    return;
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
    res.status(200).json({
      status: "will be handled",
    });
  }

  if (user && !user.isVerified) {
    try {
      const otpCode = generateRandomNumber();
      await User.update({ otp_Code: otpCode }, { where: { email: email } });

      await new Email(user, user.otp_Code).sendWelcome();

      res.status(201).json({
        status: "notverifed",
        data: {
          user,
        },
      });
    } catch {
      console.log("error");
    }
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      status: "no email",
    });
  }

  const user = await User.findOne({ where: { email: email } });

  console.log(email);
  console.log(user);
  console.log(user.password);
  console.log(password);

  const authenticated = await bcrypt.compare(password, user.password);

  if (!user || !authenticated) {
    res.status(400).json({
      status: "incorrect email or password ",
    });
  }

  createSendToken(user, 200, "", "", req, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  const otpCode = generateRandomNumber();

  if (!user) {
    console.log("no user");
    res.status(200).json({
      status: "fail",
      message: "no user",
    });
  }

  try {
    await new Email(user, otpCode).sendWelcome();

    console.log(otpCode);
    console.log("before res");

    res.status(200).json({
      status: "success",
      otpCode,
    });
  } catch (err) {
    console.log("error");

    res.status(200).json({
      status: "eror",
      message: "",
    });
  }
});
