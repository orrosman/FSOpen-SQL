const { validateToken } = require('../utils/token');
const { User } = require('../models');

const auth = async (req, res, next) => {
	try {
		const isValid = validateToken(req.headers['authorization'].split(' ')[1]);
		if (isValid) {
			const user = await User.findOne({ where: { username: isValid } });
			req.user = { id: user.id, username: user.username };
			next();
		} else {
			res.status(403).send('token is invalid');
		}
	} catch (error) {
		res.status(403).send('token is missing');
	}
};
module.exports = auth;
