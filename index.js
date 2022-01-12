const express = require('express');
const app = express();

const { PORT } = require('./utils/config');
const { connectToDatabase } = require('./utils/db');

const blogsRouter = require('./controllers/blog');
const usersRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const authorRouter = require('./controllers/author');

const blogsMiddleware = require('./middlewares/blog');
const auth = require('./middlewares/authenticate');

app.use(express.json());

app.use('/api/blogs', auth, blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorRouter);

app.use(blogsMiddleware);

app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
