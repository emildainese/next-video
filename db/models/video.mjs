'use strict';

export default (sequelize, DataTypes) => {
  const Video = sequelize.define(
    'Video',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      fileSize: {
        type: DataTypes.DOUBLE,
      },
      originalFileName: {
        type: DataTypes.STRING,
      },
      uploadedBy: {
        type: DataTypes.STRING,
      },
      privacy: {
        type: DataTypes.ENUM,
        values: ['private', 'public'],
        defaultValue: 'private',
      },
      duration: {
        type: DataTypes.DOUBLE,
      },
      format: {
        type: DataTypes.STRING,
      },
      height: {
        type: DataTypes.INTEGER,
      },
      width: {
        type: DataTypes.INTEGER,
      },
      categoryId: {
        type: DataTypes.INTEGER,
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
        allowNull: false,
        unique: true,
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
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'Video',
      hooks: {},
    }
  );

  return Video;
};
