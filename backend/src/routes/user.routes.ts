import { Router } from "express";
import { getProfile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/profile", authMiddleware, getProfile);

export default router;
