import User from "../models/User.js";

export const signupData = async (data) => {
	return await User.create(data);
};

export const loginData = async (email) => {
	return await User.findOne({ email: email });
};

export const isEmailExist = async (email) => {
	return await User.findOne({ email: email });
};
