import express from "express";

import * as signupController from "../controllers/signup.controller.js";

const router = express.Router();

router.post("/signup", signupController.signupUser);

export default router;
