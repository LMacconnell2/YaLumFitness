import { Router } from 'express';
import workoutRouter from './workout.route.mts';
import exerciseRouter from './exercise.route.mts';
import surveyRouter from './surveyRoutes.ts';
// import userRouter from './userRoutes.ts';
import mealRouter from './meal.route.mts'
import foodRouter from './food.route.mts'

const router:Router = Router();

router.use('/workouts', workoutRouter);
router.use('/exercises', exerciseRouter);
router.use('/survey', surveyRouter);
// router.use('/users', userRouter); // Uncomment this line when user routes are implemented
router.use('/meals', mealRouter);
router.use('/food', foodRouter);

export default router;