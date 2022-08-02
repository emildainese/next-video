'use strict';
import Sequelize from 'sequelize';

const sequelize = new Sequelize({
  username: 'root',
  password: 'ed021283',
  database: 'next-hub',
  host: 'localhost',
  dialect: 'mysql',
});

const queryInterface = sequelize.getQueryInterface();

const userTable = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [3, 25],
            msg: 'Username must be at least 3 characters lenght an max 25 character',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
          len: {
            args: [6, 25],
            msg: 'Password must be at least 6 character lenght and max 15 characters',
          },
        },
      },
      profilePic: {
        type: Sequelize.STRING,
        notEmpty: true,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['pending', 'active'],
        defaultValue: 'pending',
      },
      role: {
        type: Sequelize.ENUM,
        values: ['user', 'admin'],
        defaultValue: 'user',
      },
      activationToken: {
        type: Sequelize.STRING,
        unique: true,
        notEmpty: true,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};

userTable.up(queryInterface, Sequelize);
