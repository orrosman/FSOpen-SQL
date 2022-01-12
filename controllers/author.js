const router = require('express').Router();
const { Blog } = require('../models');
const { Op } = require('sequelize');
const { sequelize } = require('../utils/db');

router.get('/', async (req, res, next) => {
	try {
		const authors = await Blog.findAll({
			attributes: [
				'author',
				[sequelize.fn('COUNT', sequelize.col('title')), 'articles'],
				[sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
			],
			group: 'author',
			order: [[sequelize.col('likes'), 'DESC']],
		});
		res.json(authors);
	} catch (error) {
		next({ error: error.message });
	}
});

module.exports = router;
