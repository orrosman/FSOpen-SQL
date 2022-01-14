const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../utils/db');

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
			allowNull: false,
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
		year: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: {
					args: [1991],
					msg: 'Minimum year is 1991',
				},
				max: {
					args: [new Date().getFullYear()],
					msg: `Maximum year is ${new Date().getFullYear()}`,
				},
				// min: 1991,
				// max: new Date().getFullYear(),
			},
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: true,
		modelName: 'blog',
	}
);

module.exports = Blog;
