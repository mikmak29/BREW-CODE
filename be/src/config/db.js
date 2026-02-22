import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URI);
		console.log(`DB connected succesfully at ${mongoose.connection.db.databaseName}`);
	} catch (error) {
		throw new Error({ message: "Database failed to run." });
	}
};

export default connectDB;
