import Sequelize from 'sequelize';

const sequelize = new Sequelize({
  username: 'root',
  password: 'ed021283',
  database: 'next-hub',
  host: 'localhost',
  dialect: 'mysql',
});

const queryInterface = sequelize.getQueryInterface();

const notificationTable = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      notificationType: {
        type: Sequelize.STRING,
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
            msg: 'Error: Not a valid url',
          },
          notEmpty: {
            msg: 'Error: Video url can not be empty',
          },
          notNull: {
            msg: 'Error: Video url can not be null',
          },
        },
      },
      secureUrl: {
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
    await queryInterface.dropTable('Notifications');
  },
};

notificationTable.up(queryInterface, Sequelize);
