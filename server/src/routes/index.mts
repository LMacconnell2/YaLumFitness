import { Router } from 'express';
import workoutRouter from './workout.route.mts'
import exerciseRouter from './exercise.route.mts'
import mealRouter from './meal.route.mts'
import foodRouter from './food.route.mts'
const router:Router = Router();

// load workouts routes
router.use('/workouts', workoutRouter);
// load exercises routes
router.use('/exercises', exerciseRouter);
// load meals routes
router.use('/meals', mealRouter);
// load food routes
router.use('/food', foodRouter);

export default router;
