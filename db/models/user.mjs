'use strict';
import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },
      username: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        notEmpty: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: ['pending', 'active'],
        defaultValue: 'pending',
      },
      role: {
        type: DataTypes.ENUM,
        values: ['user', 'admin'],
        defaultValue: 'user',
      },
      activationToken: {
        type: DataTypes.STRING,
        unique: true,
        notEmpty: true,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'User',
      hooks: {
        beforeCreate: async (user, options) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
        beforeUpdate: async (user, options) => {
          if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

  User.comparePassword = async function (enteredPassword, password) {
    console.log(enteredPassword, password);
    return await bcrypt.compare(enteredPassword, password);
  };

  return User;
};
