const express = require('express');
const app = express();

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');

const blogsRouter = require('./controllers/blog');

const blogsMiddleware = require('./middlewares/blog');

app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use(blogsMiddleware);

app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
