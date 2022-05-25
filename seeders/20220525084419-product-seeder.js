"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Product", [
      {
        category_id: 1,
        product_name: "TV",
        product_description: "amazing TV",
        available_qty: 10,
        qty: 1,
        price: 10000,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_id: 2,
        product_name: "Car",
        product_description: "amazing Car",
        available_qty: 10,
        qty: 1,
        price: 500,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Product", null, {});
  },
};
