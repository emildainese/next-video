'use strict';
import User from './user.mjs';

export default (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      notificationType: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.STRING,
      },
      assetId: {
        type: DataTypes.STRING,
      },
      publicId: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isUrl: {
            msg: 'Error: Invalid video url',
          },
          notEmpty: {
            msg: 'Error: Video url can not be empty',
          },
        },
      },
      secureUrl: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isUrl: {
            msg: 'Error: Invalid video url',
          },
          notEmpty: {
            msg: 'Error: Video url can not be empty',
          },
        },
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'Notification',
      hooks: {
        afterCreate: async (notification, options) => {},
      },
    }
  );

  // Notification.belongsTo(User(sequelize, DataTypes), {
  //   foreignKey: 'userId',
  //   allowNull: false,
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // });

  return Notification;
};
