const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error(err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/userModel')(sequelize, DataTypes);
db.match = require('../models/matchModel')(sequelize, DataTypes);

// Definisi relasi
db.users.hasMany(db.match, { foreignKey: 'user_1', as: 'matches1' });
db.users.hasMany(db.match, { foreignKey: 'user_2', as: 'matches2' });
db.match.belongsTo(db.users, { foreignKey: 'user_1', as: 'userOne' });
db.match.belongsTo(db.users, { foreignKey: 'user_2', as: 'userTwo' });

module.exports = db;