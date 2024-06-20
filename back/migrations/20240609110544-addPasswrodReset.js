"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "expiresResetToken", {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn("users", "passwordResetToken", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "passwordResetToken");
    await queryInterface.removeColumn("users", "expiresResetToken");
  },
};
