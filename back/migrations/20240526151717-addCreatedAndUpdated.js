"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("profiles", "createdAt", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addColumn("profiles", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("profiles", "createdAt");
    await queryInterface.removeColumn("profiles", "updatedAt");
  },
};
