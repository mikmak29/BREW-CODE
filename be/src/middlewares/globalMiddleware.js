import STATUS_CODE from "../constants/statusCode/STATUS_CODE.js";

const globalMiddleware = (error, req, res, next) => {
	const statusCode = error.statusCode || error.authStatusCode || 500;
	const errorTitle = STATUS_CODE[statusCode];

	res.status(statusCode).json({
		status: statusCode,
		errorTitle: errorTitle.title,
		details: {
			errorMessage: error.message,
			errorPath: error.errorPath,
		},
	});
};

export default globalMiddleware;
