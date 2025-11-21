const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

// If DATABASE_URL is provided, use it. Otherwise fall back to a local sqlite file for easy development.
const fallbackSqlite = 'sqlite:./dev.sqlite';
const connectionString = databaseUrl || fallbackSqlite;

// Infer dialect from the connection string
let dialect = 'sqlite';
if (connectionString.startsWith('postgres') || connectionString.startsWith('postgresql')) {
  dialect = 'postgres';
}

const sequelize = new Sequelize(connectionString, {
  dialect,
  logging: false,
});

const db = { sequelize };

db.Task = require('./task')(sequelize);

module.exports = db;
