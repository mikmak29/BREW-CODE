import express from "express";

import * as userController from "../controllers/user.controller.js";
import authToken from "../middlewares/authToken.js";
import authRole from "../middlewares/authRole.js";

const router = express.Router();

router.post("/signup", userController.signupUser);
router.post("/login", userController.loginUser);
router.get("/", authToken, authRole("user"), userController.retrieveUserData);
router.get("/admin", authToken, authRole("admin"), userController.retrieveAdminData);

export default router;
