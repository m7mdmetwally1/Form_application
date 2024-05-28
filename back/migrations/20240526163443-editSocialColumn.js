"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("profiles", "introduceMySelf", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("profiles", "introduceMySelf", {
      type: Sequelize.BOOLEAN,
    });
  },
};
