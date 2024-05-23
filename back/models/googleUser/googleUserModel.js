const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/databaseConnectionForQueries");

const googleUser = sequelize.define("googleUser", {
  provider: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

sequelize.sync();

module.exports = googleUser;
