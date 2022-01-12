const router = require('express').Router();
const { Blog, User } = require('../models');

router.get('/', async (req, res, next) => {
	try {
		const blogs = await Blog.findAll({
			include: {
				model: User,
				attributes: { exclude: ['password'] },
			},
			nest: true,
			raw: true,
		});
		res.json(blogs);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const blog = req.body;
		const response = await Blog.build({
			...blog,
			userId: req.user.id,
		}).save();
		res.json(response);
	} catch (error) {
		next(error);
	}
});

router.put('/:id', async (req, res, next) => {
	try {
		const blogID = req.params.id;
		const { likes } = req.body;
		const response = await Blog.update(
			{ likes: likes },
			{ where: { id: blogID } }
		);
		res.json(response);
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const blogID = req.params.id;
		const blog = await Blog.findOne({ id: blogID });

		if (blog.userId === req.user.id) {
			const response = await Blog.destroy({ where: { id: blogID } });
			res.json(response);
		} else {
			res.status(403).json("You can't delete a blog that is not yours");
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
