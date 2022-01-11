const router = require('express').Router();
const { Blog } = require('../models');

router.get('/:id', async (req, res) => {
	const blogs = await Blog.findAll();
	res.json(blogs);
});

router.get('/', async (req, res) => {
	const blogs = await Blog.findAll();
	res.json(blogs);
});

router.post('/', async (req, res) => {
	try {
		const blog = req.body;
		const response = await Blog.build(blog).save();
		res.json(response);
	} catch (error) {
		return res.status(400).json({ error });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		console.log(req.blog);
		const blogID = req.params.id;
		const response = await Blog.destroy({ where: { id: blogID } });
		res.json(response);
	} catch (error) {
		return res.status(400).json({ error });
	}
});

module.exports = router;
