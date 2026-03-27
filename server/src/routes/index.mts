import { Router } from 'express';
import workoutRouter from './workout.route.mts'
import exerciseRouter from './exercise.route.mts'

const router:Router = Router();

// load workouts routes
router.use('/workouts', workoutRouter);
router.use('/exercises', exerciseRouter);

export default router;
