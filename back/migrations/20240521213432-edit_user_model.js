"use strict";

const { boolean } = require("joi");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");

    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      passwordConfirm: {
        type: Sequelize.STRING,
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
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isNumeric: true,
          len: [10, 15],
        },
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      otpMethod: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [["mobile", "email"]],
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      otp_Code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      otp_expiration: {
        type: Sequelize.DATE,
        required: false,
      },

      isVerified: {
        type: Sequelize.BOOLEAN,
        required: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
