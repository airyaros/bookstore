import { Router } from "express";
import UserController from "../controllers/User.controller";
import * as authMiddleware from "../middlewares/auth.middleware";

const router = Router();

// User Routes
router.post("/users", authMiddleware.generateToken, UserController.createUser);
router.get("/users", authMiddleware.adminProtect, UserController.findAllUsers);
router.post("/login", UserController.loginUser);
router.put("/users/:userId", authMiddleware.protect, UserController.updateUser);
router.delete("/users/:userId", authMiddleware.protect, UserController.deleteUser);

export default router;
