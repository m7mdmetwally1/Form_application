const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
const crypto = require("crypto");
const sequelize = require("../../utils/databaseConnectionForQueries");

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordConfirm: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isSameAsPassword(value) {
        if (value !== this.password) {
          throw new Error("Password confirmation does not match password");
        }
      },
    },
  },
  acceptTerms: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [10, 15],
    },
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  otpMethod: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["mobile", "email"]],
    },
  },
  otp_Code: {
    type: String,
    allowNull: true,
  },
  otp_expiration: {
    type: Date,
    required: false,
  },

  isVerified: {
    type: DataTypes.BOOLEAN,
    required: false,
  },
  passwordResetToken: DataTypes.STRING,
  expiresResetToken: DataTypes.DATE,
});

User.prototype.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.expiresResetToken = Date.now() + 1 * 60 * 1000;

  return resetToken;
};

User.prototype.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

User.beforeCreate((user, options) => {
  return bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
    })
    .catch((err) => {
      throw new Error();
    });
});

sequelize.sync();

module.exports = User;
