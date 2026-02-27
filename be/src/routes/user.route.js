import express from "express";

import * as userController from "../controllers/user.controller.js";
import authToken from "../middlewares/authToken.js";
import authRole from "../middlewares/authRole.js";
import { validateSignup, validateLogin } from "../middlewares/schemaValidators/userValidator.js";

const router = express.Router();

router.post("/signup", validateSignup, userController.signupUser);
router.post("/login", validateLogin, userController.loginUser);
router.get("/", authToken, authRole("customer"), userController.retrieveUserData);
router.get("/admin", authToken, authRole("admin"), userController.retrieveAdminData);

export default router;
