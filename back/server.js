const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const dbName = process.env.DATABASE_NAME;
const userName = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;

const sequelize = new Sequelize(dbName, userName, password, {
  dialect: "mysql",
  host: "localhost",
  sync: true,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
