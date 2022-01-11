const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET } = require('./config');

const createAccessToken = (user) => {
	return jwt.sign(user, ACCESS_TOKEN_SECRET);
};

const validateToken = (token) => {
	try {
		return jwt.verify(token, ACCESS_TOKEN_SECRET);
	} catch {
		return false;
	}
};

module.exports = { createAccessToken, validateToken };
