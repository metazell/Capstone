'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if email column already exists
    const tableInfo = await queryInterface.describeTable('Users');
    
    if (!tableInfo.email) {
      await queryInterface.addColumn('Users', 'email', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'email');
  }
};
