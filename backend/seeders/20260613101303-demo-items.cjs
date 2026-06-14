'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Items', [
      {
        id: 'b1b2c3d4-0000-0000-0000-000000000001',
        name: 'Mechanical Keyboard',
        description: 'Tactile switches, RGB backlight, full layout.',
        price: 89.99,
        stock: 25,
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b1b2c3d4-0000-0000-0000-000000000002',
        name: 'Wireless Mouse',
        description: 'Ergonomic design, 3-month battery life.',
        price: 49.99,
        stock: 40,
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b1b2c3d4-0000-0000-0000-000000000003',
        name: 'USB-C Hub 7-in-1',
        description: 'HDMI, USB-A x3, SD card, PD charging.',
        price: 34.99,
        stock: 15,
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b1b2c3d4-0000-0000-0000-000000000004',
        name: 'Monitor Stand',
        description: 'Adjustable height, cable management, aluminum.',
        price: 59.99,
        stock: 3,
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Items', {
      id: [
        'b1b2c3d4-0000-0000-0000-000000000001',
        'b1b2c3d4-0000-0000-0000-000000000002',
        'b1b2c3d4-0000-0000-0000-000000000003',
        'b1b2c3d4-0000-0000-0000-000000000004',
      ],
    });
  },
};
