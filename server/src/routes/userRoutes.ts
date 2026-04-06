import { Router } from "express";
import requireAuth from "../controllers/auth.controller.mts";
import {
  getCurrentUser,
  getUserProfile,
  updateUserProfile
} from "../controllers/user.controller.mts";

const router = Router();

// GET /api/v1/users/me
router.get("/me", requireAuth, getCurrentUser);

// GET /api/v1/users/profile
router.get("/profile", requireAuth, getUserProfile);

// PUT /api/v1/users/profile
router.put("/profile", requireAuth, updateUserProfile);

export default router;