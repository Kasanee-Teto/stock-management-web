'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const hash = (pw) => bcrypt.hashSync(pw, 10);

    await queryInterface.bulkInsert('Users', [
      {
        id: 'a1b2c3d4-0000-0000-0000-000000000001',
        name: 'Admin User',
        email: 'admin@stockify.com',
        password: hash('admin123'),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a1b2c3d4-0000-0000-0000-000000000002',
        name: 'Demo Buyer',
        email: 'buyer@stockify.com',
        password: hash('buyer123'),
        role: 'buyer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', {
      email: ['admin@stockify.com', 'buyer@stockify.com'],
    });
  },
};
