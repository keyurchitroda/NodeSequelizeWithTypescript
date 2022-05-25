"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return await queryInterface.bulkInsert("user", [
      {
        firstName: "admin",
        lastName: "duo",
        email: "admin1@gmail.com",
        password: "123123",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "user",
        lastName: "duo",
        email: "user123@gmail.com",
        password: "123123",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("user", null, {});
  },
};
