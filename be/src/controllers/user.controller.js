import asyncErrorHandler from "express-async-handler";
import bcrypt from "bcrypt";

import * as userService from "../services/user.service.js";
import ErrorHandler from "../helpers/errorHandler.js";
import { accessToken, refreshToken } from "../utils/accessToken.js";
// import ResponseHandler from "../helpers/responseHandler.js";

export const signupUser = asyncErrorHandler(async (req, res) => {
	const { fullName, email, password, agreeTerms } = req.body;

	if (!fullName || !email || !password || !agreeTerms) {
		ErrorHandler("All fields are required", 400);
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	await userService.signupData({
		fullName,
		email,
		password: hashedPassword,
		agreeTerms,
	});

	res.status(201).json({
		success: true,
		status: 201,
		details: {
			data: null,
			message: "Created successfully",
		},
	});
});

export const loginUser = asyncErrorHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		ErrorHandler("All fields are required", 400);
	}

	const user = await userService.loginData(email);

	if (!user) {
		ErrorHandler("Invalid email or password", 404);
	}

	const matchedPassword = await bcrypt.compare(password, user.password);

	if (!matchedPassword) {
		ErrorHandler("Invalid email or password", 404);
	}

	if (user.role === "admin") {
	}

	const userPayload = {
		fullName: user.fullName,
		email: user.email,
		agreeTerms: user.agreeTerms,
		role: user.role,
	};

	const token = accessToken(userPayload);

	const rfToken = refreshToken(userPayload);

	res.status(200).json({
		success: true,
		status: 200,
		details: {
			data: null,
			token: token,
			rfToken: rfToken,
			message: "Created successfully",
		},
	});
});

export const retrieveUserData = asyncErrorHandler(async (req, res) => {
	const data = req.data;

	if (!data) {
		ErrorHandler("No data found", 404);
	}

	res.status(200).json({
		success: true,
		status: 200,
		details: {
			data,
			message: "Created successfully",
		},
	});
});

export const retrieveAdminData = asyncErrorHandler(async (req, res) => {
	const data = req.data;

	if (!data) {
		ErrorHandler("No data found", 404);
	}

	res.status(200).json({
		success: true,
		status: 200,
		details: {
			data,
			message: "Created successfully",
		},
	});
});
