const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	development: {
		username: process.env.DB_ID,
		password: process.env.DB_PW,
		database: 'HARP_V2',
		host: process.env.DB_POST,
		port: process.env.DB_PORT,
		dialect: 'mysql',
	},
	test: {
		username: process.env.DB_ID,
		password: process.env.DB_PW,
		database: 'HARP_V2',
		host: process.env.DB_POST,
		port: process.env.DB_PORT,
		dialect: 'mysql',
		logging: false
	},
	production: {
		username: process.env.DB_ID,
		password: process.env.DB_PW,
		database: 'HARP_V2',
		host: process.env.DB_POST,
		port: process.env.DB_PORT,
		dialect: 'mysql',
		logging: false
	},
};
