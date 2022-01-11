const router = require('express').Router();
const { User } = require('../models');
const { decryptPassword } = require('../utils/user');
const { createAccessToken } = require('../utils/token');

router.post('/', async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ where: { username: username } });
		if (user) {
			const isAuth = await decryptPassword(password, user.password);
			if (isAuth) {
				const token = createAccessToken(username);
				res.json({ access_token: token });
			} else {
				res.status(403).json('wrong password');
			}
		} else {
			res.json(`the user '${username}' does not exist`);
		}
	} catch (error) {
		next({ error: error.message });
	}
});

module.exports = router;
