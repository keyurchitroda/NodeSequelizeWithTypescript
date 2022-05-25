"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("category", [
      {
        category_name: "Electronics",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: "Toys",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("category", null, {});
  },
};
