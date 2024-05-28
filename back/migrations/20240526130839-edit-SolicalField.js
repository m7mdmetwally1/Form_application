"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("profiles", "socialMediaLinks", {
      type: Sequelize.JSON,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("profiles", "socialMediaLinks", {
      type: Sequelize.JSON,
    });
  },
};
