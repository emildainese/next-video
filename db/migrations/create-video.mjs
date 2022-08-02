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

const videoTable = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Videos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      privacy: {
        type: Sequelize.ENUM,
        values: ['private', 'public'],
        defaultValue: 'private',
      },
      fileSize: {
        type: Sequelize.DOUBLE,
      },
      originalFileName: {
        type: Sequelize.STRING,
      },
      uploadedBy: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.DOUBLE,
      },
      format: {
        type: Sequelize.STRING,
      },
      height: {
        type: Sequelize.INTEGER,
      },
      width: {
        type: Sequelize.INTEGER,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
          as: 'categoryId',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          as: 'userId',
        },
      },
      batchId: {
        type: Sequelize.STRING,
      },
      assetId: {
        type: Sequelize.STRING,
      },
      publicId: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isUrl: {
            msg: 'Error: Invalid video url',
          },
          notEmpty: {
            msg: 'Error: Video url can not be empty',
          },
          notNull: {
            msg: 'Error: Video url can not be null',
          },
        },
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
    await queryInterface.dropTable('Videos');
  },
};

videoTable.up(queryInterface, Sequelize);
