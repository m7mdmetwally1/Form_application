const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oidc");
// const session = require("express-session");
const bodyParser = require("body-parser");
// const googleRoutes = require("./routes/googleRoutes");

const userRoutes = require("./routes/userRoues");
const profileRoutes = require("./routes/profileRoutes");
require("./utils/passportSetup");

const app = express();

app.use("/uploads", express.static("uploads"));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.json({ limit: "10kb" }));

app.use(cors());
app.options("*", cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/profiles", profileRoutes);

// app.use("/api/v1/users", googleRoutes);

module.exports = app;

// app.get("/", async (req, res) => {
//   const { data, error } = await resend.emails.send({
//     from: "no-reply@metwallydev.shop",
//     to: ["agemy844@gmail.com"],
//     subject: "hello world",
//     html: "<strong>it works!</strong>",
//   });

//   if (error) {
//     return res.status(400).json({ error });
//   }

//   res.status(200).json({ data });
// });
