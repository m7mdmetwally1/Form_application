"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the 'Users' table if it exists
    await queryInterface.dropTable("Users");

    // Recreate the 'Users' table with the schema defined by the 'User' model
    await queryInterface.createTable("Users", {
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the 'Users' table if it was recreated
    await queryInterface.dropTable("Users");
  },
};
