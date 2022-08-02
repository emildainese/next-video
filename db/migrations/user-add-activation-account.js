'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'status', {
        type: Sequelize.ENUM,
        values: ['pending', 'active'],
        defaultValue: 'pending',
      }),
      queryInterface.addColumn('users', 'role', {
        type: Sequelize.ENUM,
        values: ['user', 'admin'],
        defaultValue: 'user',
      }),
      queryInterface.addColumn('users', 'activationToken', {
        type: Sequelize.STRING,
        unique: true,
        notEmpty: true,
        allowNull: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'status'),
      queryInterface.removeColumn('users', 'role'),
      queryInterface.removeColumn('users', 'activationToken'),
    ]);
  },
};
