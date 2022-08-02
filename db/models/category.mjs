'use strict';
import sequelize from 'sequelize';

const Model = sequelize.Model;

export default (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {}
  }

  Category.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'Category',
    }
  );

  return Category;
};
