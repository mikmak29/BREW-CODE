import AUTH_STATUS_CODE from "../constants/authStatusCode/AUTH_STATUS_CODE.js";

const jwtErrorHandler = (message) => {
	const errorInfo = AUTH_STATUS_CODE[message];
	const error = new Error(errorInfo.message);
	error.authStatusCode = errorInfo.status;
	throw error;
};

export default jwtErrorHandler;
