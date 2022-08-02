'use-strict';
// Note: seeder and migration does not work anymore with ES6 modules,sequelize cli support only commonjs module

import Sequelize from 'sequelize';
import Notification from './notification.mjs';
import Category from './category.mjs';
import User from './user.mjs';
import Video from './video.mjs';
import database from '../database.mjs';
const env = process.env.NODE_ENV || 'development';
const config = database[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

db.User = User(sequelize, Sequelize.DataTypes);
db.Category = Category(sequelize, Sequelize.DataTypes);
db.Notification = Notification(sequelize, Sequelize.DataTypes);
db.Video = Video(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Set sync to force to setup relations
// sequelize
//   .sync({ force: true, alter: false })
//   .then(() => {
//     console.log('Database connected');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

export default db;
