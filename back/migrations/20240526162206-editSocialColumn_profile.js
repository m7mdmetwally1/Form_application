"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("profiles", "socialMediaLinks", {
      type: Sequelize.JSON,
    });

    await queryInterface.changeColumn("profiles", "fullNameArabic", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn("profiles", "address", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("profiles", "socialMediaLinks", {
      type: Sequelize.BOOLEAN,
    });

    await queryInterface.changeColumn("profiles", "fullNameArabic", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn("profiles", "address", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
