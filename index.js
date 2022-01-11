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
			authenticate: true,
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

const main = async () => {
	try {
		const blogs = await Blog.findAll();
		for (const blog of blogs) {
			console.log(`${blog.author}: ${blog.title}, ${blog.likes} likes`);
		}
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

main();
