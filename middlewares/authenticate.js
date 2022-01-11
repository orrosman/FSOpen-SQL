const { validateToken } = require('../utils/token');
const { User } = require('../models');

const auth = async (req, res, next) => {
	try {
		const isValid = validateToken(req.headers['authorization'].split(' ')[1]);
		if (isValid) {
			req.userId = (await User.findOne({ where: { username: isValid } })).id;
			next();
		} else {
			res.status(403).send('token is invalid');
		}
	} catch (error) {
		res.status(403).send('token is missing');
	}
};
module.exports = auth;
