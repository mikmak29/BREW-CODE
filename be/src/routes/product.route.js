import express from "express";

import * as productController from "../controllers/product.controller.js";

const router = express.Router();

router.post("/create", productController.createData);
router.get("/data", productController.retrieveData);
router.put("/data/:id", productController.updateData);
router.delete("/delete/:id", productController.deleteData);

export default router;
