const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	development: {
		username: process.env.DB_ID,
		password: process.env.DB_PW,
		database: 'MemoryBread',
		host: process.env.DB_POST,
		port: process.env.DB_PORT,
		dialect: 'mysql',
	},
	test: {
		username: process.env.DB_ID,
		password: process.env.DB_PW,
		database: 'MemoryBread',
		host: process.env.DB_POST,
		port: process.env.DB_PORT,
		dialect: 'mysql',
	},
	production: {
		username: process.env.DB_ID,
		password: process.env.DB_PW,
		database: 'MemoryBread',
		host: process.env.DB_POST,
		port: process.env.DB_PORT,
		dialect: 'mysql',
	},
};
