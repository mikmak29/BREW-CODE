const ResponseHandler = (res, statusCode, message) => {
	return res.status(statusCode).json(message);
};

export default ResponseHandler;
