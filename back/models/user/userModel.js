const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
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
});

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
