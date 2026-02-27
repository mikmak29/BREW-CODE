const ErrorHandler = (message, statusCode, errorPath = null) => {
	console.log(message);
	const error = new Error(message);
	error.statusCode = statusCode;
	error.errorPath = errorPath;
	throw error;
};

export default ErrorHandler;
