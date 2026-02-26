import ErrorHandler from "../helpers/errorHandler.js";

const authRole = (...roles) => {
	return (req, res, next) => {
		const { data } = req;

		if (!data?.role || !roles.includes(data.role)) {
			ErrorHandler("Unauthorized", 401);
		}

		req.userData = data;
		next();
	};
};

export default authRole;
