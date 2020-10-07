/* ONLY FOR MIGRATIONS AND SEEDS */
const {
	join
} = require('path');
require('dotenv').config({
	path: join(__dirname, `${process.argv[2]}`)
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

module.exports = {
	client: 'mssql',
	connection: {
		server: process.env.DB_HOST,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		connectionTimeout: 60000,
		port: parseInt(process.env.DB_PORT),
		options: {
			encrypt: true,
		}
	},
};
