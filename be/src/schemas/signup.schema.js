import z from "zod";
import SIGNUP_CHAR from "../constants/schemaChar/SIGNUP_CHAR.js";

const { fullName, email, password } = SIGNUP_CHAR;

const signupSchema = () => {
	z.object({
		fullName: z.string().min(fullName.MIN).max(fullName.MAX),
		email: z.email().min(email.MIN).max(email.MAX),
		password: z.string().min(password.MIN).max(password.MAX),
	});
};

export default signupSchema;
