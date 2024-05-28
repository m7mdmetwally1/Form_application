const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("./../models/user/userModel");
const catchAsync = require("../utils/catchAsync");
const Profile = require("../models/profile/profile");
const path = require("path");

exports.updateProfile = catchAsync(async (req, res, next) => {
  console.log("in signup");

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

  // export interface updateFormDate {
  //   firstName: String;
  //   lastName: String;
  //   nationality: String;
  //   kind: String;
  //   country: String;
  //   city: string;
  //   address: string;
  //   introduceMySelf: boolean;
  //   dateOfBirth: string;
  //   fullNameArabic: string;
  //   fullNameEnglish: string;
  //   socialMediaLinks:{}
  // }

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

  console.log(token);

  if (!token) {
    res.status(200).json({
      status: "no token",
    });
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  console.log("in protect");

  console.log(decoded.id);
  console.log(decoded);

  const currentUser = await User.findByPk(decoded.id);

  if (!currentUser) {
    res.status(200).json({
      status: "no user",
    });
  }

  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError("User recently changed password! Please log in again.", 401)
  //   );
  // }

  // req.user = currentUser;
  // res.locals.user = currentUser;
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
