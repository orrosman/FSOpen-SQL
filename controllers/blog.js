const router = require('express').Router();
const { Blog } = require('../models');

router.get('/', async (req, res, next) => {
	try {
		const blogs = await Blog.findAll();
		res.json(blogs);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const blog = req.body;
		const response = await Blog.build(blog).save();
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
		const response = await Blog.destroy({ where: { id: blogID } });
		res.json(response);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
