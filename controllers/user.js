const router = require('express').Router();
const { User } = require('../models');
const { encryptPassword } = require('../utils/user');

router.post('/', async (req, res, next) => {
	try {
		const encryptedPassword = await encryptPassword(req.body.password);
		const user = {
			name: req.body.name,
			username: req.body.username,
			password: encryptedPassword,
		};
		const response = await User.build(user).save();
		res.json(response);
	} catch (error) {
		next({ error: error.message });
	}
});

router.get('/', async (req, res, next) => {
	try {
		const users = await User.findAll();
		res.json(users);
	} catch (error) {
		next({ error: error.message });
	}
});

router.put('/:username', async (req, res, next) => {
	try {
		const { username } = req.params;
		const { new_username } = req.body;
		const response = await User.update(
			{ username: new_username },
			{ where: { username: username } }
		);
		res.json(response);
	} catch (error) {
		next({ error: error.message });
	}
});

module.exports = router;
