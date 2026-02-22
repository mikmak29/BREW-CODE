import User from "../models/User.js";

export const signupData = async (data) => {
	return await User.create(data);
};
