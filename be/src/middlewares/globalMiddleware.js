const globalMiddleware = (error, req, res, next) => {
	const statusCode = error.statusCode || 500;

	res.status(statusCode).json({
		status: statusCode,
		errorMessage: error.message,
	});
};

export default globalMiddleware;
