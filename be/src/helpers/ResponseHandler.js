const ResponseHandler = (res, success, status, details) => {
	return res.status(status).json({
		success: success,
		status: status,
		details,
	});
};

export default ResponseHandler;
