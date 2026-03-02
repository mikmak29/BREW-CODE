import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		agreeTerms: {
			type: Boolean,
			required: true,
		},
		role: {
			type: String,
			enum: ["customer", "admin"],
			default: "customer",
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

userSchema.index({ email: 1, createdAt: -1 });

export default mongoose.models.User || mongoose.model("User", userSchema, "brew-code");
