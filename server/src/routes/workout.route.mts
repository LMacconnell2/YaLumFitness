import { Router } from "express";
import * as Controller from "../controllers/workout.controller.mts";
import requireAuth from "../controllers/auth.controller.mts";

const router = Router();

router.get("/", requireAuth, Controller.getAllPlans);
router.post("/generate", requireAuth, Controller.generateWorkout);
router.get("/:id", requireAuth, Controller.getPlan);
router.patch("/:id", requireAuth, Controller.updateWorkout);
router.delete("/:id", requireAuth, Controller.removeWorkout);

export default router;