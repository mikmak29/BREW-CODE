import z from "zod";

import USER_CHAR from "../constants/schemaChar/USER_CHAR.js";

const { fullName, email, password } = USER_CHAR;

const userSignupValidator = z.object({
	fullName: z.string().min(fullName.MIN, { message: "Minimum name: 2 Characters" }).max(fullName.MAX, { message: "Minimum name: 54 Characters" }),
	email: z.string().email({ message: "Invalid email" }).max(email.MAX, { message: "Maximum email: 30 Characters" }),
	password: z.string().min(password.MIN, { message: "Minimum password: 4 Characters" }).max(password.MAX, { message: "Maximum password: 40 Characters " }),
	agreeTerms: z.literal(true, { message: "You must agree to the terms" }),
});

export default userSignupValidator;
