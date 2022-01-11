require('dotenv').config();

module.exports = {
	DATABASE_URL: process.env.DATABASE_URL,
	PORT: process.env.PORT || 3001,
	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
};
