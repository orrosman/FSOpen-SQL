const express = require('express');
const app = express();

const { PORT } = require('./utils/config');
const { connectToDatabase } = require('./utils/db');

const blogsRouter = require('./controllers/blog');
const usersRouter = require('./controllers/user');

const blogsMiddleware = require('./middlewares/blog');

app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use(blogsMiddleware);

app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
