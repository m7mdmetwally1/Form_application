const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/databaseConnectionForQueries");

const Profile = sequelize.define("Profile", {
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  nationality: {
    type: DataTypes.STRING,
  },
  kind: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  introduceMySelf: {
    type: DataTypes.STRING,
  },
  dateOfBirth: {
    type: DataTypes.STRING,
  },
  fullNameArabic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullNameEnglish: {
    type: DataTypes.STRING,
  },
  socialMediaLinks: {
    type: DataTypes.JSON,
  },
});

sequelize.sync();

module.exports = Profile;
