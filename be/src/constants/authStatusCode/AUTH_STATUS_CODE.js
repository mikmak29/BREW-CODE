const AUTH_STATUS_CODE = {
	"jwt malformed": {
		message: "Token malformed",
		status: 400,
	},
	"jwt expired": {
		message: "Token expired",
		status: 401,
	},
};

export default AUTH_STATUS_CODE;
