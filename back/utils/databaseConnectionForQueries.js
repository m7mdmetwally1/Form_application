const { Sequelize, DataTypes } = require("sequelize");

const dbName = process.env.DATABASE_NAME;
const userName = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;

const sequelize = new Sequelize(dbName, userName, password, {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
