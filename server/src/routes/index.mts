import { Router } from "express";
import workoutRouter from './workout.route.mts'

const router:Router = Router();

// load workouts routes
router.use("/workouts", workoutRouter);


export default router;
