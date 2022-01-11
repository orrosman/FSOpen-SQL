const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
require('dotenv').config();
const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
	query: { raw: true },
});

class Blog extends Model {}
Blog.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		author: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		url: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		likes: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: false,
		modelName: 'blog',
	}
);

app.use(express.json());

app.get('/api/blogs', async (req, res) => {
	const blogs = await Blog.findAll();
	res.json(blogs);
});

app.post('/api/blogs', async (req, res) => {
	try {
		const blog = req.body;
		console.log(blog);
		const response = await Blog.build(blog).save();
		res.json(response);
	} catch (error) {
		return res.status(400).json({ error });
	}
});

app.delete('/api/blogs/:id', async (req, res) => {
	try {
		const blogID = req.params.id;
		const response = await Blog.destroy({ where: { id: blogID } });
		res.json(response);
	} catch (error) {
		return res.status(400).json({ error });
	}
});

app.listen(port, () => {
	console.log(`Server running on ${port}`);
});
