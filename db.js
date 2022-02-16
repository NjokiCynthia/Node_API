require('dotenv').config();
const { Sequelize } = require('sequelize');
const configs = require('./config.json');

const sequelize = new Sequelize(
	process.env.DB_NAME || configs.database.database,
	process.env.DB_USER || configs.database.user,
	process.env.DB_USER ? process.env.DB_PASSWORD : configs.database.password,
	{
		host: 'localhost',
		dialect: 'mysql' /* 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
	}
);

(async () => {
	try {
		await sequelize.authenticate();
		console.log('💾 Database connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();

// Create Models
const { TaskModel } = require('./models/Task');
const Task = TaskModel(sequelize);

const { UserModel } = require('./models/User');
const User = UserModel(sequelize);

const migrateDb = process.env.MIGRATE_DB || configs.database.migrate;
if ( migrateDb == 'TRUE') {
	sequelize.sync().then(() => {
		console.log(`All tables synced!`);
		process.exit(0);
	});
}

module.exports = {
	Task,
	User,
};
