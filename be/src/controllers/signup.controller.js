import asyncErrorHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as signupService from "../services/signup.service.js";
import ErrorHandler from "../helpers/ErrorHandler.js";
import ResponseHandler from "../helpers/ResponseHandler.js";

export const signupUser = asyncErrorHandler(async (req, res) => {
	const { fullName, email, password, agreeTerms } = req.body;

	if (!fullName || !email || !password || !agreeTerms) {
		ErrorHandler("All fields are required", 400);
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	await signupService.signupData({
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
