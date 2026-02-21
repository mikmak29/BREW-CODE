import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import asyncErrorHandler from "express-async-handler";
import express from "express";
import morgan from "morgan";

import { v4 as uuidv4 } from "uuid";

import productRoute from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(
	cors({
		origin: ["http://127.0.0.1:5500", "http://localhost:127.0.0.1:5500]"],
		methods: ["POST", "GET", "PUT", "DELETE"],
		allowedHeaders: "*",
	}),
);
app.use(morgan("dev"));
app.use(express.json());
app.use(compression());

app.use("/api/product", productRoute);

const serverStarter = asyncErrorHandler(async () => {
	console.log(uuidv4());
	app.listen(PORT, () => {
		console.log(`Server listening at port ${PORT}`);
	});
});

serverStarter();
