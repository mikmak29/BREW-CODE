import asyncErrorHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";

import DATA from "../constants/DATA.js";

export const createData = asyncErrorHandler(async (req, res) => {
	const { productName } = req.body;
	console.log(productName);

	if (!productName) {
		return res.status(404).json({ errorMessage: "Field is empty." });
	}

	const userData = {
		id: uuidv4(),
		productName,
	};

	DATA.push(userData);

	res.status(201).json({ message: "Created successfully!", data: userData });
});

export const retrieveData = asyncErrorHandler(async (req, res) => {
	res.status(200).json({ message: "Retrieved successfully!", DATA });
});

export const updateData = asyncErrorHandler(async (req, res) => {
	const { id } = req.params;
	const { productName } = req.body;

	if (!id) {
		return res.status(404).json({ errorMessage: "No ID found." });
	}

	const findIndex = DATA.findIndex((product) => product.id === id);

	if (findIndex === -1) {
		return res.status(404).json({ errorMessage: "No data found or invalid ID." });
	}
	DATA[findIndex] = { ...DATA[findIndex], productName };

	res.status(200).json({ message: "Updated successfully!", data: DATA[findIndex] });
});

export const deleteData = asyncErrorHandler(async (req, res) => {
	const { id } = req.params;

	if (!id) {
		return res.status(404).json({ errorMessage: "No ID found." });
	}

	const findIndex = DATA.findIndex((product) => product.id === id);

	if (findIndex === -1) {
		return res.status(404).json({ errorMessage: "No data found or invalid ID." });
	}

	const dataRemoved = DATA.splice(findIndex, 1)[0];

	res.status(200).json({ message: "Deleted successfully!", dataRemoved });
});
