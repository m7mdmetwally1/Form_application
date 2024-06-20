const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const User = require("./../models/user/userModel");
const catchAsync = require("../utils/catchAsync");
const Profile = require("../models/profile/profile");
const AppError = require("./../utils/appError");

exports.updateProfile = catchAsync(async (req, res, next) => {
  const [profile, created] = await Profile.findOrCreate({
    where: {
      fullNameArabic: req.body.fullNameArabic,
      address: req.body.address,
    },
    defaults: {
      city: req.body.city,
      nationality: req.body.nationality,
      fullNameEnglish: req.body.fullNameEnglish,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      kind: req.body.kind,
      country: req.body.country,
      dataOfBirth: req.body.dataOfBirth,
      introduceMySelf: req.body.introduceMySelf,
      socialMediaLinks: req.body.socialMediaLinks,
    },
  });

  if (!created) {
    await Profile.update(req.body, {
      where: {
        fullNameArabic: req.body.fullNameArabic,
      },
    });
  }

  res.status(200).json({
    status: "success",
    profile,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findByPk(decoded.id);

  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  next();
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

exports.uploadPhoto = upload.single("file");

//   try {
//     res.send({
//       status: "success",
//       message: "File uploaded successfully",
//       file: req.file,
//     });
//   } catch (error) {
//     res.status(400).send({
//       status: "failure",
//       message: "Failed to upload file",
//       error: error.message,
//     });
//   }
// });
