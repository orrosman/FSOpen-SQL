const blogsMiddleware = async (error, req, res, next) => {
	res.status(404).send(error);
};
module.exports = blogsMiddleware;
