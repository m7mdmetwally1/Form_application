const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/databaseConnectionForQueries");

const Profile = sequelize.define("googleAuth", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  social_user_id: DataTypes.STRING,
  password: DataTypes.STRING,
  registration_type: DataTypes.ENUM("email", "google", "facebook"),
});

sequelize.sync();

module.exports = Profile;
